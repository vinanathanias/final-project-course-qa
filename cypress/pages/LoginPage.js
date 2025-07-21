// cypress/pages/LoginPage.js
class LoginPage {
    visit() {
        cy.visit('/web/index.php/auth/login');
    }

    fillUsername(username) {
        cy.get('[name="username"]').type(username);
    }

    fillPassword(password) {
        cy.get('[name="password"]').type(password);
    }

    submit() {
        cy.get('[type="submit"]').click();
    }
}

export default new LoginPage();
