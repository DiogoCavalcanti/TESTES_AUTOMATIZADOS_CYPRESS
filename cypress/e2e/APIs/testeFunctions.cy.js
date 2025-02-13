describe('', ()=>{
    it("cypress wrap example", ()=>{
        cy.visit("https://www.bstackdemo.com/")
        cy.get(".products-found").invoke("text").as("productsFound")
        cy.contains(".checkmark", "Apple").then(($checkmark)=>{
            cy.wrap($checkmark).click()
            cy.get("@productsFound").should("eq", "9 Product(s) found.")
            cy.wrap($checkmark).click()
            cy.get("@productsFound").should("eq", "25 Product(s) found.")
        })
    })

    it("cypress wrap advanced example", ()=>{
        cy.intercept("api/products").as("productList")
        cy.visit("https://www.bstackdemo.com/")
        cy.wait("@productList").then((responseData)=>{
            console.log(responseData.response.body)
            cy.wrap(responseData.response.body).its("products").its(9)
            .should("have.property", "title", "Galaxy S20")
        })
    })

    function fetchDataFromApi() {
        return fetch('https://www.bstackdemo.com/api/products')
          .then((response) => response.json());
      }

      it("Wrapping function", () => {  
        cy.wrap(fetchDataFromApi()).its("products").then((data) => {
            cy.wrap(data).its(0).should("have.property","title", "iPhone 12")
          });
       
      })
})