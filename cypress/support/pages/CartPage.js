export let CartPage = {
    getBurgerMenu: () => cy.get('.bm-burger-button button'),
    getCartList: () => cy.get('.cart_list .cart_item'),
    getPageTitle: ()=> cy.get('.title'),
    removeFromCart:(product) => cy.get(`[data-test="remove-${product}"]`),
    getCheckoutBtn: ()=> cy.get('#checkout'),
    getContinueShopBtn: () => cy.get('#continue-shopping')
  };