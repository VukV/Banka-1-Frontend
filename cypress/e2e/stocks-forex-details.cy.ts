describe("Stranica akcije", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="stock-market"]').click();
  })

    it('Ulazak u akcija-detalji i provera da li postoje polja', () =>{
      cy.get('table').contains('td', 'AAPL').click({force: true});
      cy.get('#stockDetails').within(() => {
        cy.contains('CHANGE:').siblings().should('not.be.empty');
        cy.contains('OPEN:').siblings().should('not.be.empty');
        cy.contains('CLOSE:').siblings().should('not.be.empty');
        cy.contains('LOW:').siblings().should('not.be.empty');
        cy.contains('HIGH:').siblings().should('not.be.empty');
        cy.contains('VOLUME:').siblings().should('not.be.empty');
      })
      cy.get('[data-cy="close"]').click({force: true});
    })

  it('Ulazak u forex-detalji i provera da li postoje polja', () =>{
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('table').contains('td', 'USD').click({force: true});
    cy.get('#stockDetails').should('exist')
    cy.get('#stockDetails p:contains("FROM:")')
      .siblings('p')
      .should('contain', 'Euro (EUR)')
    cy.get('#stockDetails p:contains("TO:")')
      .siblings('p')
      .should('contain', 'United States Dollar (USD)')
    cy.get('#stockDetails p:contains("EXCHANGE RATE:")')
      .should('exist')
    cy.get('#stockDetails p:contains("BID:")')
      .should('exist')
    cy.get('#stockDetails p:contains("ASK:")')
      .should('exist')
    cy.get('[data-cy="close"]').click({force: true});
  })

  it('klikce sve dugmice unutar forex-detalji', () => {
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('table').contains('td', 'USD').click({force: true});
    cy.btnClickStock()
    cy.get('[data-cy="close"]').click({force: true});
  });

  it('klikce sve dugmice unutar akcija-detalji', () => {
    cy.get('table').contains('td', 'AAPL').click({force: true});
    cy.btnClickStock()
    cy.get('[data-cy="close"]').click({force: true});
  });

  it('provera da se klikom na dugme nazad nalazimo na stranici /stock-market (akcije)', () => {
    cy.get('table').contains('td', 'AAPL').click({force: true});
    cy.get('[data-cy="close"]').click({force: true});
    cy.url().should('include', 'stock-market');
  });

  it('provera da se klikom na dugme nazad nalazimo na stranici /stock-market (forex)', () => {
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('table').contains('td', 'USD').click({force: true});
    cy.get('[data-cy="close"]').click({force: true});
    cy.url().should('include', 'stock-market');
  });

  it('provera da se klikom na kupi/prodaj nalazimo na stranici /trades-stocks/:symbol (akcije)', () => {
    cy.get('table').contains('td', 'AAPL').click({force: true});
    cy.get('[data-cy="buy"]').click({force: true});
    cy.url().should('include', '/trades-stocks/AAPL');
  });

  it('provera da se klikom na kupi/prodaj nalazimo na stranici /trades-forex/:fromC/:toC (forex)', () => {
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('table').contains('td', 'USD').click({force: true});
    cy.get('[data-cy="buy"]').click({force: true});
    cy.url().should('include', '/trades-forex/EUR/USD');
  });
})

