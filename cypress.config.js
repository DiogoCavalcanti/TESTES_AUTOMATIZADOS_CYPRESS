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
        "idProcesso" : "{{id}}",                
        "idTipoParte": 5,
        "polo" : "A",
        "principal"	: true,
        "representados" : []
    },

    poloPassivoBody: {
      enderecoDesconhecido :false,
      idEndereco : "370156",
      idPessoa : "208843",
      idProcesso : "{{id}}",              
      idTipoParte : 6,
      polo : "P",
      principal	: true,
      representados : []
    },

    alteraProcessoBody: {
            
      "classeJudicial": {
        "ativo": true,
        "codigo": "63",
        "controlaValorCausa": false,
        "descricao": "Ação Civil Coletiva",
        "id": 77,
        "idClasseJudicialPai": 76,
        "podeIncluirAutoridade": false,
        "possuiFilhos": false,
        "requerProcessoReferenciaCodigo": "NE",
        "sigla": "ACC"
      },
      "codigoClasseJudicialInicial": "I",
      "codigoStatusProcesso": "E",
      "id": "{{id}}",
      "juizoDigital": false,
      "jurisdicao": {
        "ativo": true,
        "codigoOrigem": 1,
        "descricao": "Tribunal Regional do Trabalho da 10ª Região",
        "descricaoRamoJustica": "Justiça do Trabalho",
        "descricaoRegional": "TRT da 10ª Região (CSJT)",
        "estado": "DISTRITO FEDERAL",
        "id": 10,
        "idEstado": 7,
        "idRamoJustica": 5,
        "idRegional": 10,
        "inibeLixeiraGigs": false,
        "instancia": 1
      },
      "processoJT": {
        "atividade": {
          "id": 201,
          "nome": "COMÉRCIO VAREJISTA",
          "pai": {
            "id": 200,
            "nome": "COMÉRCIO"
          }
        },
        "idProcesso": "{{id}}",
        "municipio": {
          "ativo": true,
          "estado": {
            "descricao": "DISTRITO FEDERAL",
            "id": 7,
            "sigla": "DF"
          },
          "id": 753,
          "idEstado": 7,
          "nome": "BRASILIA",
          "siglaEstado": "DF"
        }
      },
      "valorDaCausa": 500
    
    },

    prioridadeBody: {
      
      "idProcesso": "{{id}}",
      "prioridadeProcessual": {
        "ativo": true,
        "codigo": "P06",
        "descricao": "Acidente de Trabalho",
        "id": 5,
        "mni": false,
        "peso": 4
      }
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
    },

    gravacaoDocBody: {
      
      "id": "{{docId}}",
      "minutaTipoFuncionalidade": "\u0000",
        "topicos": [
                    {
            "conteudo": "",
            "dataModificacao": "2025-01-30T19:04:43.901Z",
            "exibirTitulo": false,
            "idEstruturaDocumentoTopico": 139,
            "numerado": false,
            "somenteLeitura": false,
            "titulo": "Conteúdo principal"
          },
                    {
          "conteudo": "<p class=\"corpo\" style=\"font-size:12pt;line-height:1.5;margin-left:0 !important;text-align:justify !important;text-indent:4.5cm;\">BRASILIA/DF, 30 de janeiro de 2025.</p><p class=\"ck_assinatura\" style=\"font-size:12pt;line-height:1.5;text-align:center;text-indent:0;\"><strong>TAMARA GIL KEMP</strong><br>Magistrado</p>",
          "dataModificacao": "2025-01-30T19:04:43.901Z",
          "exibirTitulo": false,
          "idEstruturaDocumentoTopico": 140,
          "numerado": false,
          "somenteLeitura": true,
          "titulo": "Assinatura"
          }
          ],
          "version": 2
    },

    assinaturaBody: {
      
      "algoritmoAssinatura": "RSA_SHA256",
      "processos": [
        {
          "documentosPrincipais": [
            {
              "anexos": [],
              "associados": [],
              "idProcesso": "{{id}}",
              "idProcessoDocumento": "{{docId}}"
            }
          ],
          "idProcesso": "{{id}}",
          "nomeRecurso": "page:novo-processo"
        }
      ],
      "tipoAssinador": "MODO_TESTE",
      "transitarNoFluxo": false
    },

    protocoloBody: {
      
      "competencia": {
        "ativo": true,
        "descricao": "Justiça do Trabalho - Geral",
        "id": 2
      },
      "processo": {
        "classeJudicial": {
          "ativo": true,
          "codigo": "63",
          "controlaValorCausa": false,
          "descricao": "Ação Civil Coletiva",
          "id": 77,
          "idClasseJudicialPai": 76,
          "podeIncluirAutoridade": false,
          "possuiFilhos": false,
          "requerProcessoReferenciaCodigo": "NE",
          "sigla": "ACC"
        },
        "codigoClasseJudicialInicial": "I",
        "codigoStatusProcesso": "E",
        "id": "{{id}}",
        "juizoDigital": false,
        "jurisdicao": {
          "ativo": true,
          "codigoOrigem": 111,
          "descricao": "GAMA-DF",
          "descricaoRamoJustica": "Justiça do Trabalho",
          "descricaoRegional": "TRT da 10ª Região (CSJT)",
          "estado": "DISTRITO FEDERAL",
          "id": 2,
          "idEstado": 7,
          "idRamoJustica": 5,
          "idRegional": 10,
          "inibeLixeiraGigs": false,
          "instancia": 1
        },
        "processoJT": {
          "atividade": {
            "id": 201,
            "nome": "COMÉRCIO VAREJISTA",
            "pai": {
              "id": 200,
              "nome": "COMÉRCIO"
            }
          },
          "idProcesso": "{{id}}",
          "municipio": {
            "ativo": true,
            "estado": {
              "descricao": "DISTRITO FEDERAL",
              "id": 7,
              "sigla": "DF"
            },
            "id": 753,
            "idEstado": 7,
            "nome": "BRASILIA",
            "siglaEstado": "DF"
          }
        },
        "valorDaCausa": 500
      }
    },
    
    audienciaBody: {
      
      "buscarProximoHorarioVago": false,
      "considerarIntersticio": true,
      "data": "{{data}}",          //"2025-02-05T03:00:00.000Z",
      "horarioFinal": "{{hora}}",        //"09:04",
      "horarioInicial": "{{hora}}",          //"09:03",
      "idProcesso": "{{id}}",
      "idSalaFisica": 253,
      "idTipoAudiencia": 3,
      "validarHorario": true
    }
    


  }
  })


