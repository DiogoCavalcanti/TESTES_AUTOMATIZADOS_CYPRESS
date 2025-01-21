const { defineConfig } = require("cypress");

const cypressSplit = require('cypress-split')
const puppeteerSetup = require('./cypress/support/puppeteer')
const { getChromiumWebBrowsers } = require('./cypress/support/utils')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      puppeteerSetup(on)
      cypressSplit(on, config) //
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on)

     //return getChromiumWebBrowsers(config) 
     return config
      
    },
    baseUrl: "https://desenvolvimento.pje.csjt.jus.br",

   reporter: 'cypress-multi-reporters',
   reporterOptions: {
   reporterEnabled: 'cypress-mochawesome-reporter',
   cypressMochawesomeReporterReporterOptions:{
   charts:true,
   reportPageTitle: 'Relatório de testes',
   embeddedScreenshots: true,
   inlineAssets: true,
   saveAllAttempts: false
 }
},
  },
});
