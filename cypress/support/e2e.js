// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-mochawesome-reporter/register';
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // We return false here to prevent Cypress from
    // failing the test. We want to ignore the "Request aborted" error.
    if (err.message.includes('Request aborted')) {
        return false;
    }
    // Let other uncaught exceptions fail the test
    return true;
});
