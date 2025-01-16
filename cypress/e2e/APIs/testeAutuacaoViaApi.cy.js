describe('Teste de requisição API', () => {
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

    it('Autuação de processo dados iniciais/classe judicial', ()=>{
        cy.request({
          method: 'GET',
          url: '/pje-seguranca/api/token/permissoes/recursos',
        }).then((response)=>{
        expect(response.status).to.eq(200);
        console.log(response.body[18].caminhoMenu);
        });
    });

    it('Autuação de processo dados iniciais/jurisdição', ()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/dominio/jurisdicoes',
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[3].descricao).to.eq('GAMA-DF')
            console.log(response.body[3]);
        });
    });

    it('Autuação de processo dados iniciais/classe judicial', ()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/dominio/classesjudiciais/jurisdicao/2',
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[3].descricao).to.eq('Ação Trabalhista - Rito Ordinário');
            console.log(response.body[3]);
        });
    });
})