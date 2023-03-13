describe("Testira login stranicu", () => {
  beforeEach(() => {
    cy.visit("/login");
  })

  it("Prikazuje polja za unos emaila i šifre", () => {
    cy.get("#useremail").should("exist");
    cy.get("#userpassword").should("exist");
  })

  it("Prikazuje se greška za pogrešan email format", () => {
    cy.get("#useremail").type("neki nasumični tekst");
    cy.get(".email-validator > span").should("be.visible");
  })

  it("Prikazuje se popup za nepopunjen email ili šifru", () => {
    cy.get("[type='submit']").click();
    cy.get(".modal-body").should("be.visible");
    cy.get(".modal-body button").click();
    cy.get("#useremail").type(Cypress.env("email"));
    cy.get("[type='submit']").click();
    cy.get(".modal-body").should("be.visible");
  })

  it("JWT je postavljen nakon logina", () => {
    cy.get("#useremail").type(Cypress.env("email"));
    cy.get("#userpassword").type(Cypress.env("password"));
    cy.get("[type='submit']").click();
    cy.url().should("equal", Cypress.config().baseUrl).and(() => {
      expect(sessionStorage.getItem("jwt")).not.to.be.null;
    });
  })
})
