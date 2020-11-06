before(() => {
  cy.visit('/');
});

describe('the home page', () => {
  it('should display', () => {
    cy.contains('welcome home');
  });
});
