before(() => {
  cy.visit('/');
});

describe('the home page', () => {
  it('should display', () => {
    cy.contains('welcome home');
  });

  it('should have a sidebar and toolbar', () => {
    cy.get('mat-sidenav').should('not.be.visible');
    cy.get('mat-toolbar').contains('Movie Rental');
    cy.get('mat-icon').contains('menu').click();
    cy.get('mat-sidenav').should('be.visible');
    cy.get('mat-sidenav').contains('Menu');
    cy.get('mat-sidenav').contains('Home');
    cy.get('mat-sidenav').contains('My Account');
    cy.get('mat-sidenav').contains('Preferences');
  });
});
