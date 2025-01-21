describe('', ()=>{
    beforeEach('loginMagistrado', ()=>{
        cy.loginMagistrado();
    })

    it('verificaChips', ()=>{

        //cy.visit('https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/366315/detalhe')

        cy.get(':nth-child(3) > .container-item-menu > .mat-focus-indicator').click();
        cy.get('#inputNumeroProcesso').type('0002191-58.2022.5.10.0999')
        cy.get('.container-icones > :nth-child(1) > .mat-focus-indicator').click();

        cy.puppeteer('mudarPagina');

    })
})