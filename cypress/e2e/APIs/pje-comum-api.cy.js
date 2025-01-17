describe('Teste de requisição API', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.loginViaApi('loginMagistrado');    //Mudar o tipo de usuário de acordo com os armazenados na pasta fixtures
    });

    it('Busca todos os assuntos', ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos',
      }).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body[2].descricao).to.eq('Magistratura')
        expect(response.body[2]).to.have.property('codigo')
        console.log(response.body.length);
        console.log(response.body)
    })
    })

    it('Busca assuntos em formato de árvore', ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos/arvore'
      }).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body[3].descricao).to.eq('DIREITO À EDUCAÇÃO')
        console.log(response.body.length)
      })
    })

    it('Recupera id e descrição dos assuntos.',()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/dominio/assuntos/dadosbasicos',     
      }).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body[3]).to.have.property('id');
        expect(response.body[3]).to.have.property('descricao');
        console.log(response.body)
        console.log('Id: ', response.body[3].id)
        console.log('Descriçao: ', response.body[3].descricao)
      })
    })

    it('Recupera a descrição de todos os assuntos', ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/descricoes'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('Descrição: ', response.body[3])
      })
    })

    it('Buscar assuntos filtrando por lista de códigos', ()=>{       //códigos podem ser obtidos /pje-comum-api/api/dominio/assuntos
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
          "13313" 
        ]
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log('Assunto por código:', response.body[0].descricao)
      })
    })
  })

    it('Buscar todos os assuntos que ainda não estejam adicionados ao processo', ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/todos'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body[3]).to.have.property('id');
        expect(response.body[3]).to.have.property('descricao');
      })
    })

    it('Busca um Assunto por ID', ()=>{
      cy.request({
        method: 'GET',
        url: 'pje-comum-api/api/dominio/assuntos/4170'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })
    
    it('Adiciona novo assunto ao processo', ()=>{
      cy.getCookie('Xsrf-Token').should('exist').then((cookie) => {
        const token = cookie.value;
    cy.request({
      method: 'POST', 
      url: '/pje-comum-api/api/processos/id/259274/assuntos',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'X-XSRF-TOKEN': token
      },
      failOnStatusCode: false,
      body: {
        //id: 77,
        idProcesso: 259274,
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

    it('Remove assunto do processo pelo seu id', ()=>{
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

    it('Lista os complementos referentes a acordo parcial na assinatura de audiência', ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/atasaudiencia/complementos-acordo-parcial'
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })

    it('Conta o número de atas não pendentes', ()=>{
      cy.request({
        method: 'GET',
        url: '/pje-comum-api/api/atasaudiencia/totais',
        failOnStatusCode: false
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })

    it('Consulta pessoas fisicas/advogados', ()=>{
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

    /*it('', ()=>{
      cy.request({
        method: 'HEAD',
        url: '/pje-comum-api/api/pessoas/fisicas/advogados/208724',
        failOnStatusCode: false
      }).then((response)=>{
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })*/


    

});
