/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
const user = {
  username: 'TestUser',
  password: 'TestUser',
  email: 'Test.User@mail.fi',
  title: 'admin',
  fname: 'Tester',
  lname: 'Useful',
  school: 'Tuni',
};
describe('Create account', () => {
  it('should not create new user account with same username', () => {
    cy.visit('/');
    cy.get('[data-cy=insteadButton]').click();
    cy.get('h1').should('contain', 'Signup');
    cy.get('[data-cy=usernameInput]').clear().type('Alfa');
    cy.get('[data-cy=passwordInput]').clear().type('Alfa');
    cy.get('[data-cy=repeatpasswordInput]').clear().type('Alfa');
    cy.get('[data-cy=submitButton]').click();
    cy.get('[data-cy=errorP]').should('contain', 'Error');
    cy.get('[data-cy=insteadButton]').click();
  });
});
describe('Login user', () => {
  it('should login user', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Login');
    cy.get('[data-cy=usernameInput]').clear().type(user.username);
    cy.get('[data-cy=passwordInput]').clear().type(user.password);
    cy.get('[data-cy=submitButton]').click();
    cy.get('[data-cy=topNavP]').should('contain', 'My Profile');
    cy.get('[data-cy=usernameP]').should('contain', user.username);
  });
});
describe('Edit account details', () => {
  it('should edit user details', () => {
    // change name
    cy.get('[data-cy=penIconfname]').click();
    cy.get('[data-cy=fname]').clear().type('Aatami');
    cy.get('[data-cy=penIconfname]').click();
    cy.get('[data-cy=fname]').should('have.value', 'Aatami');
    cy.get('.fadeOut').should('contain', 'Data updated');
    // revert change
    cy.get('[data-cy=penIconfname]').click();
    cy.get('[data-cy=fname]').clear().type(user.fname);
    cy.get('[data-cy=penIconfname]').click();
    cy.get('[data-cy=fname]').should('have.value', user.fname);
  });
});

describe('Edit user skills', () => {
  it('should edit user details', () => {
    cy.get('[data-cy=myskillsH3]').should('contain', 'My skills');
    // add skill
    cy.get('[data-cy=skillInputField]').clear().type('PowerPoint');
    cy.get('[data-cy=addskillButton]').click();
    cy.get('[alt="PowerPoint"]');
  });
});

describe('Edit login details', () => {
  it('should edit user login details', () => {
    cy.get('#settings_link').click();
    cy.get('[data-cy=topNavP]').should('contain', 'Settings');
  });
});

describe('Projects', () => {
  it('should add and remove project', () => {
    cy.get('#projects_link').click();
    cy.get('[data-cy=topNavP]').should('contain', 'Projects');

    cy.get('[data-cy=newProjectInput]').clear().type('Test project name');
    cy.get('[data-cy=addNewPorjectButton]').click();
    cy.get('label').contains('Test project name').click();
  });
});
describe('Search', () => {
  it('Search for project, user and skill', () => {
    cy.get('#search_link').click();
    cy.get('[data-cy=topNavP]').should('contain', 'Search');
    // project
    cy.get('#projects').click();
    cy.get('#searchField').clear().type('Test project name');
    cy.get('#searchButton').click();
    cy.get('.searchResTable').contains('Test project name');
    // user
    cy.get('#users').click();
    cy.get('#searchField').clear().type(user.username);
    cy.get('#searchButton').click();
    cy.get('.searchResTable').contains(user.username);
    //skill
    cy.get('#skills').click();
    cy.get('#searchField').clear().type('PowerPoint');
    cy.get('#searchButton').click();
    cy.get('.searchResTable').contains('PowerPoint');
    cy.get('.searchResTable').contains(user.username);
  });
});
describe('Remove user skill', () => {
  it('should edit user details', () => {
    cy.get('[data-cy=avatarLink]').click({ force: true });
    // remove added skill
    cy.get('[data-cy=delete-PowerPoint-button]').click();
    cy.get('[alt="PowerPoint"]').should('not.exist');
  });
});
describe('Delete projects', () => {
  it('should add and remove project', () => {
    cy.get('#projects_link').click();
    cy.get('[data-cy=topNavP]').should('contain', 'Projects');

    cy.get('label').contains('Test project name').click();
    cy.get('.case').find('.delProject').click({ multiple: true });
    cy.get('[data-cy=deleteProject]').click({ multiple: true });
  });
});

describe('Logout user', () => {
  it('should logout user', () => {
    cy.get('#profile_link').click();
    cy.get('#logOutButton').should('contain', 'Logout').click();
    cy.get('h1').should('contain', 'Login');
  });
});
