export { }

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      btnClickStock(): Chainable<void>
    }
  }
}

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.url().should("includes", "login");
  cy.get("#useremail").type(Cypress.env("email"));
  cy.get("#userpassword").type(Cypress.env("password"));
  cy.get("[type='submit']").click();
  cy.url().should("equal", Cypress.config().baseUrl);
})

Cypress.Commands.add("btnClickStock", () => {
  cy.get('button:contains("5 min")').click();
  cy.get('button:contains("5 min")').should('have.class', 'active')
  cy.get('button:contains("Sat")').click()
  cy.get('button:contains("Sat")').should('have.class', 'active')
  cy.get('button:contains("Dan")').click()
  cy.get('button:contains("Dan")').should('have.class', 'active')
  cy.get('button:contains("Nedelja")').click()
  cy.get('button:contains("Nedelja")').should('have.class', 'active')
  cy.get('button:contains("Mesec")').click()
  cy.get('button:contains("Mesec")').should('have.class', 'active')

})
