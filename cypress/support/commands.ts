export { }

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
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
