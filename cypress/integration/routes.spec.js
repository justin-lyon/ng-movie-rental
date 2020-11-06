describe('the router', () => {
  it('should route from forward slash to /home', () => {
    cy.visit('/');
    cy.url().should('eq', 'http://localhost:4200/home');
  });

  it('should route from unmatched route to /home', () => {
    cy.visit('/this-is-not-a-real-route/and/never-will-be');
    cy.url().should('eq', 'http://localhost:4200/home');
  });
});
