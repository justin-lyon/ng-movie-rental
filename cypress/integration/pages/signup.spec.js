before(() => {
  cy.visit('/signup');
});

describe('the signup page', () => {
  it('should display', () => {
    cy.contains(`It'll just take a sec.`);
  });

  it('should have a sidebar and toolbar', () => {
    cy.get('input[formcontrolname="username"]').should('be.visible');
    cy.get('input[formcontrolname="email"]').should('be.visible');
    cy.get('input[formcontrolname="password"]').should('be.visible');
    cy.get('input[formcontrolname="password2"]').should('be.visible');

    cy.get('button').contains('Cancel').should('be.enabled');
    cy.get('button').contains('Shall we?').should('be.disabled');
  });
});
