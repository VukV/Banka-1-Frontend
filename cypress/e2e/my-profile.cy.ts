describe('Stranica moj profil', () => {
   beforeEach(() => {
     cy.login();
     cy.get('[data-cy="my-profile"]').click();
     cy.url().should('include', 'my-profile');
   })

  it('Prikazuje gresku za los telefon', () => {
    cy.get('[data-cy="phone"]').clear();
    cy.get('[data-cy="phone"]').type('Zdravo!');
    cy.get('[data-cy="promeni"]').click();
    cy.get('[data-cy="error"]').should('be.visible');
  })

  it('Menja broj telefona', () => {
    cy.get('[data-cy="phone"]').clear();
    cy.get('[data-cy="phone"]').type('062111111');
    cy.get('[data-cy="promeni"]').click();
    cy.get(".modal-body").should("be.visible");
    cy.get(".modal-body button").click();
    cy.get('[data-cy="phone"]').should('have.value', '062111111');
  })

  it('Prikazuje gresku za prazno ime', () => {
    cy.get('[data-cy="firstName"]').clear();
    cy.get('[data-cy="promeni"]').click();
    cy.get('[data-cy="error"]').should('be.visible');
  })

  it('Nedozvoljeni inputi su zakljucani', () => {
    cy.get('#jmbg').should('be.disabled');
    cy.get('#email').should('be.disabled');
    cy.get('#position').should('be.disabled');
  })

  it('Izmena svih dostupnih polja', () => {
    cy.get('[data-cy="firstName"]').clear();
    cy.get('[data-cy="firstName"]').type('Laki');
    cy.get('[data-cy="lastName"]').clear();
    cy.get('[data-cy="lastName"]').type('Dejanovic');
    cy.get('[data-cy="phone"]').clear();
    cy.get('[data-cy="phone"]').type('062222222');

    cy.get('[data-cy="promeni"]').click();
    cy.get(".modal-body").should("be.visible");
    cy.get(".modal-body button").click();

    cy.get('[data-cy="firstName"]').should('have.value', 'Laki');
    cy.get('[data-cy="lastName"]').should('have.value', 'Dejanovic');
    cy.get('[data-cy="phone"]').should('have.value', '062222222');
  })
})
