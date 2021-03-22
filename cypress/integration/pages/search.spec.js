context('search page', () => {
  before(() => {
    cy.intercept('**/movies', { fixture: 'movies-popular.json' });
    cy.login();
    cy.visit('/');
  });

  it('should start on the home page', () => {
    cy.url().should('include', '/home');
  });

  describe('search bar', () => {
    const searchInput = 'mat-toolbar input';

    beforeEach(() => {
      cy.intercept('**/movies?searchTerm=*', {
        fixture: 'movies-search-goonies.json'
      });
    });

    it('should search from navbar', () => {
      cy.typeValue(searchInput, 'goonies{enter}');
    });

    it('should land on search page with query param', () => {
      cy.url().should('include', '/search?term=goonies');
    });

    it('should display search results', () => {
      cy.get('small').contains('Goonies');
      cy.get('app-movie-card').should('exist');
    });
  });
});
