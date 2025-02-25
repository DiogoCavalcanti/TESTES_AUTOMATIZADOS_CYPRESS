describe('Peticiona um documento passando o Id do processo', ()=>{

let minutaBody = Cypress.env('minutaBody');
let gravacaoDocBody = Cypress.env('gravacaoDocBody')
let documentoId;
let token;

    // Deve ser executado o setupPeticao.cy.js antes de executar esse teste

    it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Magistrado-->')
        cy.loginViaApi('loginMagistrado')
        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;
        cy.fixture('processoId.json').then((id)=>{

            cy.request({
                method: 'POST',
                url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,   
                body: minutaBody,
                headers: {'X-XSRF-TOKEN': token},
                failOnStatusCode: false
                }).as("response").then((response)=>{
                    cy.log(response.body.mensagem)
                    console.log('***Grava o conteúdo de um documento em elaboração em um processo e recupera o Id do documento')
                    console.log('Petição inicial: ',response.body);
                    cy.writeFile ('cypress/fixtures/peticaoBody.json', response.body);
                    
                    //cy.wrap(response.body).its("tipo").should("eq", "Petição Inicial")
                
                
                documentoId = response.body.id;
                cy.writeFile ('cypress/fixtures/documentoId.json', `${documentoId}`);
                
                })

                cy.fixture('documentoId.json').then((docId)=>{
                    gravacaoDocBody = JSON.stringify(gravacaoDocBody).replace('"{{docId}}"', docId);
                    gravacaoDocBody = JSON.parse(gravacaoDocBody);
                        
                    cy.request({
                        method: 'PUT',
                        url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/${docId}`,
                        body: gravacaoDocBody,
                        headers: {'X-XSRF-TOKEN': token},
                        }).as("response").then((response)=>{
                        expect(response.status).to.eq(200)
                        console.log(response.body)
                        })
                
                
                    })

            

})
})
})
})