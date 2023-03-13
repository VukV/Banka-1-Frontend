describe('Stranica korisnika', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="users"]').click();
    cy.url().should('include', 'users');
  })

  it('Inicijalno dohvatanje korisnika', () => {
    cy.get('td');
  })

  it('Pretrazuje korisnike po imenu', () => {
    cy.get('#ime').type("1");
    cy.get('#dugme').click();
    cy.get('table').contains('td', '1');
  })

  it('Pretrazuje korisnike po mejlu', () => {
    cy.get('#email').type("admin");
    cy.get('#dugme').click();
    cy.contains('admin')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(2).contains('admin')
      })
  })
})
