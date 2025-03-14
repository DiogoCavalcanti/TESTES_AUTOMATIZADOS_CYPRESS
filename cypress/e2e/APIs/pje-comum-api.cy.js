describe('Testes das APIs de assuntos do pje comum', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.loginViaApi('loginMagistrado');    //Mudar o tipo de usuário de acordo com os armazenados na pasta fixtures
    });

    it('Busca todos os assuntos',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos',
      }).then((response)=>{
        console.log('Assuntos:', response.body)
    })
    }) 

    it('Busca assuntos em formato de árvore',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos/arvore'
      }).then((response)=>{
        console.log('Corpo da resposta:', response.body)
      })
    })

    it('Recupera id e descrição dos assuntos.',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'},()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos/dadosbasicos',     
      }).then((response)=>{
        console.log('Descriçao: ', response.body)
      })
    })

    it('Recupera a descrição de todos os assuntos',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/descricoes'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('Descrição Assuntos: ', response.body)
      })
    })

    it('Buscar assuntos filtrando por lista de códigos',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{       //códigos podem ser obtidos /pje-comum-api/api/dominio/assuntos
      cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        const token = cookie.value;
      cy.request({
        method: 'POST',
        url: 'pje-comum-api/api/dominio/assuntos/porcodigos',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'X-XSRF-TOKEN': token
        },
        failOnStatusCode: false,
        body: [
          "10894" 
        ]
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('Assunto por código - Descrição :', response.body[0].descricao)
      })
    })
  })

    it('Buscar todos os assuntos que ainda não estejam adicionados ao processo',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/todos'
      }).then((response)=>{
        console.log('Assuntos não adicionados ao processo :', response.body)
      })
    })

    it('Busca um Assunto por ID',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/4170'
      }).then((response)=>{
        console.log(response.body)
      })
    })
    
    it('Adiciona novo assunto ao processo',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        const token = cookie.value;
    cy.request({
      method: 'POST', 
      url: '/pje-comum-api/api/processos/id/366872/assuntos',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'X-XSRF-TOKEN': token
      },
      failOnStatusCode: false,
      body: {
        idProcesso: 366872,
        assunto: {
          id: 4170,
          idAssuntoSuperior: 4167,
          codigo: '13630',
          
        },
        principal: true
      }
    }).then((response) => {
      console.log(response.body);
    });
  });
});

    it('Remove assunto do processo pelo seu id',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        const token = cookie.value;
      cy.request({
        method: 'DELETE',
        url: '/pje-comum-api/api/processos/id/259274/assuntos/4167',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'X-XSRF-TOKEN': token
        },
        failOnStatusCode: false,
      }).then((response)=>{
        //expect(response.status).to.eq(200)
        console.log(response.status)
      })
    })
  })

    it('Lista os complementos referentes a acordo parcial na assinatura de audiência',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/atasaudiencia/complementos-acordo-parcial'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })

    it('Conta o número de atas não pendentes',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/atasaudiencia/totais',
        failOnStatusCode: false
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })

    it('Consulta pessoas fisicas/advogados',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/pessoas/fisicas',
        failOnStatusCode: false
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
        console.log('Total de registros: ', response.body.totalRegistros)
        console.log('Total de paginas: ', response.body.qtdPaginas)
      })
    })
  });


    


