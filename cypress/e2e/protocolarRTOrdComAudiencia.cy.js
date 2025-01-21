describe('ProtocolarRTOrdContraPGFN', ()=>{
    before('login', ()=>{
        cy.loginAdv();
    })

    it('Deve protocolar RTOrd contra PGFN', ()=>{
        cy.get(':nth-child(27) > .container-item-menu > .mat-focus-indicator').click();
        
        cy.get('#mat-input-0').click();
        cy.contains('GAMA-DF').click();

        cy.get('#mat-input-1').click();
        cy.contains('Ação Trabalhista - Rito Ordinário').click();
        
        cy.get('.botao-salvar').click();
        
        //Adicinar PA
        cy.get('#cdk-step-label-0-2').click();
        cy.get('.texto-verde > .fa').click();
        cy.get('#inputCPF').type('02165163587')
        cy.get('.botoes-pesquisa-cpf > .mat-focus-indicator').click();
        cy.get('.display-flex.ng-star-inserted > .mat-action-row > .mat-focus-indicator').click();
        cy.get('.botao-salvar').click();

         //Adicionar PP
         cy.get('.texto-laranja > .fa').click();
         cy.get('#mat-tab-label-2-2').click();
         cy.get('#inputCNPJ').type('01519235000157');
         cy.get('[aria-label="Pesquisar CNPJ"]').click();
         cy.get('.display-flex.ng-star-inserted > .mat-action-row > .mat-focus-indicator').click();
         cy.get('.mat-card-content.botoes-cadastro-crud > .botao-salvar').click();

         cy.get('#cdk-step-label-0-1').click();
         cy.get('#cdk-drop-list-1 > :nth-child(5) > :nth-child(1) > .container-icones > .mat-focus-indicator').click();

         cy.get('#cdk-step-label-0-3').click();
         cy.get('#mat-input-4').type('1000000');

         cy.get('#cdk-step-label-0-5').click();
         cy.get('.mat-slide-toggle-content > [aria-hidden="true"]').click();
         cy.get(':nth-child(1) > .tree-node-level-2 > tree-node-wrapper > .node-wrapper').click();
         cy.get('[aria-label="Assinar documento e juntar ao processo"]').click();
         cy.get('.mat-dialog-actions > .mat-focus-indicator').click();

         cy.get('#cdk-step-label-0-6').click();
         cy.get('#mat-input-5').click();
         cy.contains('DISTRITO FEDERAL').click();

         cy.get('#mat-input-6').click();
         cy.contains('BRASILIA').click();
         
         cy.get('#mat-input-7').click();
         cy.contains('INDÚSTRIA DE CONSTRUÇÃO CIVIL E MOBILIÁRIA').click();

         cy.get('.botao-protocolar').click();
         cy.get('form.ng-pristine > .mat-action-row > .mat-primary').click();
         cy.get('[type="submit"]').click();

         //Logout
         cy.get('.icone-usuario > .mat-button-wrapper > .fa').click();
         cy.get('.mat-warn').click();
         cy.url().should('be.equal', 'https://desenvolvimento.pje.csjt.jus.br/primeirograu/login.seam')
         

    })

})