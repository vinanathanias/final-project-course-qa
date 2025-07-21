// cypress/pages/DashboardPage.js
class DashboardPage {
    validateOnDashboardPage() {
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
    }

    navigateToAdmin() {
        cy.get('a.oxd-main-menu-item').contains('Admin').click();
    }

    navigateToPIM() {
        cy.get('a.oxd-main-menu-item').contains('PIM').click();
    }

    navigateToMyInfo() {
        cy.get('a.oxd-main-menu-item').contains('My Info').click();
    }
}

export default new DashboardPage();
