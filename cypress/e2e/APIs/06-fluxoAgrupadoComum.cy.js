describe('Autuação, Protocolo, Assinatura e Audiência ***Comum***', ()=>{

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
let poloAtivoBody = Cypress.env('poloAtivoBody');
let poloPassivoBody = Cypress.env('poloPassivoBody');
let alteraProcessoBody = Cypress.env('alteraProcessoBody');
let prioridadeBody = Cypress.env('prioridadeBody');
let requestBody = Cypress.env('requestBody');
let assuntoBody = Cypress.env('assuntoBody');
let minutaBody = Cypress.env('minutaBody');
let gravacaoDocBody = Cypress.env('gravacaoDocBody');
let assinaturaBody = Cypress.env('assinaturaBody');
let protocoloBody = Cypress.env('protocoloBody');
let audienciaBody = Cypress.env('audienciaBody');
let processoId;
let documentoId;
let tarefaId;
let token;
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
        

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Login Adv & Token
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        it("Autuação",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
          console.log('<--Logado Perfil Advogado-->')
          cy.loginViaApi('loginAdv')
          cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
          token = cookie.value;  
          
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          
          //Dados Iniciais Autuação -> Inclui novo processo a partir dos dados iniciais (jurisdição e classe judicial)

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'POST',
            url: '/pje-comum-api/api/processos/dadosiniciaisautuacao/',
            body: requestBody,
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response) => {
            expect(response.status).to.eq(200);
            processoId = response.body.split('/')[1];

       
            cy.wrap(processoId).as('processoId');
            console.log('***Cria novo processo a partir dos dados iniciais e recupera o Id')
            console.log('Id do processo : ', processoId)
            
          })
          
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
          //Adiciona assunto ao processo
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.get('@processoId').then((id) =>{
          
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/assuntos/`, 
            body : assuntoBody,
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('***Adiciona assunto ao processo')
            console.log('Assunto: ', response.body.assunto.descricao);
            })

        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          
          //Adiciona Prioridade

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prioridadeBody = JSON.stringify(prioridadeBody).replace('"{{id}}"', id);
        prioridadeBody = JSON.parse(prioridadeBody);
        
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/prioridades/`,
          body: prioridadeBody, 
          headers: {'X-XSRF-TOKEN': token           },
          failOnStatusCode: false
          }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log('***Adiciona prioridade ao processo')
          console.log('Prioridades: ', response.body.prioridadeProcessual.descricao);
          })
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
          //Adiciona Parte Polo Ativo

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          poloAtivoBody = JSON.stringify(poloAtivoBody).replace('"{{id}}"', id);
          poloAtivoBody = JSON.parse(poloAtivoBody);
          
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/partes/`,
            body: poloAtivoBody,
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('***Inclui partes no processo')
            })
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          //Adiciona Parte Polo Passivo

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          poloPassivoBody = JSON.stringify(poloPassivoBody).replace('"{{id}}"', id);
          poloPassivoBody = JSON.parse(poloPassivoBody);
          
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/partes/`,   
            body: poloPassivoBody, 
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)   
            })
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          //Valida se as partes foram adicionadas

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'GET',
            url: `/pje-comum-api/api/processos/id/${id}/partes`
            }).as("response").then((response)=>{
            console.log('Partes : ', response.body)
            })
          
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          //Altera o processo passando o id do processo a ser alterado

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          alteraProcessoBody = JSON.stringify(alteraProcessoBody).replace(/"{{id}}"/g, id);
          alteraProcessoBody = JSON.parse(alteraProcessoBody);
          
          cy.request({
            method: 'PUT',
            url: `/pje-comum-api/api/processos/${id}`,    
            body : alteraProcessoBody, 
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
          })
        
        })
    })
})

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Login Magistrado

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
            console.log('<--Logado Perfil Magistrado-->')
            cy.loginViaApi('loginMagistrado')
            cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
            token = cookie.value;
            cy.wrap(processoId).as('processoId');
            cy.get('@processoId').then((id) =>{
          
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
          //Grava o conteúdo de um documento em elaboração em um processo

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,   
            body: minutaBody,
            headers: {'X-XSRF-TOKEN': token},
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('***Grava o conteúdo de um documento em elaboração em um processo e recupera o Id do documento')
            console.log('Petição inicial: ',response.body);
            
            documentoId = response.body.id;
            cy.wrap(documentoId).as('documentoId');
            
            })
  
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
          
          //Grava o conteúdo de um documento HTML em elaboração na localização atual do usuário

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.get('@documentoId').then((docId) =>{
          gravacaoDocBody = JSON.stringify(gravacaoDocBody).replace('"{{docId}}"', docId);
          gravacaoDocBody = JSON.parse(gravacaoDocBody);
          
          cy.request({
            method: 'PUT',
            url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/${docId}`,
            body: gravacaoDocBody,
            headers: {'X-XSRF-TOKEN': token},
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            })

            
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  
          //Realiza a assinatura utilizando um assinador com certificado do Tribunal (OTP/JTe).

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          assinaturaBody = JSON.stringify(assinaturaBody).replace(/"{{id}}"/g, id).replace('"{{docId}}"', docId);
          assinaturaBody = JSON.parse(assinaturaBody);
          
          cy.request({
            method: 'POST',
            url: '/pje-comum-api/api/assinaturas2/certificadotribunal',
            body: assinaturaBody, 
            headers: {'X-XSRF-TOKEN': token},
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('***Realiza a assinatura utilizando um assinador com certificado do Tribunal (OTP/JTe).')
            console.log('Assinatura realizada: ', response.body)
            })
  
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          //Retorna os dados da assinatura

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'GET',
            url: `/pje-comum-api/api/processos/id/${id}/documentos/id/${docId}/assinatura`,
            }).as("response").then((response)=>{
            console.log('***Retorna os dados da assinatura')
            console.log('Assinatura: ', response.body)
            })
  
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
                    
          //Protocolo -> Salva as alterações e protocola o processo informado

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          protocoloBody = JSON.stringify(protocoloBody).replace(/"{{id}}"/g, id);
          protocoloBody = JSON.parse(protocoloBody);
          
          cy.request({
            method: 'PUT',
            url: `/pje-comum-api/api/processos/${id}/protocolo`,
            body: protocoloBody,
            headers: {'X-XSRF-TOKEN': token},
            }).as("response").then((response)=>{
              console.log('***Salva as alterações e protocola o processo informado')
              console.log('Processo protocolado: ', response.body)
            })
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Marcar audiência em horário vago

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        let dataHoraAtual = new Date();   
        dataHoraAtual.setDate(dataHoraAtual.getDate() + 1); 
        let data = dataHoraAtual.toISOString().slice(0, 10); 
        let hora = dataHoraAtual.toISOString().slice(11, 19);             
        

        cy.wrap(data).as('data')
        cy.wrap(hora).as('hora')
        cy.get('@data').then((data) =>{
        cy.get('@hora').then((hora) =>{
          cy.request({
            method: 'POST',
            url: 'pje-comum-api/api/pautasaudiencias/audiencias',
            body: {               
                    "buscarProximoHorarioVago": false,
                    "considerarIntersticio": true,
                    "data": `${data}`,                           
                    "horarioFinal": `${hora}`,                  
                    "horarioInicial": `${hora}`,               
                    "idProcesso": `${id}`,
                    "idSalaFisica": 253,
                    "idTipoAudiencia": 3,
                    "validarHorario": true
                  },
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
          }).as("response").then((response)=>{
            console.log('***Marca audiência em horário vago')
            console.log('Audiência marcada: ', response.body)
          })
        
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
          //Cancela uma audiência passando o id da audiência

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cy.request({
          method: 'PATCH',
          url: 'pje-comum-api/api/pautasaudiencias/audiencias/cancelamento',
          body: [
            250484
          ],
          headers: {'X-XSRF-TOKEN': token},
          }).as("response").then((response)=>{
            console.log('***Cancela uma audiência passando o id da audiência')
            console.log(response.body)
          })

          
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Retorna os dados da audiência

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'GET',
            url: `pje-comum-api/api/processos/id/${id}/audiencias`,
            failOnStatusCode: false
          }).as("response").then((response)=>{
            expect(response.status).to.eq(200);
            console.log('Dados Audiência: ', response.body)
          })

          cy.request({
            method: 'POST',
            url: '/pje-comum-api/api/comunicacoesprocessuais/variaveis',
            body: {
              
                "anexosPdf": [],
                "enviadoParaCentralPje2": false,
                "expedienteMateria": {
                  "ativo": true,
                  "bloqueiaPrazo": false,
                  "expedienteMateriaPadrao": false,
                  "expedienteMeioExpedicao": {
                    "ativo": true,
                    "bloqueiaMeioExpedicao": false,
                    "exclusivo": false,
                    "id": 12,
                    "idConfiguracaoExpedicaoSistemaExterno": 0,
                    "meioExpedicao": {
                      "ativo": true,
                      "codigo": "M",
                      "descricao": "Central de Mandados",
                      "impresso": false,
                      "tipoExpedicao": {
                        "ativo": true,
                        "codigo": "F",
                        "descricao": "Física"
                      },
                      "urgente": true
                    },
                    "prioridade": 0,
                    "tipoExpediente": {
                      "ativo": true,
                      "atoAgrupado": true,
                      "codigo": "M",
                      "descricao": "Mandado",
                      "prazoAtoAgrupado": 0,
                      "tipoPrazoAtoAgrupado": "SEM_PRAZO",
                      "usuarioAssina": true
                    }
                  },
                  "id": 45,
                  "mensagemAviso": "O expediente terá o prazo encerrado imediatamente, sem controle de prazo.",
                  "prazo": 0,
                  "tipoPrazo": "SEM_PRAZO"
                },
                "expedienteParteProcessual": {
                  "codigoTipoPrazo": "S",
                  "email": "contabil1@weg.net",
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
                    "situacao": "V",
                    "valido": false
                  },
                  "fechado": false,
                  "idDestinatarioExpedienteCorreiosEcarta": 0,
                  "idDestinatarioExpedienteDomicilioEletronico": -1,
                  "idParteProcessual": 1289448,
                  "nomeParte": "WEG SA",
                  "pessoaParte": {
                    "id": 208843
                  },
                  "prazoExpedienteAutomatico": 1,
                  "prazoLegal": 0
                },
                "impresso": false,
                "origemExpediente": "PEC_FLUXO",
                "papelAssinatura": {
                  "identificador": "MAGISTRADO"
                },
                "processo": {
                  "id": 367579
                },
                "temporario": true,
                "urgencia": true,
                "usuarioAssinatura": {
                  "id": 43832,
                  "login": "61417831553",
                  "nome": "TAMARA GIL KEMP",
                  "nomeCivil": "TAMARA GIL KEMP"
                }
            },
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
          }).as("response").then((response)=>{
            console.log('Comunicação: ', response.body);
          })

        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Transitar a processo no fluxo pela transição informada

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          cy.request({
            method: 'POST',
            url: `pje-comum-api/api/processos/id/${id}/tarefas/63/transicoes`,
            body: {
              
                "idProcesso": `${id}`,
                "idTarefaOrigem": 63,
                "nomeTransicaoDestino": "Aguardando audiência",
                "transicaoDisponivel": true
              
            },
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
          }).as("response").then((response)=>{
            console.log(response.body)
            console.log('Id da tarefa: ', response.body.idTarefa)
            tarefaId = response.body.idTarefa;
            cy.wrap(tarefaId).as('tarefaId');
          })

          cy.get('@tarefaId').then((tarefaId) =>{})

    
    })
    })    
    })
  })
  })
})
})