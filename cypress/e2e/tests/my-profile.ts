import {Before, Then, When} from "cypress-cucumber-preprocessor/steps";

//Before se izvrsava pre svakog SCENARIJA
//Dakle, ne pre when/then metoda, vec pre svakog scenarija
//Odnosno, radi se login pre bilo kakve druge radnje
Before(function (){
  cy.login();
  cy.get('[data-cy="my-profile"]').click();
  cy.url().should('include', 'my-profile');
});

When('Unesem string u polje telefona', () => {
  cy.get('[data-cy="phone"]').clear();
  cy.get('[data-cy="phone"]').type('Zdravo!');
});

When('Kliknem na promeni', () => {
  cy.get('[data-cy="promeni"]').click();
});

Then('Treba da se prikaze greska', () => {
  cy.get('[data-cy="error"]').should('be.visible');
});

When('Unesem broj telefona', () => {
  cy.get('[data-cy="phone"]').clear();
  cy.get('[data-cy="phone"]').type('062111111');
});

Then('Treba da se prikaze popup i da se promeni broj', () => {
  cy.get(".modal-body").should("be.visible");
  cy.get(".modal-body button").click();
  cy.get('[data-cy="phone"]').should('have.value', '062111111');
});

When('Ostavim polje za ime prazno', () => {
  cy.get('[data-cy="firstName"]').clear();
});

Then('Nedozvoljena polja ne mogu da se kliknu', () => {
  cy.get('#jmbg').should('be.disabled');
  cy.get('#email').should('be.disabled');
  cy.get('#position').should('be.disabled');
});

When('Unesem ispravno ime', () => {
  cy.get('[data-cy="firstName"]').clear();
  cy.get('[data-cy="firstName"]').type('Laki');
});

When('Unesem ispravno prezime', () => {
  cy.get('[data-cy="lastName"]').clear();
  cy.get('[data-cy="lastName"]').type('Dejanovic');
});

When('Unesem ispravan telefon', () => {
  cy.get('[data-cy="phone"]').clear();
  cy.get('[data-cy="phone"]').type('062222222');
});

Then('Treba da se prikaze popup i promene vrednosti', () => {
  cy.get(".modal-body").should("be.visible");
  cy.get(".modal-body button").click();

  cy.get('[data-cy="firstName"]').should('have.value', 'Laki');
  cy.get('[data-cy="lastName"]').should('have.value', 'Dejanovic');
  cy.get('[data-cy="phone"]').should('have.value', '062222222');
});
