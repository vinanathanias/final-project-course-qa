// cypress/pages/AdminPage.js
class AdminPage {
    clickAddButton() {
        cy.get('button.oxd-button--secondary').contains('Add').click();
    }

    // Fungsi ini lebih kompleks, kita pecah menjadi beberapa bagian
    fillUserForm(role, employeeName, status, username, password) {
        // Pilih User Role
        cy.get('.oxd-form-row .oxd-grid-item:nth-child(1) .oxd-select-wrapper').click();
        cy.get('.oxd-select-dropdown').contains(role).click();

        // Ketik Employee Name dan pilih dari autocomplete
        cy.get('input[placeholder="Type for hints..."]').type(employeeName);
        cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 }).contains(employeeName).click();

        // Pilih Status
        cy.get('.oxd-form-row .oxd-grid-item:nth-child(3) .oxd-select-wrapper').click();
        cy.get('.oxd-select-dropdown').contains(status).click();

        // Isi Username, Password, dan Confirm Password
        cy.get('.oxd-input').eq(1).type(username);
        cy.get('.oxd-input').eq(2).type(password);
        cy.get('.oxd-input').eq(3).type(password);
    }

    fillUserFormWithMismatchedPasswords(role, employeeName, status, username, password, confirmPassword) {
        // Pilih User Role
        cy.get('.oxd-form-row .oxd-grid-item:nth-child(1) .oxd-select-wrapper').click();
        cy.get('.oxd-select-dropdown').contains(role).click();

        // Ketik Employee Name dan pilih dari autocomplete
        cy.get('input[placeholder="Type for hints..."]').type(employeeName.substring(0, 3)); // Ketik beberapa huruf untuk memicu autocomplete
        cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 }).contains(employeeName).click();

        // Pilih Status
        cy.get('.oxd-form-row .oxd-grid-item:nth-child(3) .oxd-select-wrapper').click();
        cy.get('.oxd-select-dropdown').contains(status).click();

        // Isi Username
        cy.get('.oxd-form-row .oxd-grid-item:nth-child(4) input').type(username);

        // Isi Password dan Confirm Password yang BERBEDA
        cy.get('input[type="password"]').eq(0).type(password);
        cy.get('input[type="password"]').eq(1).type(confirmPassword);
    }

    saveUser() {
        cy.get('button[type="submit"]').click();
    }

    validateUserInTable(username) {
        // Tunggu hingga toast sukses muncul dan hilang (opsional tapi bagus)
        cy.contains('.oxd-toast', 'Successfully Saved').should('be.visible');
        cy.get('div.oxd-table-card', { timeout: 15000 }).contains(username).should('be.visible');
    }

    validatePasswordMismatchError() {
        cy.get('.oxd-input-group .oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Passwords do not match');
    }


}

export default new AdminPage();
