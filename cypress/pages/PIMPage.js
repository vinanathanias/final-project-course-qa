// cypress/pages/PIMPage.js
class PIMPage {
    // clickAddButton() {
    //     cy.get('button.oxd-button--secondary').contains('Add').click();
    // }
    fillSearchForm(employeeId) {
        cy.get('.oxd-input').eq(1).type(employeeId);
        cy.get('button[type="submit"]').click();
    }

    validateIdInTable(employeeId) {
        // Tunggu hingga toast sukses muncul dan hilang (opsional tapi bagus)
        cy.get('div.oxd-table-card', { timeout: 15000 }).contains(employeeId).should('be.visible');
    }

    deleteFirstUser(employeeId) {
        // Tunggu hingga toast sukses muncul dan hilang (opsional tapi bagus)
        cy.get('button:has(.bi-trash)').eq(0).click();
        cy.get('button.oxd-button').eq(4).click();
    }

    validateDeleteSuccess() {
        cy.get('.oxd-toast')
        .should('be.visible')
        .and('contain', 'Successfully Deleted');
    }


}

export default new PIMPage();
