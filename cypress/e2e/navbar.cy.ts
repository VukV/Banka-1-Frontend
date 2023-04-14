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

    // Visit the homepage before each test case
    cy.visit('/http://localhost:4200');
  });

  it('Navigates to Berza', () => {

    cy.get('Berza').click();

    cy.url().should('include', '/');
  });

  it('Navigates to Kapital', () => {
    cy.get('Kapital').click();

    cy.url().should('include', '/capital');
  });

  it('Navigates to Porudžbine', () => {
    cy.get('Porudžbine').click();

    cy.url().should('include', '/orders');
  });

  it('Navigates to Kompanije', () => {
    cy.get('Kompanije').click();

    cy.url().should('include', '/companies');
  });

  it('Navigates to Ugovori', () => {
    cy.get('Ugovori').click();

    cy.url().should('include', '/contracts');
  });

  it('Navigates to Korisnici', () => {
    cy.get('Korisnici').click();

    cy.url().should('include', '/users');
  });


});


describe('Profilna slika navigacija', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigiraj do my-profile stranice', () => {
    cy.get('assets/dollar-icon.svg').click();
    cy.url().should('include', '/my-profile');
  });
});

/*

            cy.contains('assets/dollar-icon.svg').click()
            cy.get('[data-cy="buy"]').find('assets/dollar-icon.svg').should('eq', '/my-profile')
            cy.go('back')

          });
        })


 */

describe('Logout', () => {
  beforeEach(() => {
    cy.login()
  })

  it('is redirected to the login page on log out', () => {
    cy.get('[data-cy="logout"]')
      .click()
    cy.url()
      .should('be.equal', '/login')
    Cypress.session.clearCurrentSessionData()
    cy.clearCookie('jwt')

  })
})

// Korisnik se redirektuje na login page ako nije prijavljen i nema pravo pristupa drugim rutama
describe('Kontrola pristupa', () => {
  it('Redirekt na login stranu kada nismo logovani ', () => {

    cy.clearCookies();
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







