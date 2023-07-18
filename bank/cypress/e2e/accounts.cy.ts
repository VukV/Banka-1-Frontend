describe('Kreiranje racuna', () => {
  beforeEach(() => {
    cy.loginEmployee();
  })

  it('Kreira tekuci racun', () => {
    cy.get('[data-cy="create-new-account"]').click();
    cy.get('[data-cy="select-account"]').select('CURRENT');

    cy.get('[data-cy="dalje-btn"]').click();

    cy.get('[data-cy="izaberi"]').click();
    cy.contains('Marko')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(2).click();
      })
    cy.get('[data-cy="naziv"]').type('TekuciM');

    cy.get('[data-cy="kreiraj"]').click();
    cy.url().should('contain', '/create-new-account');
  })

  it('Kreira devizni racun', () => {
    cy.get('[data-cy="create-new-account"]').click();
    cy.get('[data-cy="select-account"]').select('FOREIGN_CURRENCY');

    cy.get('[data-cy="dalje-btn"]').click();

    cy.get('[data-cy="izaberi"]').click();
    cy.contains('Marko')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(2).click();
      })
    cy.get('[data-cy="naziv"]').type('DevizniM');

    cy.get('[data-cy="secondCurr"]').select('EUR');
    cy.get('[data-cy="thirdCurr"]').select('USD');

    cy.get('[data-cy="kreiraj"]').click();
    cy.url().should('contain', '/create-new-account');
  })

})
