describe("Testira stock-market stranicu.", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  })

  it('Proverava da li je tabela akcija prazna (default case).', () => {
    cy.visit("/stock-market")
    cy.get('[data-cy="stocks-table"] .clickable-tr').should("exist");

  });

  it('Proverava da li je tabela forex prazna.', () => {
    cy.visit("/stock-market")
    cy.get('[data-cy="forex"]').click({force: true})
    cy.get('[data-cy="forex-table"] tbody').should('have.length.greaterThan', 0);
  });

  it('Proverava da li je tabela akcija prazna.', () => {
    cy.visit("/stock-market")
    cy.get('[data-cy="forex"]', {timeout: 10000}).click({force: true})//.wait(1000)
    cy.get('[data-cy="akcije"]').click({force: true})
    cy.get('[data-cy="stocks-table"]').should('exist')
    //cy.wait(3000) //Wait for the table to load
    cy.get('[data-cy="stocks-table"] .clickable-tr', {timeout: 10000}).should("exist");
  });


  it('Proverava da klik na stocks button otvara stranicu stock-market', () => {
    cy.visit("/stock-market")// kliknite na dugme koje prikazuje stocks-main komponentu
    cy.url().should('include', '/stock-market');
    cy.get('[data-cy="akcije"]').should('exist')
    cy.get('[data-cy="forex"]').should('exist')
  });

  it('Proverava da klik na Forex button otvara stranicu za Forex', () => {
    cy.visit("/stock-market")// kliknite na dugme koje prikazuje stocks-main komponentu
    cy.get('[data-cy="forex"]').click({force: true}) // kliknite na dugme koje prikazuje Forex stranicu unutar stocks-main komponente
    cy.get('[data-cy="stock-main"]').should('exist'); // proverite da li postoji komponenta stocks-main
    cy.get('[data-cy="forex-page"]').should('exist'); // proverite da li postoji stranica za Forex unutar stocks-main komponente
  });

  it('Da li se dobija željeni rezultat pretragom akcija', () => {
    cy.visit('/stock-market')
    cy.get('[data-cy="akcije"]').click({force: true})
    cy.get('[data-cy="symbol-input"]').type('AAPL')
    cy.get('[data-cy="symbol-search"]').click({force: true}).wait(10000);
    cy.get('[data-cy="stocks-table"]').contains('td', 'AAPL').should('exist')
  });

  it('Da li se dobija željeni rezultat pretragom forex-a', () => {
    cy.visit('/stock-market')
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('[data-cy="symbol-selling"]').type('USD')
    cy.get('[data-cy="symbol-buying"]').type('EUR')
    cy.get('[data-cy="forex-search"]').click();
    cy.get('[data-cy="forex-table"]').contains('td', 'EUR').should('exist')
  });
});
