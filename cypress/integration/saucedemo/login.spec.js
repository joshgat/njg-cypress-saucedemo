/// <reference types="Cypress" />
import { LoginPage } from '../../support/pages/LoginPage';
import { ProductPage } from '../../support/pages/ProductPage';

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  })

describe('Check Login Functionality', () => {
    it('Verify user is able to login with valid credentials then log out', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.getUsername().type(userData.validUser.userName);
          LoginPage.getPassword().type(userData.validUser.password);
          LoginPage.getLoginBtn().click();
          ProductPage.getPageTitle().should('have.text','Products');
          ProductPage.getBurgerMenu().click();
          ProductPage.getLogoutLink().click();
          LoginPage.getLoginBtn().should('be.visible');
        })
    })

    it('Verify user is not able login with invalid password', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.getUsername().type(userData.invalidPasswordUser.userName);
          LoginPage.getPassword().type(userData.invalidPasswordUser.password);
          LoginPage.getLoginBtn().click();
          LoginPage.getErrorMesage().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })
    })
    
    it('Verify locked out user is not able login', () => {
        cy.fixture('users').then((userData) => {
          LoginPage.getUsername().type(userData.lockedOutUser.userName);
          LoginPage.getPassword().type(userData.lockedOutUser.password);
          LoginPage.getLoginBtn().click();
          LoginPage.getErrorMesage().should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
        })
    })

})