describe('Testiranje stocks', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/stock-market');
    cy.get('table').contains('td', 'AAPL').click({force: true});
    cy.get('[data-cy="buy"]').click({force: true});
    cy.visit('/trades-stocks/AAPL');
  });
  it('Neuspešna kupovina bez polja za kolicinu', () => {

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/trades-stocks');
  });
  it('Uspešna kupovina sa svim popunjenim poljima', () => {
    cy.get('[data-cy="quantity"]').type('10');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit i stop vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez stop vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="limit"]').type('1100');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit i stop vrednosti', () => {
    cy.get('[data-cy="quantity"]').type('5');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit vrednosti', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez stop vrednosti', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="limit"]').type('1100');

    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna kupovina bez čekboksova', () => {
    cy.get('[data-cy="quantity"]').type('3');
    cy.get('[data-cy="btnBuy"]').click({force: true});
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez all or none čekboksa', () => {
    cy.get('[data-cy="quantity"]').type('3');
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');


    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });

  it('Forma ne dozvoljava unose koji nisu brojčani', () => {
    cy.get('[data-cy="quantity"]').type('abc');

    cy.get('[data-cy="btnBuy"]').check({force: true});
    cy.get('[data-cy="limit"]').type('ghi');
    cy.get('[data-cy="stop"]').type('jkl');

    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.url().should('include', '/trades-stocks');
  });
});
describe('Testiranje prodaje', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/stock-market');
    cy.get('table').contains('td', 'AAPL').click({force: true});
    cy.get('[data-cy="buy"]').click({force: true});
    cy.visit('/trades-stocks/AAPL');
  });
  it('Neuspešna kupovina bez polja za kolicinu', () => {
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/trades-stocks');
  });
  it('Uspešna prodaja sa svim popunjenim poljima', () => {
    cy.get('[data-cy="quantity"]').type('10');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit i stop vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez limit vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna prodaja bez stop vrednosti sa čekboksom all or none', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="limit"]').type('1100');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });

  it('Uspešna prodaja bez limit vrednosti', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });

  it('Uspešna prodaja bez čekboksova', () => {
    cy.get('[data-cy="quantity"]').type('3');
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSell"]').click({force: true});
    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });


  it('Forma ne dozvoljava unose koji nisu brojčani', () => {
    cy.get('[data-cy="quantity"]').type('abc');
    cy.get('[data-cy="btnSell"]').check({force: true});
    cy.get('[data-cy="limit"]').type('ghi');
    cy.get('[data-cy="stop"]').type('jkl');

    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.url().should('include', '/trades-stocks');
  });
});
describe('Testiranje forex', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/stock-market');
    cy.get('[data-cy="forex"]').click({force: true});
    cy.get('table').contains('td', 'EUR').click({force: true});
    cy.get('[data-cy="buy"]').click({force: true});
    cy.visit('/trades-forex/EUR/USD');
  });
  it('Neuspešna kupovina bez polja za kolicinu', () => {
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/trades-forex');
  });
  it('Uspešna kupovina sa svim popunjenim poljima', () => {
    cy.get('[data-cy="quantity"]').type('10');
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna kupovina bez limit i stop vrednosti sa čekboksom', () => {
    cy.get('[data-cy="quantity"]').type('5');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna kupovina bez limit vrednosti sa čekboksom', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();

    cy.url().should('include', '/trades-forex');
  });
  it('Uspešna kupovina bez stop vrednosti sa čekboksom', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="limit"]').type('1100');

    cy.get('[data-cy="btnAllOrNone"]').check();
    cy.get('[data-cy="btnSubmit"]').click();

    cy.url().should('include', '/trades-forex');
  });
  it('Uspešna kupovina bez čekboksova', () => {
    cy.get('[data-cy="quantity"]').type('3');
    cy.get('[data-cy="limit"]').type('1100');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna kupovina bez limit i stop vrednosti bez čekboksa', () => {
    cy.get('[data-cy="quantity"]').type('5');

    cy.get('[data-cy="btnSubmit"]').click();
    cy.get('[data-cy="btnConfirmPopUp"]').click({force: true});

    cy.url().should('include', '/orders');
  });
  it('Uspešna kupovina bez limit vrednosti bez čekboksa', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="stop"]').type('900');

    cy.get('[data-cy="btnSubmit"]').click();

    cy.url().should('include', '/trades-forex');
  });
  it('Uspešna kupovina bez stop vrednosti bez čekboksa', () => {
    cy.get('[data-cy="quantity"]').type('5');
    cy.get('[data-cy="limit"]').type('1100');

    cy.get('[data-cy="btnSubmit"]').click();

    cy.url().should('include', '/trades-forex');
  });
  it('Forma ne dozvoljava unose koji nisu brojčani', () => {
    cy.get('[data-cy="quantity"]').type('abc');
    cy.get('[data-cy="limit"]').type('ghi');
    cy.get('[data-cy="stop"]').type('jkl');

    cy.get('[data-cy="btnSubmit"]').click({force: true});
    cy.url().should('include', '/trades-forex');
  });
});
