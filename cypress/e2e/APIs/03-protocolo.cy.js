describe('Protocola o documento peticionado', ()=>{


    let assinaturaBody = Cypress.env('assinaturaBody');
    let protocoloBody = Cypress.env('protocoloBody');
    let token;
    
    beforeEach('Limpeza', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    })

    // Devem ser executados o setupPeticao.cy.js e o peticao.cy.js antes de executar esse teste

    it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Magistrado-->')
        cy.loginApiSessions('loginSecAud')

        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;

        cy.fixture('processoId.json').then((id)=>{   
        cy.fixture('documentoId.json').then((docId)=>{

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

    cy.request({
        method: 'GET',
        url: `/pje-comum-api/api/processos/id/${id}/documentos/id/${docId}/assinatura`,
        }).as("response").then((response)=>{
        console.log('***Retorna os dados da assinatura')
        console.log('Assinatura: ', response.body)
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
        const nrProcesso = response.body.nrProcesso

        cy.readFile ('cypress/fixtures/nrProcesso.json').then((lista)=>{           
            cy.writeFile('cypress/fixtures/nrProcesso.json', [...lista, nrProcesso])
        })
    }) 
    
})
})
})
})
})
