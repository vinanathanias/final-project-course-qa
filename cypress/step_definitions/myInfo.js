// cypress/step_definitions/myInfo.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";
import myInfoPage from "../pages/MyInfoPage";
import DashboardPage from "../pages/DashboardPage";

Given('user navigates to myInfo page', () => {
    DashboardPage.navigateToMyInfo();
});

Given('user navigates to {string} tab', (tabName) => {
   myInfoPage.goToTab(tabName);
});

When('user clicks add in {string}', (addPart) => {
    myInfoPage.clickAddInImmigration(addPart)
});

When('user adds a new immigration {string} with number {string}, issued date {string} and expiry date {string} and submits form', (document, number, issuedDate, expiryDate) => {
    myInfoPage.fillImmigrationForm(document, number, issuedDate, expiryDate);
});

Then('the success popup should appear', () => {
    myInfoPage.validateSuccessPopup();
});

When('user selects the following immigration numbers to delete:', (dataTable) => {
    const numbers = dataTable.hashes().map(row => row.immigrationNumbers);
    myInfoPage.deleteUsingNumber(numbers);
})
