// cypress/step_definitions/pim.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PIMPage from "../pages/PIMPage";

Given('user navigates to PIM page', () => {
    DashboardPage.navigateToPIM();
});

When('user search employee with Id from {string} file', (fixtureFile) => {
    cy.fixture(fixtureFile).then((credentials) => {
        PIMPage.fillSearchForm(credentials.employeeID);
    });

});

Then('the user id from {string} file should appear in the user list', (fixtureFile) => {
    cy.fixture(fixtureFile).then((credentials) => {
        PIMPage.validateIdInTable(credentials.employeeID);
    });
});

// Langkah untuk skenario negatif
When('user tries to delete an existing user', () => {
    PIMPage.deleteFirstUser();
});
