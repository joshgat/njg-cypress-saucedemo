/// <reference types="Cypress" />
import { LoginPage } from '../../support/pages/LoginPage';
import { CartPage } from '../../support/pages/CartPage';

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  })

describe('TS01: Login Test Suite', () => {
    it('TC01: Verify user can login with valid credentials', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.UserName().type(userData.validUser.userName);
          LoginPage.Password().type(userData.validUser.password);
          LoginPage.LoginButton().click();
          CartPage.PageTitle().should('have.text','Products');
        })
    })

    it('TC02: Verify user is not able login with invalid password', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.UserName().type(userData.invalidPasswordUser.userName);
          LoginPage.Password().type(userData.invalidPasswordUser.password);
          LoginPage.LoginButton().click();
          LoginPage.ErrorMessage().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })
    })
    it('TC03: Verify locked out user is not able login', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.UserName().type(userData.lockedOutUser.userName);
          LoginPage.Password().type(userData.lockedOutUser.password);
          LoginPage.LoginButton().click();
          LoginPage.ErrorMessage().should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
        })
    })

})