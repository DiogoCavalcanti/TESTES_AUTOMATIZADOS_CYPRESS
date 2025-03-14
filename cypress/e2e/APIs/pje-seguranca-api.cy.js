
describe('Testes das APIs do pje-segurança', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.loginViaApi('loginComum');    //Mudar o tipo de usuário de acordo com os armazenados na pasta fixtures
    });

    //Swagger pje-seguranca-api /token/perfis 
    it('Busca todos os perfis do usuário logado', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api'},()=>{
        cy.request({
          method: 'GET',
          url: '/token/perfis',
          failOnStatusCode: false,
        }).then((response)=>{
          expect(response.status).to.eq(200);
          console.log('Endpoint : /pje-seguranca/api/token/perfis')
          console.log('Busca perfil de usuários logados')
          console.log('Perfil:', response.body[0].papel);
          console.log(response.body)
        })
    })
    
    //Swagger pje-seguranca-api /token/permissoes
    it('Busca todas as permissões do usuário logado', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api'},()=>{
        cy.request({
          method: 'GET',
          url: '/token/permissoes',
          failOnStatusCode: false,
        }).then((response)=>{
          expect(response.status).to.eq(200);
          console.log('Endpoint : /pje-seguranca/api/token/permissoes')
          console.log('Busca as permissões do usuário logado')
          console.log('Permissões:', response.body);
        })
    })

    //Swagger pje-seguranca-api /pjeoffice/token
    it('Cria um PJeOfficeToken para o usuário, vinculado à sua sessão (JWT)', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api'},()=>{
        cy.request({
          method: 'POST',
          url: '/pjeoffice/token',
          failOnStatusCode: false,
        }).then((response)=>{
          expect(response.status).to.eq(200);
          expect(response.body).to.be.a('string');
          assert.isString(response.body); //assert ou expect?
          console.log('PJeOfficeToken: ', response.body);
        })
    })

    //Swagger pje-seguranca-api /usuarios
    it('Recupera dados do perfil do usuário logado', { baseUrl: 'https://desenvolvimento.pje.csjt.jus.br/pje-seguranca/api'},()=>{
        cy.request({
          method: 'GET',
          url: '/usuarios',
          failOnStatusCode: false,
        }).then((response)=>{
          assert.isObject(response.body); //assert ou expect?
          expect(response.status).to.eq(200);
          console.log('Dados recuperados: ', response.body);
        })
    })

})

  