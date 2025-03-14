describe('Setup Petição', ()=>{

    let poloAtivoBody = Cypress.env('poloAtivoBody');
    let poloPassivoBody = Cypress.env('poloPassivoBody');
    let alteraProcessoBody = Cypress.env('alteraProcessoBody');
    let prioridadeBody = Cypress.env('prioridadeBody');
    let requestBody = Cypress.env('requestBody');
    let assuntoBody = Cypress.env('assuntoBody');
    let processoId;
    let token;
    
    beforeEach('Limpeza', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    })
    
        it("Prepara o documento para ser peticionado",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
            console.log('<--Logado Perfil Advogado-->')
            cy.loginApiSessions('loginAdv')
    
            cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
            token = cookie.value;
            
        cy.request({
            method: 'POST',
            url: '/pje-comum-api/api/processos/dadosiniciaisautuacao/',
            body: requestBody,
            headers: {
                'X-XSRF-TOKEN': token
            },
            failOnStatusCode: false
            }).as("response").then((response) => {
            expect(response.status).to.eq(200);
            processoId = response.body.split('/')[1];
            cy.writeFile('cypress/fixtures/processoId.json', processoId)
    
            console.log('***Cria novo processo a partir dos dados iniciais e recupera o Id')
            console.log('Id do processo : ', processoId)
            
        })
    
        cy.fixture('processoId.json').then((id)=>{
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
    
        prioridadeBody = JSON.stringify(prioridadeBody).replace('"{{id}}"', id);
        prioridadeBody = JSON.parse(prioridadeBody);
            
        cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/prioridades/`,
            body: prioridadeBody, 
            headers: {'X-XSRF-TOKEN': token},
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
            headers: {'X-XSRF-TOKEN': token},
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
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)   
        })
    
        cy.request({
            method: 'GET',
            url: `/pje-comum-api/api/processos/id/${id}/partes`
            }).as("response").then((response)=>{
            console.log('Partes : ', response.body)
        })
    
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
})    