// https://docs.cypress.io/api/introduction/api.html

describe('Application', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Negotiation Application');
  });
  it('must have two tabs', () => {
    cy.visit('/');
    cy.get('.v-tab').should('have.length', 2);
  });
  it('should have salary input not visible when submit', () => {
    cy.visit('/');
    cy.get('#input-21').type('100');
    cy.get('.v-btn').click();
    cy.get('#input-21').should('not.visible');
  });
  it('should change tab when click tab-item', () => {
    cy.visit('/');
    cy.get('[href="#employee"]').click();
    cy.get('#employee > .v-form').should('be.visible');
  });
  it('should display result when the two form are submitted', () => {
    cy.visit('/');
    cy.get('#input-21').type('100');
    cy.get('#employer > .v-form > .v-btn').click();
    cy.get('[href="#employee"]').click();
    cy.get('#input-27').type('80');
    cy.get('#employee > .v-form > .v-btn').click();
    cy.get('.v-dialog').should('be.visible');
  });
});
