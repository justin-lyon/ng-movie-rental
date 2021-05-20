import movie from '../../fixtures/mortal-kombat.json';

context('movie-detail', () => {
  before(() => {
    cy.login();
    cy.intercept('GET', '/movies/*', movie);
    cy.visit('/movie/1');
  });

  it('should display', () => {
    cy.url().should('include', '/movie/1');
  });

  describe('fields', () => {
    it('should display title', () => {
      cy.get('h1').contains(movie.title);
    });

    it('should display tagline', () => {
      cy.get('small').contains(movie.tagline);
    });

    it('should display genres', () => {
      const [action, fantasy, adventure] = movie.genres.map(g => g.name);
      cy.get('.genres').within(() => {
        cy.get('mat-chip').contains(action);
        cy.get('mat-chip').contains(fantasy);
        cy.get('mat-chip').contains(adventure);
      });
    });

    it('should display overview', () => {
      cy.get('.overview').contains(movie.overview);
    });

    it('should display release date', () => {
      cy.get('#releaseDate').contains('Apr 23, 2021');
    });

    it('should display duration', () => {
      cy.get('#runtime').contains(`${movie.runtime} min.`);
    });

    it('should display language', () => {
      cy.get('#originalLanguage').contains(movie.originalLanguage);
    });

    it('should display spoken languages', () => {
      const [japanese, english, chinese] = movie.spokenLanguages.map(
        l => l.name
      );
      cy.get('#spokenLanguages').contains(japanese);
      cy.get('#spokenLanguages').contains(english);
      cy.get('#spokenLanguages').contains(chinese);
    });

    it('should display budget', () => {
      const budget = '$20,000,000.00';
      cy.get('#budget').contains(budget);
    });

    it('should display revenue', () => {
      const revenue = '$76,706,000.00';
      cy.get('#revenue').contains(revenue);
    });

    it('should display popularity score', () => {
      cy.get('#popularity').contains(movie.popularity);
    });

    it('should display total votes', () => {
      cy.get('#voteCount').contains(movie.voteCount);
    });

    it('should display vote average', () => {
      cy.get('#voteAverage').contains(movie.voteAverage);
    });

    it('should display homepage', () => {
      cy.get('#homepage>a').should('have.attr', 'href', movie.homepage);
    });

    it('should display imbd link', () => {
      const imdbUrl = `https://www.imdb.com/title/${movie.imdbId}`;
      cy.get('#imdbLink>a').should('have.attr', 'href', imdbUrl);
    });
  });
});
