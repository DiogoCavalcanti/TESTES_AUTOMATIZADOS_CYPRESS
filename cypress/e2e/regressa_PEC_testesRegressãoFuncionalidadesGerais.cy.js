describe('Fazer uma intimação no PEC no novo processo', ()=>{
    before('login', ()=>{
        cy.loginMagistrado();
    })

    it('', ()=>{

        cy.visit('https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/365973/tarefa/63/transicao')
        /*cy.visit('https://desenvolvimento.pje.csjt.jus.br/pjekz/painel/gim');

        cy.get(':nth-child(3) > .container-item-menu').click();
        cy.get('#inputNumeroProcesso').type('0000166-67.2025.5.10.0999');

        cy.get('.clicavel-sem-padding > span').click();

        //Leva a uma nova janela-----Usar puppeteer a partir desse ponto

        //cy.visit('https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/365975/tarefa/63/transicao');

        //cy.puppeteer("switchTabAndGetContent")
        //.should('equal', " Triagem Inicial ")*/
    })
})




//0000168-37.2025.5.10.0999
//0000167-52.2025.5.10.0999
//0000166-67.2025.5.10.0999
//0000165-82.2025.5.10.0999
//0000164-97.2025.5.10.0999
