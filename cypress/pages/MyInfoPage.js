// cypress/pages/MyInfoPage.js
class myInfoPage {
    // clickAddButton() {
    //     cy.get('button.oxd-button--secondary').contains('Add').click();
    // }

    goToTab(tabName){
        cy.get('a.orangehrm-tabs-item').contains(tabName).click();
    }

    clickAddInImmigration(addPart){
        cy.contains('h6', addPart).next('button').click();
    }

    fillImmigrationForm(document, number, issuedDate, expiryDate) {
        cy.contains('div.oxd-radio-wrapper', document).click();
        cy.contains('div.oxd-input-group__label-wrapper', 'Number').next('div').type(number);
        cy.contains('div.oxd-input-group__label-wrapper', 'Issued Date').next('div').type(issuedDate);
        cy.contains('div.oxd-input-group__label-wrapper', 'Expiry Date').next('div').type(expiryDate);

//         close the calendar
        cy.contains('div', 'Close').click();
        cy.get('button[type="submit"]').click();
    }
    validateSuccessPopup() {
        cy.get('.oxd-toast').should('be.visible').invoke('text')      // Get the text content of the toast
        .then((toastText) => {
            // Use Chai's 'expect' with 'or' to check for either message
            expect(toastText).to.satisfy(
                (text) => text.includes('Successfully Saved') || text.includes('Successfully Deleted')
            );
        });
    }

    deleteUsingNumber(numbers){
        numbers.forEach(number => {
            cy.contains('div.oxd-table-cell', number).prev().prev('div').click();
        });

        cy.contains('button', 'Delete Selected').click();
        cy.contains('button', 'Yes, Delete').click();
    }

}

export default new myInfoPage();
