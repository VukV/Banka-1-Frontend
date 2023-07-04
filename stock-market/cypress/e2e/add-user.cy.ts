describe("Testira nemogućnost posete stranice bez logina", () => {
  it("Redirektuje na login stranicu pri poseti bez logina", () => {
    sessionStorage.clear();
    cy.visit("/add-user");
    cy.url().should("contain", "/login");
  })
})

describe("Testira postojanje dugmeta za dodavanje korisnika na users stranici", () => {
  it("Prikazuje dugme za dodavanje korisnika", () => {
    cy.login();
    cy.visit("/users");
    cy.get("button#addUser").should("be.visible");
  })
})

describe("Testira stranicu za dodavanje korisnika", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/users");
    cy.get("button#addUser").click();
  })

  it("Prikazuje sva potrebna polja na stranici", () => {
    cy.get("#email").should("be.visible");
    cy.get("#phone").should("be.visible");
    cy.get("#citizenId").should("be.visible");
    cy.get("#firstName").should("be.visible");
    cy.get("#lastName").should("be.visible");
    cy.get("#position").should("be.visible");
    cy.get("#permissions").find("input[type='checkbox']")
      .its("length").should("be.greaterThan", 0);
  })

  it("Prikazuje adekvatnu grešku za neispravna polja", () => {
    cy.get("#email").type("peraperic");
    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "Email", { matchCase: false }).should("be.visible");
    cy.get("#email").clear().type("peraperic@gmail.com");

    cy.get("#phone").type("123456789");
    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "Telefon", { matchCase: false }).should("be.visible");
    cy.get("#phone").clear().type("0641234567");

    cy.get("#citizenId").type("123456789");
    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "JMBG", { matchCase: false }).should("be.visible");
    cy.get("#citizenId").clear().type("1234567890123");

    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "Ime", { matchCase: false }).should("be.visible");
    cy.get("#firstName").type("Pera");

    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "Prezime", { matchCase: false }).should("be.visible");
    cy.get("#lastName").type("Peric");

    cy.get("button#addUser").click();
    cy.get(".error").should("contain", "Pozicija", { matchCase: false }).should("be.visible");
  })

  it("Dodaje korisnika u tabelu nakon uspešnog dodavanja", () => {
    cy.get("#email").clear().type("peraperic@gmail.com");
    cy.get("#phone").clear().type("0641234567");
    cy.get("#citizenId").clear().type("1234567890123");
    cy.get("#firstName").type("Pera");
    cy.get("#lastName").type("Peric");
    cy.get("#position").select("ADMINISTRATOR");
    cy.get("button#addUser").click();
    cy.url().should("contain", "/users");
    cy.get("table").contains("td", "peraperic@gmail.com");
  })
})
