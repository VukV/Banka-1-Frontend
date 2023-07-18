import {timeout} from "rxjs";

describe('Transfer na racun', () => {
  beforeEach(() => {
    cy.loginClient();
  })

  it('Vrsi transfer', () => {
    cy.get('[data-cy="orders"]').click();
    cy.get('[data-cy="transfers-link"]').should("be.visible");
    cy.get('[data-cy="transfers-link"]').click();
    cy.url().should('contain', '/transfer');

    cy.get('[data-cy="dropdownSenderMenuButton"]').click();
    cy.get('.link-sender').first().click();

    cy.get('[data-cy="dropdownReceiverMenuButton"]').click();
    cy.get('.link-receiver').eq(1).click();

    cy.get('[data-cy="amount"]').type('100');
    cy.get('[data-cy="continueTransfer"]').click();

    cy.get('[data-cy="potvrdiTransfer"]').click();

    cy.wait(500);
    cy.get('[data-cy="potvrdiTransfer"]').should('not.be.visible');
  })

})
