describe('Remeter Processo Para o 2Grau', ()=>{

    let token;
    let transicoesAnaliseBody = Cypress.env('transicoesAnaliseBody')
    let transicoesRemeterBody = Cypress.env('transicoesRemeterBody')
    let remessasBody = Cypress.env('remessasBody')

   

    it('remete um processo ao segundo grau', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
        cy.loginViaApi('loginMagistrado')
        
        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;
                
        cy.fixture('processoId.json').then((id)=>{

        transicoesAnaliseBody = JSON.stringify(transicoesAnaliseBody).replace(/"{{id}}"/g, id);
        transicoesAnaliseBody = JSON.parse(transicoesAnaliseBody);

        cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/tarefas/63/transicoes`,
            headers:{'X-XSRF-TOKEN': token},
            body: transicoesAnaliseBody,
            failOnStatusCode:false
        }).as("response").then((response)=>{
            console.log(response.body)
        })

        cy.request({
            method: 'PUT',
            url: `/pje-comum-api/api/processos/id/${id}/tarefas/490/`,
            headers: {'X-XSRF-TOKEN': token},
            body:{"idProcesso": `${id}`},
            failOnStatusCode:false
        }).as("response").then((response)=>{
            console.log(response.body)
        })


        transicoesRemeterBody = JSON.stringify(transicoesRemeterBody).replace(/"{{id}}"/g, id);
        transicoesRemeterBody = JSON.parse(transicoesRemeterBody);

        cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/tarefas/490/transicoes`,
            headers: {'X-XSRF-TOKEN': token},
            body: transicoesRemeterBody,
            failOnStatusCode:false
        }).as("response").then((response)=>{
            console.log(response.body)
        })

        cy.request({
            method: 'PUT',
            url: `/pje-comum-api/api/processos/id/369017/tarefas/199/`,
            headers: {'X-XSRF-TOKEN': token},
            body:{"idProcesso": `${id}`},
            failOnStatusCode:false
        }).as("response").then((response)=>{
            console.log(response.body)
        })


        remessasBody = JSON.stringify(remessasBody).replace(/"{{id}}"/g, id);
        remessasBody = JSON.parse(remessasBody);

        cy.request({
            method: 'POST',
            url: '/pje-remessa-api/api/remessas',
            headers: {'X-XSRF-TOKEN': token},
            body: remessasBody,
            failOnStatusCode:false
        }).as("response").then((response)=>{
            console.log(response.body)
        })
    })

})

})

})







