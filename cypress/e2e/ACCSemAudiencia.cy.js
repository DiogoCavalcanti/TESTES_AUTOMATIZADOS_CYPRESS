describe('', ()=>{
    it("", {baseUrl: 'https://desenvolvimento.pje.csjt.jus.br/'}, ()=>{

        let endP;
        let endP0;
        let fullUrl;

        cy.loginMagistrado()

        cy.window().then((win)=>{
            cy.stub(win, 'open').as('novaAba')
        })


        cy.get(':nth-child(3) > .container-item-menu').click()
        cy.get('#inputNumeroProcesso').type('0002385-53.2025.5.10.0999')
        

        cy.get('.cdk-drag > :nth-child(4) > .mat-tooltip-trigger > :nth-child(1)').click()

        cy.get('@novaAba').should('be.calledWith', Cypress.sinon.match.string).then((stub)=>{
            endP = stub.args[0][0]
            endP0 = endP.replace('/','');
            fullUrl = `${Cypress.config('baseUrl')}${endP0}`;
            //console.log(endP0)
            //console.log(endP)
            //console.log(fullUrl)
            //console.log(`${Cypress.config('baseUrl')}`)
            cy.visit(fullUrl)
        })

        cy.get('[aria-label="Análise"]').click();

        cy.get('[aria-label="Encaminhar ao CEJUSC"]').click();

        cy.get('.opcoes > .mat-focus-indicator');

        cy.visit('https://desenvolvimento.pje.csjt.jus.br/pjekz/painel/gim');

        cy.get('.icone-usuario > .mat-button-wrapper').click()

        cy.get('.mat-warn').click();

        //cy.visit('https://desenvolvimento.pje.csjt.jus.br/primeirograu/login.seam');
        cy.get('#username').type('31017994811');
        cy.get('#password').type('csjt@pje123');
        cy.get('#btnEntrar').click();
        
        cy.get(':nth-child(3) > .container-item-menu > .mat-focus-indicator').click()
        cy.get('#inputNumeroProcesso').type('0002385-53.2025.5.10.0999')

        cy.get('.cabecalho').click()


        
        



    })
    


})