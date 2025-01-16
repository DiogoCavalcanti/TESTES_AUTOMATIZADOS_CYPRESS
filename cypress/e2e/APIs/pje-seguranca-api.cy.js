
describe('Teste de requisição API', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.loginViaApi('loginMagistrado');    //Mudar o tipo de usuário de acordo com os armazenados na pasta fixtures
    });

    //Swagger pje-seguranca-api /token/perfis 
    it('Busca todos os perfis do usuário logado', ()=>{
        cy.request({
          method: 'GET',
          url: '/pje-seguranca/api/token/perfis',
        }).then((response)=>{
          expect(response.status).to.eq(200);
          console.log('Perfil:', response.body);
        })
    })

    //Swagger pje-seguranca-api /token/perfis/trocar
    /*it('Troca perfil do usuário logado usando seu refresh_token', ()=>{
        cy.request({
          method: 'POST',
          url: '/pje-seguranca/api/token/perfis/trocar',
          body: {
            "id_perfil": 32069
          }
      }).then((response)=>{
          expect(response.status).to.eq(201);
          console.log(response.body);
    })
  })*/
    
    //Swagger pje-seguranca-api /token/permissoes
    it('Busca todas as permissões do usuário logado', ()=>{
        cy.request({
          method: 'GET',
          url: '/pje-seguranca/api/token/permissoes',
        }).then((response)=>{
          expect(response.status).to.eq(200);
          console.log('Permissões:', response.body);
        })
    })

    //Swagger pje-seguranca-api /pjeoffice/token
    it('Cria um PJeOfficeToken para o usuário, vinculado à sua sessão (JWT)', ()=>{
        cy.request({
          method: 'POST',
          url: '/pje-seguranca/api/pjeoffice/token',
        }).then((response)=>{
          expect(response.status).to.eq(200);
          expect(response.body).to.be.a('string');
          assert.isString(response.body); //assert ou expect?
          console.log('PJeOfficeToken: ', response.body);
        })
    })

    //Swagger pje-seguranca-api /usuarios
    it('Recupera dados do perfil do usuário logado',()=>{
        cy.request({
          method: 'GET',
          url: '/pje-seguranca/api/usuarios',
        }).then((response)=>{
          assert.isObject(response.body); //assert ou expect?
          expect(response.status).to.eq(200);
          console.log('Dados recuperados: ', response.body);
        })
    })
})

  