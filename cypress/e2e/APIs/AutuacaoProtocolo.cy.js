describe('Protocolar Processo via API', ()=>{

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

     
        //Login Adv & Token
        it("Autuação",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
          cy.loginViaApi('loginAdv')
          cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
          const token = cookie.value;

        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          
          //Dados Iniciais Autuação -> Inclui novo processo a partir dos dados iniciais (jurisdição e classe judicial)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            cy.wrap(processoId).as('processoId');
            console.log('Corpo da requisição : ', requestBody)
            console.log('Id do processo criado : ', processoId)
            
          })
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
          //Assuntos
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.get('@processoId').then((id) =>{
          
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/assuntos/`, 
            body : assuntoBody,
            headers: {
              
                'X-XSRF-TOKEN': token
  
            },
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Assunto: ', response.body);
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
            headers: {
              
              'X-XSRF-TOKEN': token
  
            },
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
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
            headers: {  
              
              'X-XSRF-TOKEN': token
  
            },
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
            headers: { 
              
              'X-XSRF-TOKEN': token
  
            },
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
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
            headers: { 
              
              'X-XSRF-TOKEN': token
  
            },
            failOnStatusCode: false
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Prioridades: ', response.body);
            })
        })
    })
})

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          //Login Magistrado

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        it("Assinatura e Protocolo",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
            cy.loginViaApi('loginMagistrado')
            cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
            const token = cookie.value;
            cy.wrap(processoId).as('processoId');
            cy.get('@processoId').then((id) =>{
          
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
          //Grava o conteúdo de um documento em elaboração em um processo

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'POST',
            url: `/pje-comum-api/api/processos/id/${id}/documentos/minuta/U/metadados`,        //Enum ANEXAR_DOCUMENTOS('A'), AUTUACAO('U')
            body: minutaBody,
            headers: {
              
              'X-XSRF-TOKEN': token
  
            },
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Petição inicial: ',response.body);
            
            documentoId = response.body.id;
            cy.wrap(documentoId).as('documentoId')
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
            headers: {
  
              'X-XSRF-TOKEN': token
  
            },
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
            headers: {
              
              'X-XSRF-TOKEN': token
  
            },
            }).as("response").then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Assinatura realizada: ', response.body)
            })
  
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          cy.request({
            method: 'GET',
            url: `/pje-comum-api/api/processos/id/${id}/documentos/id/${docId}/assinatura`,
            }).as("response").then((response)=>{
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
            headers: {
              
              'X-XSRF-TOKEN': token
  
            },
            }).as("response").then((response)=>{
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
        /*audienciaBody = JSON.stringify(audienciaBody).replace(/"{{id}}"/g, id)
        .replace('"{{data}}"', data)
        .replace(/"{{hora}}"/g, hora);
        audienciaBody = JSON.parse(audienciaBody);*/
          cy.request({
            method: 'POST',
            url: 'pje-comum-api/api/pautasaudiencias/audiencias',
            body: {               
                    "buscarProximoHorarioVago": false,
                    "considerarIntersticio": true,
                    "data": `${data}`,                           //"2025-02-05T03:00:00.000Z",
                    "horarioFinal": `${hora}`,                  //"09:07",
                    "horarioInicial": `${hora}`,               //"09:06",
                    "idProcesso": `${id}`,
                    "idSalaFisica": 253,
                    "idTipoAudiencia": 3,
                    "validarHorario": true
                  },
            
            headers: {
              
                'X-XSRF-TOKEN': token
    
            },
            failOnStatusCode: false
          }).as("response").then((response)=>{
            console.log('Audiência marcada: ', response.body)
          })
          
          })
        })    
      })
    })
})

})
})