describe('Autuação, Protocolo, Assinatura e Audiência ***Session***', ()=>{

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
let processoId;
let documentoId;
let token;


beforeEach('Limpeza', ()=>{
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.reload()
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Login & Token
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it("Autuação",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Advogado-->')
        cy.loginApiSessions('loginAdv')

        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          
          //Inclui novo processo a partir dos dados iniciais (jurisdição e classe judicial)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    cy.request({
        method: 'POST',
        url: '/pje-comum-api/api/processos/dadosiniciaisautuacao/',
        body: requestBody,
        headers: {
            'X-XSRF-TOKEN': token
        },
        failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(200);
        processoId = response.body.split('/')[1];
        cy.writeFile('cypress/fixtures/processoId.json', processoId)

        console.log('***Cria novo processo a partir dos dados iniciais e recupera o Id')
        console.log('Id do processo : ', processoId)
        
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
          //Adiciona assunto ao processo
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture('processoId.json').then((id)=>{
    cy.request({
        method: 'POST',
        url: `/pje-comum-api/api/processos/id/${id}/assuntos/`, 
        body : assuntoBody,
        headers: {'X-XSRF-TOKEN': token},
        failOnStatusCode: false
        }).then((response)=>{
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
        headers: {'X-XSRF-TOKEN': token},
        failOnStatusCode: false
        }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('***Adiciona prioridade ao processo')
        console.log('Prioridades: ', response.body.prioridadeProcessual.descricao);
       
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
          //Adiciona Polo Ativo

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    poloAtivoBody = JSON.stringify(poloAtivoBody).replace('"{{id}}"', id);
    poloAtivoBody = JSON.parse(poloAtivoBody);
          
    cy.request({
        method: 'POST',
        url: `/pje-comum-api/api/processos/id/${id}/partes/`,
        body: poloAtivoBody,
        headers: {'X-XSRF-TOKEN': token},
        failOnStatusCode: false
        }).then((response)=>{
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
        }).then((response)=>{
        expect(response.status).to.eq(200)   
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          //Valida se as partes foram adicionadas

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.request({
        method: 'GET',
        url: `/pje-comum-api/api/processos/id/${id}/partes`
        }).then((response)=>{
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
        }).then((response)=>{
        expect(response.status).to.eq(200)
    }) 

})
})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Peticiona o documento

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it("Petição Inicial",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Servidor-->')
        cy.loginApiSessions('loginComum')

        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;
    
    cy.fixture('processoId.json').then((id)=>{    
        cy.log(`${id}`)
    cy.request({
        method: 'POST',
        url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,   
        body: minutaBody,
        headers: {'X-XSRF-TOKEN': token},
        failOnStatusCode: false
        }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('***Peticiona o documento em elaboração em um processo e recupera o Id do documento')
        console.log('Petição inicial: ',response.body);
            
        documentoId = response.body.id;
        cy.writeFile ('cypress/fixtures/documentoId.json', `${documentoId}`);
            
    })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
          
          //Grava o conteúdo de um documento HTML em elaboração na localização atual do usuário

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture('documentoId.json').then((docId)=>{
    gravacaoDocBody = JSON.stringify(gravacaoDocBody).replace('"{{docId}}"', docId);
    gravacaoDocBody = JSON.parse(gravacaoDocBody);
        
    cy.request({
        method: 'PUT',
        url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/${docId}`,
        body: gravacaoDocBody,
        headers: {'X-XSRF-TOKEN': token},
        }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
        })


    })
})
})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Magistrado-->')
        cy.loginApiSessions('loginSecAud')

        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;

        cy.fixture('processoId.json').then((id)=>{   
        cy.fixture('documentoId.json').then((docId)=>{

        assinaturaBody = JSON.stringify(assinaturaBody).replace(/"{{id}}"/g, id).replace('"{{docId}}"', docId);
        assinaturaBody = JSON.parse(assinaturaBody);
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  
          //Realiza a assinatura utilizando um assinador com certificado do Tribunal (OTP/JTe).

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    cy.request({
        method: 'POST',
        url: '/pje-comum-api/api/assinaturas2/certificadotribunal',
        body: assinaturaBody, 
        headers: {'X-XSRF-TOKEN': token},
        }).then((response)=>{
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
        }).then((response)=>{
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
        }).then((response)=>{
        console.log('***Salva as alterações e protocola o processo informado')
        console.log('Processo protocolado: ', response.body)
        const nrProcesso = response.body.nrProcesso

        cy.readFile ('cypress/fixtures/nrProcesso.json').then((lista)=>{           
            cy.writeFile('cypress/fixtures/nrProcesso.json', [...lista, nrProcesso])
        })
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
        }).then((response)=>{
        console.log('***Marca audiência em horário vago')
        console.log('Audiência marcada: ', response.body)
    })
    
})
})
})
})
})
})
})
