describe('Protocolar Processo via API', ()=>{
   
    //Autuação 
    it("autuacao- POST",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        cy.loginViaApi('loginMagistrado')
        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        const token = cookie.value;
        const requestBody = Cypress.env('requestBody');
        const assuntoBody = Cypress.env('assuntoBody');
        const poloAtivoBody = Cypress.env('poloAtivoBody');
        const minutaBody = Cypress.env('minutaBody');
        
        //Dados Iniciais
        cy.request({
        method: 'POST',
        url: '/pje-comum-api/api/processos/dadosiniciaisautuacao/',
        body: requestBody,
        headers: {
            
            'X-XSRF-TOKEN': token
        },
        failOnStatusCode: false
        }).as("autuacao").then((autuacao) => {
        expect(autuacao.status).to.eq(200);
        console.log('dados iniciais: ', autuacao.body);
        const processoId = autuacao.body.split('/')[1];
        cy.wrap(processoId).as('processoId');
        console.log(processoId)
        })

        //Assuntos
        cy.get('@processoId').then((id) =>{
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/assuntos/`,   //Adicionar dinamicamente idProcesso
          body : assuntoBody,
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log('Assunto: ', response.body);
        })
      

        //Adiciona Parte Polo Ativo
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/partes/`,
          body: {
            "enderecoDesconhecido":false,
            "idEndereco" : "370157",
            "idPessoa" : "164421",
                          
            "idTipoParte": 5,
            "polo" : "A",
            "principal"	: true,
            "representados" : []
        }, "idProcesso" : `${id}`,
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log(response.body);
        })
      

        cy.request({
          method: 'POST',
          url: '/pje-comum-api/api/pessoas/fisicas/pessoasfisicas',
          body: "164421",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token
          },
        failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log(response.body);
        })

        //Adiciona Parte Polo Passivo
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/partes/`,   //Adicionar Dinamicamente IdProcesso
          body: {
            "enderecoDesconhecido":false,
            "idEndereco" : "370156",
            "idPessoa" : "208843",
            "idProcesso" : `${id}`,              //Não pode ser adicionado duas vezes. Adicionar Dinamicamente-CriarTesteMsgErro 
            "idTipoParte": 6,
            "polo" : "P",
            "principal"	: true,
            "representados" : []
        }, 
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log(response.body);
        })

        cy.request({
          method: 'PUT',
          url: `/pje-comum-api/api/processos/${id}`,    //Dinamicamente
          body : {
            
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
              "id": `${id}`,
              "juizoDigital": false,
              "jurisdicao": {
                "ativo": true,
                "codigoOrigem": 1,
                "descricao": "Tribunal Regional do Trabalho da 10ª Região",
                "descricaoRamoJustica": "Justiça do Trabalho",
                "descricaoRegional": "TRT da 10ª Região (CSJT)",
                "estado": "DISTRITO FEDERAL",
                "id": 9,
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
                "idProcesso": `${id}`,
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
        headers: {
            
          'X-XSRF-TOKEN': token
        },
        failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log(response.body);
        })

        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/prioridades/`,
          body: {
              "idProcesso": `${id}`,
              "prioridadeProcessual": {
                "ativo": true,
                "codigo": "P06",
                "descricao": "Acidente de Trabalho",
                "id": 5,
                "mni": false,
                "peso": 4
              }
          },
          headers: {
            
            'X-XSRF-TOKEN': token
          },
          failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log('Prioridades: ', response.body);
        })

        cy.request({
          method: 'POST',
          url: '/pje-comum-api/api/ocorrenciasimpedimentomagistrado/',
          body:{
            "acao":	0,
            "idMagistrado":43832,
            "idProcesso": `${id}`,
            "listaIdsRegrasConfirmadas":[]
          },
          headers: {
            
            'X-XSRF-TOKEN': token
          },
          failOnStatusCode: false
        }).as("response").then((response)=>{
          expect(response.status).to.eq(204)
          //console.log(response.body);
        }) 

        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,
          body: minutaBody,
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log(response.body);
          console.log(response.body.id)
          const documentoId = response.body.id;
          cy.wrap(documentoId).as('documentoId')
        })

        cy.get('@documentoId').then((docId) =>{
        cy.request({
          method: 'PUT',
          url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/${docId}`,
          body: {
	          "id": `${docId}`,
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
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        }).as("response").then((response)=>{
          console.log(response.body)
        })

        //Assinatura
        cy.request({
          method: 'POST',
          url: '/pje-comum-api/api/assinaturas2/certificadotribunal',
          body: {
            "algoritmoAssinatura": "RSA_SHA256",
            "processos": [
              {
                "documentosPrincipais": [
                  {
                    "anexos": [],
                    "associados": [],
                    "idProcesso": `${id}`,
                    "idProcessoDocumento": `${docId}`
                  }
                ],
                "idProcesso": `${id}`,
                "nomeRecurso": "page:novo-processo"
              }
            ],
            "tipoAssinador": "MODO_TESTE",
            "transitarNoFluxo": false
          },
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        }).as("response").then((response)=>{
          console.log(response.body)
        })

        cy.request({
          method: 'GET',
          url: `/pje-comum-api/api/processos/id/${id}/documentos/id/${docId}/assinatura`,
        }).as("response").then((response)=>{
          console.log('Assinatura: ', response.body)
        })

        //Protocolo
        cy.request({
          method: 'PUT',
          url: `/pje-comum-api/api/processos/${id}/protocolo`,
          body: {
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
              "id": `${id}`,
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
                "idProcesso": `${id}`,
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
          headers: {
            
            'X-XSRF-TOKEN': token
          },
        }).as("response").then((response)=>{
          console.log(response.body)
        })

        cy.request({
          method: 'GET',
          url: `/pje-comum-api/api/processos/id/${id}`   // audiencias`    /processos/id/{idProcesso}/documentos/minutas
        }).as("response").then((response)=>{
          console.log(response.body)
          const protocoloBody = response.body
          cy.wrap(protocoloBody).as('protocoloBody');
          console.log(protocoloBody)
        })

        //Valida se as partes foram adicionadas
        cy.request({
          method: 'GET',
          url: `/pje-comum-api/api/processos/id/${id}/partes`
        }).as("response").then((response)=>{
          console.log('Partes : ', response.body)
        })
      })
    })    
  }) 
})
})
