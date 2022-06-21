export let ProductPage = {
    getBurgerMenu: () => cy.get('.bm-burger-button button'),
    getLogoutLink: ()=> cy.get('#logout_sidebar_link'),
    getProducts: () => cy.get('.inventory_list .inventory_item'),
    getCartLink: () => cy.get('.shopping_cart_link'),
    getCartBadge: () => cy.get('#shopping_cart_container .shopping_cart_badge'),
    getPageTitle: ()=> cy.get('.title'),
    getActiveSort: ()=>  cy.get('.active_option'),
    sortByNameZA: ()=> cy.get('.product_sort_container').select('Name (A to Z)'),
    sortByNameZA: ()=> cy.get('.product_sort_container').select('Name (Z to A)'),
    sortByPriceLowHigh: ()=> cy.get('.product_sort_container').select('Price (low to high)'),
    sortByPriceHighLow: ()=> cy.get('.product_sort_container').select('Price (high to low)'),
    addToCart:(product) => cy.get(`[data-test="add-to-cart-${product}"]`),
    removeFromCart:(product) => cy.get(`[data-test="remove-${product}"]`),
  };

  