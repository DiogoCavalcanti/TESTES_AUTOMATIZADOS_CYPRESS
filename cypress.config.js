const { defineConfig } = require("cypress");

const cypressSplit = require("cypress-split");
const puppeteerSetup = require("./cypress/support/puppeteer");
const { getChromiumWebBrowsers } = require("./cypress/support/utils");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter",
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: "Relatório de testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },

    /*e2e: {
      setupNodeEvents(on, config) {
        puppeteerSetup(on);
        cypressSplit(on, config);
        require("cypress-mochawesome-reporter/plugin")(on);

        //return getChromiumWebBrowsers(config)
        return config;
      },
      failOnStatusCode: false,
      
    },
  },*/

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api/",
    //failOnStatusCode: false,
    // Permite que os testes sejam executados sem que o Cypress verifique a conexão
    /*host: {
      "https://desenvolvimento.pje.csjt.jus.br": "https://desenvolvimento.pje.csjt.jus.br/primeirograu/login.seam"
    }*/
  },
  })


