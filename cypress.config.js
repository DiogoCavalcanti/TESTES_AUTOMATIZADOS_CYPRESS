const { defineConfig } = require("cypress");

const puppeteerSetup = require('./cypress/support/puppeteer')
const { getChromiumWebBrowsers } = require('./cypress/support/utils')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      puppeteerSetup(on) //
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on)

      return getChromiumWebBrowsers(config) 
      
    },
    baseUrl: "https://desenvolvimento.pje.csjt.jus.br",
  },
});
