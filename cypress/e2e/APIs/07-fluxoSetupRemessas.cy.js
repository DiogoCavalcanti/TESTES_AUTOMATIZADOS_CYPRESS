describe('Setup Remessas', ()=>{

    let prioridadeBody = Cypress.env('prioridadeBody');
    let poloAtivoBody = Cypress.env('poloAtivoBody');
    let poloPassivoBody = Cypress.env('poloPassivoBody');
    let alteraProcessoBody = Cypress.env('alteraProcessoBody');
    let minutaBody = Cypress.env('minutaBody');
    let gravacaoDocBody = Cypress.env('gravacaoDocBody');
    let assinaturaBody = Cypress.env('assinaturaBody');
    let protocoloBody  = Cypress.env('protocoloBody');
    let processoId;
    let documentoId;
    let token;
    

    it("Autuação",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Advogado-->')
        cy.loginViaApi('loginAdv')
        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value  
        cy.writeFile('cypress/fixtures/x-xsrf-token.json', {'X-XSRF-TOKEN': token})

        cy.fixture('x-xsrf-token.json').then((token)=>{

        cy.request({
          method: 'POST',
          url: '/pje-comum-api/api/processos/dadosiniciaisautuacao/',
          body: Cypress.env('requestBody'),
          headers: token,
          failOnStatusCode: false
          }).as("response").then((response) => {
          processoId = response.body.split('/')[1];   
          assert.isNotNaN(processoId)
          cy.writeFile('cypress/fixtures/processoId.json', processoId)
          cy.log(processoId)
        
        })

        cy.fixture('processoId.json').then((id)=>{
            cy.request({
                method: 'POST',
                url: `/pje-comum-api/api/processos/id/${id}/assuntos/`, 
                body : Cypress.env('assuntoBody'),
                headers: token,
                failOnStatusCode: false
                }).as("response").then((response)=>{
                expect(response.status).to.eq(200)
                console.log('***Adiciona assunto ao processo')
                console.log('Assunto: ', response.body.assunto.descricao);
                })
    
        

        prioridadeBody = JSON.stringify(prioridadeBody).replace('"{{id}}"', id);
        prioridadeBody = JSON.parse(prioridadeBody);
        
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/prioridades/`,
          body: prioridadeBody, 
          headers: token,
          failOnStatusCode: false
          }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log('***Adiciona prioridade ao processo')
          console.log('Prioridades: ', response.body.prioridadeProcessual.descricao);
          })

        poloAtivoBody = JSON.stringify(poloAtivoBody).replace('"{{id}}"', id);
        poloAtivoBody = JSON.parse(poloAtivoBody);
          
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/partes/`,
          body: poloAtivoBody,
          headers: token,
          failOnStatusCode: false
          }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          console.log('***Inclui partes no processo')
          })

        poloPassivoBody = JSON.stringify(poloPassivoBody).replace('"{{id}}"', id);
        poloPassivoBody = JSON.parse(poloPassivoBody);
          
        cy.request({
          method: 'POST',
          url: `/pje-comum-api/api/processos/id/${id}/partes/`,   
          body: poloPassivoBody, 
          headers: token,
          failOnStatusCode: false
          }).as("response").then((response)=>{
          expect(response.status).to.eq(200)   
          })

        alteraProcessoBody = JSON.stringify(alteraProcessoBody).replace(/"{{id}}"/g, id);
        alteraProcessoBody = JSON.parse(alteraProcessoBody);
          
        cy.request({
          method: 'PUT',
          url: `/pje-comum-api/api/processos/${id}`,    
          body : alteraProcessoBody, 
          headers: token,
          failOnStatusCode: false
          }).as("response").then((response)=>{
          expect(response.status).to.eq(200)
          })
          
        })
})
        })   
})

    it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Magistrado-->')
        cy.loginViaApi('loginComum')
        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;
    })
    
    cy.fixture('processoId.json').then((id)=>{
      cy.log(`${id}`)
    cy.request({
        method: 'POST',
        url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,   
        body: minutaBody,
        headers: {'X-XSRF-TOKEN': token},
        failOnStatusCode: false
        }).as("response").then((response)=>{
        //expect(response.status).to.eq(200)
        console.log('***Grava o conteúdo de um documento em elaboração em um processo e recupera o Id do documento')
        console.log('Petição inicial: ',response.body);
        
        documentoId = response.body.id;

        assert.isNotNaN(documentoId)

        cy.writeFile ('cypress/fixtures/documentoId.json', `${documentoId}`);
            
        })

        cy.fixture('documentoId.json').then((docId)=>{

            cy.log(docId)
            
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
              //tarefaId = response.body.idTarefa;
              //cy.wrap(tarefaId).as('tarefaId');
            })
})
})
})
})