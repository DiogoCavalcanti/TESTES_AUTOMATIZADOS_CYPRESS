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
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api/",
  },
  
  
  
  
  env: {
    
    requestBody: {
      classeJudicial: {
        id: 77,
        codigo: "63",
        descricao: "Ação Civil Coletiva",
        sigla: "ACC",
        requerProcessoReferenciaCodigo: "NE",
        controlaValorCausa: true,
        podeIncluirAutoridade: true,
        pisoValorCausa: 0,
        tetoValorCausa: 0,
        ativo: true,
        idClasseJudicialPai: 0,
        possuiFilhos: true,
        filhos: [null]
      },
      jurisdicao: {
        id: 2,
        descricao: "GAMA-DF",
        ativo: true,
        codigoOrigem: 111,
        estado: "DISTRITO FEDERAL",
        idEstado: 7,
        instancia: 1,
        idRegional: 10,
        descricaoRegional: "TRT da 10ª Região (CSJT)",
        idRamoJustica: 5,
        descricaoRamoJustica: "Justiça do Trabalho"
      }
    },

    assuntoBody:{
      assunto: {
        id: 4508,
        idAssuntoSuperior: 4488,
        codigo: "13962",
        descricao: "Justa Causa/Falta Grave",
        assuntoCompleto: "DIREITO DO TRABALHO (864) / Direito Individual do Trabalho (12936) / Rescisão do Contrato de Trabalho (13949) / Justa Causa/Falta Grave",
        assuntoResumido: "Rescisão do Contrato de Trabalho / Justa Causa/Falta Grave",
        nivel: 3,
        podeAdicionarAoProcesso: true,
        possuiFilhos: false,
        filhos: [
              null
            ]
        },
        principal: true
    },

    poloAtivoBody: {
        "enderecoDesconhecido":false,
        "idEndereco" : "370157",
        "idPessoa" : "164421",
        //"idProcesso" : `${id}`,                 
        "idTipoParte": 5,
        "polo" : "A",
        "principal"	: true,
        "representados" : []
    },

    minutaBody: {
      "anexos": [],
        "estruturaDocumento": {
        "id": 62,
        "padraoFuncionalidade": true,
        "titulo": "Anexar Documentos"
        },
        "idTipo": 12,
        "numComentariosNaoLidos": 0,
        "responder": true,
        "tipo": "Petição Inicial",
        "tipoArquivo": "HTML",
        "titulo": "Petição Inicial"
    }
    


  }
  })


