describe('Navigacija linkovi', () => {
  beforeEach(() => {
    cy.loginClient();
    cy.visit('/');
  });

  it('Nastavi na pocetnu', () => {
    cy.get('[data-cy="continue-home"]').click({force: true});
    cy.url().should('contain', '/home-page');
  });

  it('Navigacija na pocetnu', () => {
    cy.get('[data-cy="homepage-link"]').click();
    cy.url().should('contain', '/home-page');
  });

  it('Navigacija na racune', () => {
    cy.get('[data-cy="accounts-link"]').click();
    cy.url().should('contain', '/accounts');
  });

  it('Navigacija na nova placanja', () => {
    cy.get('[data-cy="orders"]').click();
    cy.get('[data-cy="orders-new-link"]').should("be.visible");
    cy.get('[data-cy="orders-new-link"]').click();
    cy.url().should('contain', '/new-payment');
  });

  it('Navigacija na prenos', () => {
    cy.get('[data-cy="orders"]').click();
    cy.get('[data-cy="transfers-link"]').should("be.visible");
    cy.get('[data-cy="transfers-link"]').click();
    cy.url().should('contain', '/transfer');
  });
});


describe('Logout', () => {
  beforeEach(() => {
    cy.loginClient()
  })

  it('Redirektuje na login prilikom logout-a', () => {
    cy.get('[data-cy="logout"]').click()
    cy.url().should('contain', '/login')
  })
})

// Korisnik se redirektuje na login page ako nije prijavljen i nema pravo pristupa drugim rutama
describe('Kontrola pristupa', () => {
  it('Redirekt na login stranu kada nismo logovani ', () => {

    cy.visit('/transfer');
    cy.url().should('include', '/login');

    cy.visit('/accounts');
    cy.url().should('include', '/login');

    cy.visit('/natural-persons');
    cy.url().should('include', '/login');
  });
});







