describe('Testes das APIs de autuação', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.fixture('loginAdv').then((loginData) => {
      cy.request({
        method: 'POST',
        url: '/primeirograu/logar.seam',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: '*/*'
        },
        body: loginData, 
      }).then((response) => {
        expect(response.status).to.eq(200); 
        cy.log(JSON.stringify(response.body)); 
      });
    });
  })

    it('Buscar as permissões do usuário logado',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
        cy.request({
          method: 'GET',
          url: '/pje-seguranca/api/token/permissoes/recursos',
        }).then((response)=>{
        expect(response.status).to.eq(200);
        console.log(response.body)
        console.log(response.body[18].caminhoMenu);
        });
    });

    it('Buscar jurisdições',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/dominio/jurisdicoes',
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[3].descricao).to.eq('GAMA-DF')
            console.log('Jurisdições: ', response.body)
        });
    });

    it('Buscar classes judiciais pelo ID da jurisdição',{ baseUrl: 'https://desenvolvimento.pje.csjt.jus.br'}, ()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/dominio/classesjudiciais/jurisdicao/11',
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[3].descricao).to.eq('Ação Trabalhista - Rito Ordinário');
            console.log('Classes Judiciais: ', response.body);
        });
    });
})