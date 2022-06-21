/// <reference types="Cypress" />
import { LoginPage } from '../../support/pages/LoginPage';
import { ProductPage } from '../../support/pages/ProductPage';
import { CartPage } from '../../support/pages/CartPage';
import { CheckoutPage } from '../../support/pages/CheckoutPage';

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

describe('Verify user is able to browse for products', () => {
  it('Verify Product Page Aesthetics and Actions', () => {
      cy.fixture('users').then((userData) => {
          LoginPage.getUsername().type(userData.validUser.userName);
          LoginPage.getPassword().type(userData.validUser.password);
          LoginPage.getLoginBtn().click();
        });
      ProductPage.getPageTitle().should('have.text','Products');
      ProductPage.getProducts().first().as('product');       
      cy.get('@product').find('.inventory_item_img').should('be.visible');
      cy.get('@product').find('.inventory_item_name').should('be.visible');
      cy.get('@product').find('.inventory_item_desc').should('be.visible');
      cy.get('@product').find('.inventory_item_price').should('be.visible');  
      ProductPage.getActiveSort().should('have.text', 'Name (A to Z)')
      let productsByName = [];
      ProductPage.getProducts().find('.inventory_item_name').each(($el) => {
        cy.wrap($el).invoke('text').as('itemName')
        cy.get('@itemName')
          .then((itemName) => {
              productsByName.push(itemName)
          });
      }); 
      ProductPage.sortByNameZA();
      ProductPage.getProducts().find('.inventory_item_name').each(($el, index) => {
          cy.wrap($el).should('have.text', productsByName[productsByName.length - index - 1])
      });

      let productsByPrice = [];
      ProductPage.sortByPriceLowHigh();
      ProductPage.getProducts().find('.inventory_item_price').each(($el) => {
          cy.wrap($el).invoke('text').as('itemPrice')
          cy.get('@itemPrice').then((itemPrice) => {
              productsByPrice.push(itemPrice)
          })
        })
      ProductPage.sortByPriceHighLow();
        ProductPage.getProducts().find('.inventory_item_price').each(($el, index) => {
          cy.wrap($el).should('have.text', productsByPrice[productsByPrice.length - index - 1])
      });

      ProductPage.getProducts().first().as('product');
      cy.get('@product').find('.btn_primary').click() 
      ProductPage.getCartBadge().should('have.text', '1')
      cy.get('@product').find('.btn_secondary').click() 
      ProductPage.getCartBadge().should('not.exist')
  });
});

describe('Verify user is able to add and remove items from cart', () => {
  it('Verify Cart Page Aesthetics and Actions', () => {
    cy.fixture('users').then((userData) => {
        LoginPage.getUsername().type(userData.validUser.userName);
        LoginPage.getPassword().type(userData.validUser.password);
        LoginPage.getLoginBtn().click();
    });

    cy.fixture('products').then((products) => {
      ProductPage.addToCart(products.product1.addToCartName).click();
      ProductPage.addToCart(products.product2.addToCartName).click();
      ProductPage.getCartBadge().should('have.text', '2')
      ProductPage.getCartLink().click();
      CartPage.getPageTitle().should('have.text','Your Cart');
      CartPage.getCartList().find('.inventory_item_name').each(($el, index, $list) => {
        cy.wrap($el).invoke('text').as('itemName')
        if (index == 0){
          cy.get('@itemName').should('contain', products.product1.productName)
        } else if (index == 1) {
          cy.get('@itemName').should('contain', products.product2.productName)
        }
      });  
      CartPage.removeFromCart(products.product1.addToCartName).click();
      CartPage.removeFromCart(products.product2.addToCartName).click();
      CartPage.getCartList().should('not.exist');
      CartPage.getContinueShopBtn().click();
      ProductPage.getPageTitle().should('have.text','Products');
    });
  });
});

describe('Verify user is able to checkout the products', () => {
  it('Verify Checkout Info Page Aesthetics and Actions', () => {
    cy.fixture('users').then((userData) => {
        LoginPage.getUsername().type(userData.validUser.userName);
        LoginPage.getPassword().type(userData.validUser.password);
        LoginPage.getLoginBtn().click();
        cy.fixture('products').then((products) => {
          ProductPage.addToCart(products.product1.addToCartName).click();
          ProductPage.addToCart(products.product2.addToCartName).click();
        });
        ProductPage.getCartLink().click(); 
        CartPage.getCheckoutBtn().click();
        CheckoutPage.getPageTitle().should('have.text', 'Checkout: Your Information')
        CheckoutPage.getCancelBtn().should('be.visible');
        CheckoutPage.getContinueBtn().click();
        CheckoutPage.getInfoErrorMsg().should('have.text','Error: First Name is required');
        CheckoutPage.getFirstName().type(userData.validUser.firstName)
        CheckoutPage.getContinueBtn().click();
        CheckoutPage.getInfoErrorMsg().should('have.text','Error: Last Name is required');
        CheckoutPage.getLastName().type(userData.validUser.lastName);
        CheckoutPage.getContinueBtn().click();
        CheckoutPage.getInfoErrorMsg().should('have.text','Error: Postal Code is required');
        CheckoutPage.getPostalCode().type(userData.validUser.postalCode);
        CheckoutPage.getCancelBtn().click();
        CartPage.getPageTitle().should('have.text', 'Your Cart')
    });
  });

  it('Verify Checkout Page Aesthetics and Actions', () => {
    cy.fixture('users').then((userData) => {
        LoginPage.getUsername().type(userData.validUser.userName);
        LoginPage.getPassword().type(userData.validUser.password);
        LoginPage.getLoginBtn().click();
        cy.fixture('products').then((products) => {
          ProductPage.addToCart(products.product1.addToCartName).click();
          ProductPage.addToCart(products.product2.addToCartName).click();
          ProductPage.getCartLink().click(); 
          CartPage.getCheckoutBtn().click();
          CheckoutPage.getFirstName().type(userData.validUser.firstName)
          CheckoutPage.getLastName().type(userData.validUser.lastName);
          CheckoutPage.getPostalCode().type(userData.validUser.postalCode);
          CheckoutPage.getContinueBtn().click();
          CheckoutPage.getPageTitle().should('have.text', 'Checkout: Overview');
          CheckoutPage.getCartList().find('.inventory_item_name').each(($el, index, $list) => {
            cy.wrap($el).as('itemName')
            if (index == 0){
              cy.get('@itemName').should('have.text', products.product1.productName)
            } else if (index == 1) {
              cy.get('@itemName').should('have.text', products.product2.productName)
            }
          }); 
          CheckoutPage.getPaymentInfo().should('have.text', userData.validUser.paymentMethod);
          CheckoutPage.getShippingInfo().should('have.text', userData.validUser.shippingInfo);
          CheckoutPage.getItemTotal().should('contain', products.orderInfo.itemTotal);
          CheckoutPage.getTax().should('contain', products.orderInfo.tax);
          CheckoutPage.getOrderTotal().should('contain', products.orderInfo.orderTotal);
          CheckoutPage.getCancelBtn().should('be.visible');
          CheckoutPage.getFinishBtn().click();
          CheckoutPage.getPageTitle().should('have.text', 'Checkout: Complete!');
          CheckoutPage.getCompleteHeader().should('have.text', 'THANK YOU FOR YOUR ORDER');
          CheckoutPage.getPonyImg().should('be.visible');
          CheckoutPage.getBackToHomeBtn().click();
          CartPage.getPageTitle().should('have.text', 'Products');
        });
    });
  });

});