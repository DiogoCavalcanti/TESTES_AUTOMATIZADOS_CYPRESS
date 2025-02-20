describe('Peticiona um documento passando o Id do processo', ()=>{

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
                    //expect(response.status).to.eq(200)
                    console.log('***Grava o conteúdo de um documento em elaboração em um processo e recupera o Id do documento')
                    console.log('Petição inicial: ',response.body);
                
                
                documentoId = response.body.id;
                cy.wrap(documentoId).as('documentoId');
                
                })

            

})
})
})
})