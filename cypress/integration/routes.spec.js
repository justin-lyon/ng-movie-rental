context('the router', () => {
  const { logout } = cy;
  describe('the public routes', () => {
    beforeEach(() => {
      logout();
    });

    it('should route from forward slash to /home', () => {
      cy.visit('/');
      cy.url().should('include', '/home');
    });

    it('should route from unmatched route to /home', () => {
      cy.visit('/this-is-not-a-real-route/and/never-will-be');
      cy.url().should('include', '/home');
    });

    it('should route to /login', () => {
      cy.visit('/login');
      cy.url().should('include', '/login');
    });

    it('should route to /signup', () => {
      cy.visit('/signup');
      cy.url().should('include', '/signup');
    });
  });

  describe('the protected routes', () => {
    it('should re-route /account to /login if not logged in', () => {
      logout();
      cy.visit('/account');
      cy.url().should('include', '/login');
    });

    it('should re-route /settings to /login if not logged in', () => {
      logout();
      cy.visit('/settings');
      cy.url().should('include', '/login');
    });

    it('should route to /account', () => {
      cy.visit('/account');
      cy.url().should('include', '/account');
    });

    it('should route to /settings', () => {
      cy.visit('/settings');
      cy.url().should('include', '/settings');
    });
  });
});
