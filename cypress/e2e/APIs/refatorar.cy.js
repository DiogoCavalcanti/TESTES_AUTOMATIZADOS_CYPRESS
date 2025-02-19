describe('', ()=>{
    it('login', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
        cy.loginViaApi('loginMagistrado')
            cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
                const token = cookie.value

            cy.fixture('processoId.json').then((id)=>{

                
            
            cy.request({
                method: 'GET',
                url: `/pje-comum-api/api/processos/id/${id}/tarefas`,
                failOnStatusCode: false
            }).as("response").then((response)=>{
                console.log(response.body)
            })
            
            cy.request({
                method: 'GET',
                url: `/pje-comum-api/api/processos/id/${id}/tarefas/281/transicoes`,
                failOnStatusCode: false
            }).as("response").then((response)=>{
                console.log(response.body)
            })
                
            

            })
        

            })

            
    })
})