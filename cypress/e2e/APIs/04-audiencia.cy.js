describe('Marca Audiência em Horário Vago', ()=>{

    let token;
    let dataHoraAtual = new Date();   
    dataHoraAtual.setDate(dataHoraAtual.getDate() + 1); 
    let data = dataHoraAtual.toISOString().slice(0, 10); 
    let hora = dataHoraAtual.toISOString().slice(11, 19); 
    
    beforeEach('Limpeza', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    })

    // Devem ser executados o setupPeticao.cy.js , peticao.cy.js e o protocolo.cy.js antes de executar esse teste

    it("Marcar audiência",{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, () =>{
        console.log('<--Logado Perfil Magistrado-->')
        cy.loginApiSessions('loginSecAud')

        cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        token = cookie.value;

        cy.fixture('processoId.json').then((id)=>{   
        cy.fixture('documentoId.json').then((docId)=>{
        
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
                "idSalaFisica": 277,
                "idTipoAudiencia": 3,
                "validarHorario": true
                },
            headers: {'X-XSRF-TOKEN': token},
            failOnStatusCode: false
            }).as("response").then((response)=>{
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
