const container = 'div.container';

const username = 'input[formcontrolname="username"]';
const email = 'input[formcontrolname="email"]';
const password = 'input[formcontrolname="password"]';
const password2 = 'input[formcontrolname="password2"]';

const cancelBtn = 'button:contains("Cancel")';
const submitBtn = 'button:contains("Shall we?")';

const messages = {
  required: 'This field is required.',
  minLength2: 'Minimum length of 2 characters.',
  maxLength20: 'Maximum length of 20 characters.',
  email: 'Please enter a valid email.',
  minLength8: 'Minimum length of 8 characters.',
  lowercase: 'Password must have at least 1 lowercase letter.',
  uppercase: 'Password must have at least 1 uppercase letter.',
  number: 'Password must have at least 1 number.',
  special: 'Password must have at least 1 special character.',
  matching: 'Passwords do not match.'
};

const interceptSignup = () => {
  cy.intercept('POST', '/signup', { fixture: 'signup.json' });
  cy.intercept('POST', '/auth/login', { fixture: 'login.txt' });
  cy.intercept('GET', '/movies', []);
};

// Custom Cypress Commands
const { typeValue, assertMatError } = cy;

context('the signup page', () => {
  before(() => {
    cy.visit('/signup');
  });

  it('should display', () => {
    cy.contains(`It'll just take a sec.`);
  });

  it('should have four inputs and two buttons', () => {
    cy.get(container).within(() => {
      cy.get(username).should('be.visible');
      cy.get(email).should('be.visible');
      cy.get(password).should('be.visible');
      cy.get(password2).should('be.visible');

      cy.get(cancelBtn).should('be.enabled');
      cy.get(submitBtn).should('be.disabled');
    });
  });

  describe('form validation', () => {
    it('should validate username', () => {
      cy.get(container).within(() => {
        cy.get(submitBtn).should('be.disabled');
        cy.get(username).focus().blur();
        assertMatError(messages.required);
        typeValue(username, 't');
        assertMatError(messages.minLength2);
        typeValue(username, '123456789123456789123456789');
        assertMatError(messages.maxLength20);
        typeValue(username, 'turkeylover');
        cy.get('mat-error').should('not.exist');
      });
    });

    it('should validate email', () => {
      cy.get(container).within(() => {
        cy.get(submitBtn).should('be.disabled');
        cy.get(email).focus().blur();
        assertMatError(messages.required);
        typeValue(email, 'notanemail');
        assertMatError(messages.email);
        typeValue(email, 'bobsburgers@hotmail.com');
        cy.get('mat-error').should('not.exist');
      });
    });

    it('should validate password', () => {
      cy.get(container).within(() => {
        cy.get(submitBtn).should('be.disabled');
        cy.get(password).focus().blur();
        assertMatError(messages.required);
        typeValue(password, '1');
        assertMatError(messages.minLength8);
        typeValue(password, '12345678');
        assertMatError(messages.lowercase);
        typeValue(password, 'abcd1234');
        assertMatError(messages.uppercase);
        typeValue(password, 'Abcdefgh');
        assertMatError(messages.number);
        typeValue(password, 'Abcd1234');
        assertMatError(messages.special);
        typeValue(password, 'Abc1234!');
        cy.get('mat-error').should('not.exist');
      });
    });

    it('should validate password2', () => {
      cy.get(container).within(() => {
        cy.get(submitBtn).should('be.disabled');
        cy.get(password2).focus().blur();
        assertMatError(messages.required);
        typeValue(password2, 'not a match');
        assertMatError(messages.matching);
        typeValue(password2, 'Abc1234!');
        cy.get('mat-error').should('not.exist');
      });
      cy.get(submitBtn).should('be.enabled');
    });
  });

  describe('form submit', () => {
    it('should navigate to home on submit', () => {
      interceptSignup();

      cy.get(container).within(() => {
        typeValue(username, 'turkeylover');
        typeValue(email, 'bobsburgers@hotmail.com');
        typeValue(password, 'N0HumanM3@t');
        typeValue(password2, 'N0HumanM3@t');

        cy.get(submitBtn).click();
        cy.url().should('include', '/home');
      });

      cy.fixture('login.txt').then(data => {
        expect(localStorage.getItem('token')).to.eq(data);
      });
    });
  });
});
