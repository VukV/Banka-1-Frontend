/*
        describe('Navigacija', () => {
          it('Da li nas link dobro redirektuje', () => {
            cy.visit('/http://localhost:4200')

            cy.contains('Berza').click()
            cy.location('pathname').should('eq', '/')
            cy.go('back')

            cy.contains('Kapital').click()
            cy.location('pathname').should('eq', '/capital')
            cy.go('back')

            cy.contains('Porudžbine').click()
            cy.location('pathname').should('eq', '/orders')
            cy.go('back')

            cy.contains('Kompanije').click()
            cy.location('pathname').should('eq', '/campanies')
            cy.go('back')

            cy.contains('Ugovori').click()
            cy.location('pathname').should('eq', '/contracts')
            cy.go('back')


            cy.contains('Korisnici').click()
            cy.location('pathname').should('eq', '/users')
            cy.go('back')


 */

describe('Navigacija linkovi', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Navigates to Berza', () => {
    cy.get('[data-cy="stock-market"]').click();
    cy.url().should('contain', '/stock-market');
  });

  it('Navigates to Kapital', () => {
    cy.get('[data-cy="capital"]').click();
    cy.url().should('contain', '/capital');
  });

  it('Navigates to Porudžbine', () => {
    cy.get('[data-cy="orders"]').click();
    cy.url().should('contain', '/orders');
  });

  it('Navigates to Kompanije', () => {
    cy.get('[data-cy="companies"]').click();
    cy.url().should('contain', '/companies');
  });

  it('Navigates to Ugovori', () => {
    cy.get('[data-cy="contracts"]').click();
    cy.url().should('contain', '/contracts');
  });

  it('Navigates to Korisnici', () => {
    cy.get('[data-cy="users"]').click();
    cy.url().should('contain', '/users');
  });

});


describe('Profilna slika navigacija', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Navigiraj do my-profile stranice', () => {
    cy.get('[data-cy="my-profile"]').click();
    cy.url().should('contain', '/my-profile');
  });
});


describe('Logout', () => {
  beforeEach(() => {
    cy.login()
  })

  it('is redirected to the login page on log out', () => {
    cy.get('[data-cy="logout"]').click()
    cy.url().should('contain', '/login')
  })
})

// Korisnik se redirektuje na login page ako nije prijavljen i nema pravo pristupa drugim rutama
describe('Kontrola pristupa', () => {
  it('Redirekt na login stranu kada nismo logovani ', () => {

    cy.visit('/capital');
    cy.url().should('include', '/login');

    cy.visit('/orders');
    cy.url().should('include', '/login');

    cy.visit('/companies');
    cy.url().should('include', '/login');


    cy.visit('/contracts');
    cy.url().should('include', '/login');

    cy.visit('/users');
    cy.url().should('include', '/login');
  });
});







