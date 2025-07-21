// cypress/step_definitions/admin.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";

// Variabel untuk menyimpan data user antar steps
let newUsername;

Given('user is on the login page', () => {
    LoginPage.visit();
});

// Menggunakan fixture untuk login
When('user logs in using credentials from {string}', (fixtureName) => {
    cy.fixture(fixtureName).then((credentials) => {
        LoginPage.fillUsername(credentials.username);
        LoginPage.fillPassword(credentials.password);
        LoginPage.submit();
    });
});

Then('user should see the dashboard page', () => {
    DashboardPage.validateOnDashboardPage();
});

Given('user navigates to Admin page', () => {
    DashboardPage.navigateToAdmin();
});

When('user adds a new user {string} with role {string} and employee name from {string} file and status {string}', (username, role, fixtureName, status) => {
    newUsername = username + Date.now(); // Menambahkan timestamp agar username unik setiap kali tes berjalan
    AdminPage.clickAddButton();
    cy.fixture(fixtureName).then((credentials) => {
        AdminPage.fillUserForm(role, credentials.employeeName, status, newUsername, 'Password123!');
        AdminPage.saveUser();
    });

});

Then('the user {string} should appear in the user list', () => {
    AdminPage.validateUserInTable(newUsername);
});

// Langkah untuk skenario negatif
When('user tries to add a new user {string} with mismatched passwords and employee name from {string} file', (username, fixtureName) => {
    cy.fixture(fixtureName).then((credentials) => {
        AdminPage.clickAddButton();
        // Gunakan fungsi baru dari Page Object untuk skenario ini
        AdminPage.fillUserFormWithMismatchedPasswords(
            'Admin',
            credentials.employeeName,
            'Enabled',
            username,
            'Password123!',
            'DifferentPassword456!'
        );
        AdminPage.saveUser();
    });

});

Then('an error message for mismatched passwords should be displayed', () => {
    AdminPage.validatePasswordMismatchError();
});
