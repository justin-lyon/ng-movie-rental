context('login page', () => {
  const { logout, typeValue, assertMatError } = cy;
  const container = 'div.container';
  const email = 'input[formcontrolname="email"]';
  const password = 'input[type="password"][formcontrolname="password"]';
  const cancelBtn = 'button:contains("Cancel")';
  const loginBtn = 'button:contains("Login")';

  beforeEach(() => {
    logout();
    cy.visit('/login');
  });

  describe('the form', () => {
    it('should have two fields and two buttons', () => {
      cy.get(container).within(() => {
        cy.get(email).should('exist');
        cy.get(password).should('exist');
        cy.get(cancelBtn).should('be.enabled');
        cy.get(loginBtn).should('be.disabled');
      });
    });

    it('should validate the form', () => {
      cy.get(container).within(() => {
        cy.get(loginBtn).should('be.disabled');
        cy.get(email).focus().blur();
        assertMatError('This field is required.');

        typeValue(email, 'not-an-email');
        assertMatError('Please enter a valid email address.');

        typeValue(email, 'burgerbob@burgerfans.net');
        cy.get('mat-error').should('not.exist');

        cy.get(loginBtn).should('be.disabled');
        cy.get(password).focus().blur();
        assertMatError('This field is required.');

        typeValue(password, 'any thing at all');
        cy.get('mat-error').should('not.exist');

        cy.get(loginBtn).should('be.enabled');
      });
    });
  });

  describe('submit async validation failure', () => {
    beforeEach(() => {
      cy.intercept('POST', 'auth/login', { statusCode: 403 }).as('login');
    });

    it('should report invalid username or password on error', () => {
      cy.get(container).within(() => {
        typeValue(email, 'burgerbob@burgerfans.net');
        typeValue(password, 'noHumanMe@t123');
        cy.get(loginBtn).click();

        cy.wait('@login').then(({ response }) => {
          expect(response.statusCode).to.eq(403);
        });

        assertMatError('Invalid username or password.');
      });
    });
  });

  describe('submit async validation success', () => {
    beforeEach(() => {
      cy.intercept('POST', 'auth/login', { fixture: 'login.txt' }).as('login');
    });

    it('should navigate to /home on success', () => {
      typeValue(email, 'burgerbob@burgerfans.net');
      typeValue(password, 'noHumanMe@t123');
      cy.get(loginBtn).click();

      cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(localStorage.getItem('token')).to.eq(response.body);
      });

      cy.url().should('include', '/home');
    });
  });
});
