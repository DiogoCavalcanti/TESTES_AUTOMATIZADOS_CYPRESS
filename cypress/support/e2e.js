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

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/puppeteer/support'
import 'cypress-mochawesome-reporter/register'

Cypress.on('uncaught:exception', (err) => {
    // Ignorar erros relacionados a TOKEN_CAPTCHA não definido
    if (err.message.includes('TOKEN_CAPTCHA is not defined')) {
      return false; // Retorna false para evitar que o Cypress falhe o teste
    }
  });