// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('loginMagistrado', () => {
    cy.visit('https://desenvolvimento.pje.csjt.jus.br/primeirograu/login.seam');
    cy.get('#username').type('61417831553');
    cy.get('#password').type('csjt@pje123');
    cy.get('#btnEntrar').click();
});

Cypress.Commands.add('loginAdv', ()=>{
    cy.visit('https://desenvolvimento.pje.csjt.jus.br/primeirograu/login.seam');
    cy.get('#username').type('03073350110');
    cy.get('#password').type('csjt@pje123');
    cy.get('#btnEntrar').click();
})

Cypress.Commands.add('loginViaApi', (loginTipo)=>{
    let fixturePath = loginTipo || 'loginComum';
    cy.fixture(fixturePath).then((loginData) => {
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
            cy.getCookies().then((cookies) => {
              cookies.forEach((cookie) => {
                Cypress.env(cookie.name, cookie.value);
                //console.log(cookie.name, cookie.value);
            });
        });
    });
});
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
