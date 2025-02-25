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
      puppeteerSetup(on)
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    
    },
    baseUrl: "https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api ",
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
    },

    transicoesAnaliseBody: {
      
      "corTarefaDestino": "#000000",
      "iconeTarefaDestino": "fas fa-grip-horizontal",
      "idProcesso": "{{id}}",
      "idTarefaOrigem": 63,
      "nomeTransicaoDestino": "Análise",
      "transicaoDisponivel": true
    
    },

    transicoesRemeterBody: {
      
      "corTarefaDestino": "#388E3C",
      "iconeTarefaDestino": "fas fa-cloud-upload-alt",
      "idProcesso": "{{id}}",
      "idTarefaOrigem": 490,
      "nomeTransicaoDestino": "Remeter ao 2o Grau",
      "transicaoDisponivel": true
    
    },

    remessasBody: {
      
        "assuntos": [
{
"codigo": "13969",
"descricao": "Rescisão do Contrato de Trabalho / Seguro Desemprego",
"principal": true
}
],
"codigoClasseJudicial": "1001",
"codigoRegionalDestino": 10,
"codigoRegionalOrigem": 10,
"cumprimentoDiligencia": false,
"descricaoClasseJudicial": "Agravo de Instrumento em Agravo de Petição",
"descricaoCompetencia": "1ª Seção Especializada",
"descricaoJurisdicao": "Tribunal Regional do Trabalho da 10ª Região",
"faseProcessual": "CONHECIMENTO",
"idCompetencia": 20,
"idJurisdicao": 40,
"idProcesso": "{{id}}",
"instanciaDestino": 2,
"instanciaOrigem": 1,
"motivo": {
"codigo": "38",
"id": 469,
"valor": "para processar recurso"
},
"partes": [
{
"parte": {
"autoridade": false,
"cpf": "885.597.001-10",
"documento": "885.597.001-10",
"email": "karolinbaumgartner@superrito.com",
"emails": [
  "karolinbaumgartner@superrito.com"
],
"endereco": {
  "bairro": "CENTRO",
  "classificacoesEndereco": [
    "R"
  ],
  "correspondencia": true,
  "dtAlteracao": "2024-05-14T17:33:15.412Z",
  "estado": {
    "descricao": "TOCANTINS",
    "id": 24,
    "sigla": "TO"
  },
  "id": 370157,
  "idMunicipio": 18385,
  "idPessoa": 164421,
  "idUsuarioCadastrador": 208320,
  "logradouro": "RUA",
  "municipio": "MIRACEMA DO TOCANTINS",
  "municipioIbge": "1713205",
  "nroCep": "77650-000",
  "numero": "123",
  "pais": {
    "codigo": "076",
    "descricao": "Brasil",
    "id": 271
  },
  "situacao": "P"
},
"enderecoDesconhecido": false,
"id": 1293861,
"idPessoa": 164421,
"idTipoParte": 5,
"nome": "FLORISMARDEM LUSTOSA DA SILVA",
"ordem": 1,
"pessoaFisica": {
  "codigoSexo": "M",
  "dataNascimento": "1976-07-08T03:00:00.000Z",
  "email": "karolinbaumgartner@superrito.com",
  "estadoCivil": 2,
  "etnia": 3,
  "id": 164421,
  "login": "88559700110",
  "naturalidade": {
    "ativo": true,
    "estado": {
      "descricao": "GOIÁS",
      "id": 10,
      "sigla": "GO"
    },
    "id": 59,
    "idEstado": 10,
    "nome": "AGUA FRIA DE GOIAS",
    "siglaEstado": "GO"
  },
  "nome": "FLORISMARDEM LUSTOSA DA SILVA",
  "paisNascimento": {
    "codigo": "076",
    "descricao": "Brasil",
    "id": 271
  },
  "podeUsarCelularParaMensagem": false,
  "profissao": {
    "ativo": true,
    "codigo": "521110",
    "descricao": "VENDEDOR DE COMÉRCIO VAREJISTA",
    "id": 1395
  },
  "sexo": "Masculino",
  "situacao": true,
  "ufNascimento": {
    "descricao": "GOIÁS",
    "id": 10,
    "sigla": "GO"
  }
},
"polo": "ativo",
"principal": true,
"representantes": [
  {
    "autoridade": false,
    "cpf": "030.733.501-10",
    "dddCelular": "61",
    "documento": "030.733.501-10",
    "email": "testesautomatizados@tst.jus.br",
    "emails": [
      "testesautomatizados@tst.jus.br"
    ],
    "enderecoDesconhecido": false,
    "id": 1293862,
    "idPessoa": 130780,
    "idTipoParte": 7,
    "nome": "DAIANE FERREIRA DE OLIVEIRA",
    "numeroCelular": "99999999",
    "numeroOab": "DF47939",
    "polo": "ativo",
    "principal": false,
    "sexo": "FEMININO",
    "situacao": "Ativo",
    "situacaoOab": "REGULAR",
    "status": "A",
    "tipo": "ADVOGADO",
    "tipoDocumento": "CPF",
    "tipoPessoa": "F"
  }
],
"sexo": "MASCULINO",
"situacao": "Ativo",
"status": "A",
"tipo": "AUTOR",
"tipoDocumento": "CPF",
"tipoPessoa": "F"
},
"polo": "A",
"recursos": []
},
{
"parte": {
"autoridade": false,
"documento": "84.429.695/0001-11",
"email": "contabil1@weg.net",
"emails": [
  "contabil1@weg.net"
],
"endereco": {
  "bairro": "VILA LALAU",
  "classificacoesEndereco": [
    "R"
  ],
  "correspondencia": true,
  "dtAlteracao": "2024-05-14T15:23:40.314Z",
  "estado": {
    "descricao": "SANTA CATARINA",
    "id": 25,
    "sigla": "SC"
  },
  "id": 370156,
  "idMunicipio": 2543,
  "idPessoa": 208843,
  "idUsuarioCadastrador": 43832,
  "logradouro": "PREFEITO WALDEMAR GRUBBA",
  "municipio": "JARAGUA DO SUL",
  "municipioIbge": "4208906",
  "nroCep": "89256-900",
  "numero": "3300",
  "pais": {
    "codigo": "076",
    "descricao": "Brasil",
    "id": 271
  },
  "situacao": "V"
},
"enderecoDesconhecido": false,
"id": 1293863,
"idPessoa": 208843,
"idTipoParte": 6,
"nome": "WEG SA",
"ordem": 1,
"pessoaJuridica": {
  "cnpj": "84.429.695/0001-11",
  "dataAbertura": "1969-05-29T03:00:00.000Z",
  "dsRamoAtividade": "HOLDINGS DE INSTITUIÇÕES NÃO-FINANCEIRAS",
  "dsTipoPessoa": "Sociedade Anônima Aberta",
  "dsTpPrazoExpedienteAutomatico": "Simples",
  "email": "contabil1@weg.net",
  "id": 208843,
  "login": "84429695000111",
  "nome": "WEG SA",
  "nomeFantasia": "WEG",
  "numeroCpfResponsavel": "12356910808",
  "oficial": false,
  "orgaoPublico": false,
  "porteCodigo": 5,
  "porteLabel": "Demais",
  "situacao": true,
  "situacaoCnpjReceitaFederal": {
    "descricao": "ATIVA",
    "id": 2
  },
  "tipoPessoaCodigo": "J",
  "tipoPessoaLabel": "Jurídica",
  "tipoPessoaTipoValidacaoReceita": "T"
},
"polo": "passivo",
"principal": true,
"situacao": "Ativo",
"status": "A",
"tipo": "RÉU",
"tipoDocumento": "CNPJ",
"tipoPessoa": "J"
},
"polo": "P",
"recursos": []
}
],
"pedidoLiminar": false,
"siglaClasseJudicial": "AP",
"situacao": "S"
    
    }


    


  }
  })


