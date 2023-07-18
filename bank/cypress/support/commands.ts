export { }

declare global {
  namespace Cypress {
    interface Chainable {
      loginEmployee(): Chainable<void>
      loginClient(): Chainable<void>
    }
  }
}

Cypress.Commands.add("loginEmployee", () => {
  cy.visit("/");
  cy.url().should("includes", "login");
  cy.get("#useremail").type(Cypress.env("email"));
  cy.get("#userpassword").type(Cypress.env("password"));
  cy.get("[type='submit']").click();
  cy.url().should("equal", Cypress.config().baseUrl);
})

Cypress.Commands.add("loginClient", () => {
  cy.visit("/");
  cy.url().should("includes", "login");
  cy.get("#useremail").type(Cypress.env("emailClient"));
  cy.get("#userpassword").type(Cypress.env("passwordClient"));
  cy.get("[type='submit']").click();
  cy.url().should("equal", Cypress.config().baseUrl);
})
