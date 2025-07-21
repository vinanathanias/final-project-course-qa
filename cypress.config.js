// cypress.config.js

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    // This is the spec pattern that will look for .feature files
    specPattern: "**/*.feature",

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,                 // Show charts in the report
      reportPageTitle: 'Laporan Tes Otomasi OrangeHRM', // Custom title for the report page
      embeddedScreenshots: true,    // Embed screenshots for failed tests directly in the report
      inlineAssets: true,           // All assets (CSS, JS) are bundled in the HTML file
                              saveAllAttempts: false,       // Do not save screenshots/videos of passed tests on retry
                              overwrite: false,             // Do not overwrite old reports
                              html: true,                   // Generate an HTML report
                              json: true,                   // Generate a JSON file for the report
    },

    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      // This is the most important part!
      // Make sure this is within the setupNodeEvents function.
      config.env.stepDefinitions = [
        // This is the glob pattern that will look for all .js files
        // in your step_definitions folder
        "cypress/step_definitions/**/*.{js,ts}",
      ];
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
