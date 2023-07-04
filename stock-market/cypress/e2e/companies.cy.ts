describe('Testiranje companies', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/companies');
  });
  it('Dodavanje kompanije', () => {

    cy.get('[data-cy="btnAddCompany"]').click({force: true});
    cy.get('[data-cy="naziv"]').type('Example Ltd.');
    cy.get('[data-cy="mbr"]').type('123456789');
    cy.get('[data-cy="pib"]').type('123456789');
    cy.get('[data-cy="sifra"]').type('1234');
    cy.get('[data-cy="adresa"]').type('Trg Republike V/5, Beograd, Srbija')
    cy.get('[data-cy="btnSubmit"]').click({force: true});

    cy.url().should('include', '/companies');
  });
  it('Prikaz poruke za neuspešno dodavanje kompanije. Bez matičnog broja', () => {

    cy.get('[data-cy="btnAddCompany"]').click({force: true});

    cy.get('[data-cy="naziv"]').type('Example Ltd.');
    cy.get('[data-cy="pib"]').type('123456789');
    cy.get('[data-cy="sifra"]').type('1234');
    cy.get('[data-cy="adresa"]').type('Trg Republike V/5, Beograd, Srbija')
    cy.get('[data-cy="btnSubmit"]').click({force: true});

    cy.url().should('include', '/companies');
  });
  it('Detaljan prikaz kompanije. Klik na kompaniju u tabeli', () => {

    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});
    cy.url().should('include', '/company-details/');
  });
  it('Izmena kompanije', () => {
    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});

    cy.get('[data-cy="naziv"]').clear().type('Example Ltd. 2');
    cy.get('[data-cy="sifDelatnosti"]').clear().type('2345');
    cy.get('[data-cy="adresa"]').clear().type('Trg Republike V/7, Beograd, Srbija');

    cy.get('[data-cy="btnAzuriraj"]').click({force: true});
    cy.url().should('include', '/companies');
  });
  it('Dodavanje računa', () => {
    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});

    cy.get('[data-cy="dodajRacun"]').click({force: true});

    cy.get('[data-cy="accountNumberAccount"]').type('asafgafa');
    cy.get('[data-cy="bankNameAccount"]').type('Bank of Serbia');
    cy.get('[data-cy="tipAccount"]').select('DINARSKI');

    cy.get('[data-cy="btnKreirajRacun"]').click({force: true});
    cy.url().should('include', '/company-details/');
  });
  it('Prikaz poruke za neuspešno dodavanje računa. Bez imena banke', () => {
    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});

    cy.get('[data-cy="dodajRacun"]').click({force: true});

    cy.get('[data-cy="accountNumberAccount"]').type('160-0000000-00');
    cy.get('[data-cy="tipAccount"]').select('DINARSKI');

    cy.get('[data-cy="btnKreirajRacun"]').click({force: true});
    cy.url().should('include', '/company-details/');
  });
  it('Dodavanje kontakta', () => {
    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});

    cy.get('[data-cy="dodajKontakt"]').click({force: true});

    cy.get('[data-cy="fullNameCompany"]').type('Pera Perić');
    cy.get('[data-cy="phoneNumberCompany"]').type('+381691000000');
    cy.get('[data-cy="emailCompany"]').type('osoba@raf.rs');
    cy.get('[data-cy="positionCompany"]').type('Šef prodaje');
    cy.get('[data-cy="noteCompany"]').type('Nemam komentara');

    cy.get('[data-cy="btnKreirajKontakt"]').click({force: true});
    cy.url().should('include', '/company-details/');
  });
  it('Prikaz poruke za neuspešno dodavanje kontakta. Bez broja telefona', () => {
    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});

    cy.get('[data-cy="dodajKontakt"]').click({force: true});

    cy.get('[data-cy="fullNameCompany"]').type('Pera Perić');
    cy.get('[data-cy="emailCompany"]').type('osoba@raf.rs');
    cy.get('[data-cy="positionCompany"]').type('Šef prodaje');
    cy.get('[data-cy="noteCompany"]').type('Nemam komentara');

    cy.get('[data-cy="btnKreirajKontakt"]').click({force: true});
    cy.url().should('include', '/company-details/');
  });
  it('Brisanje kompanije', () => {

    cy.get('[data-cy="tableCompany"]').find('[data-cy="clickTr"]').first().click({force: true});
    cy.get('[data-cy="btnDeleteCompany"]').click({force: true})

    cy.url().should('include', '/companies');
  });
});
