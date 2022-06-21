export let CheckoutPage = {
    getFirstName: ()=> cy.get('#first-name'),
    getLastName: ()=> cy.get('#last-name'),
    getPostalCode: ()=> cy.get('#postal-code'),
    getInfoErrorMsg: ()=> cy.get('[data-test="error"]'),
    getContinueBtn: ()=> cy.get('#continue'),
    getCancelBtn: ()=> cy.get('#cancel'),
    getCartList: ()=> cy.get('.cart_list .cart_item'),
    getPageTitle: ()=> cy.get('.title'),
    getCheckoutBtn: ()=> cy.get('#checkout'),
    getPaymentInfo: ()=> cy.get('.summary_info > :nth-child(2)'),
    getShippingInfo: ()=> cy.get('.summary_info > :nth-child(4)'),
    getItemTotal: ()=> cy.get('.summary_subtotal_label'),
    getTax: ()=> cy.get('.summary_tax_label'),
    getOrderTotal: ()=> cy.get('.summary_total_label'),
    getFinishBtn: ()=> cy.get('#finish'),
    getCompleteHeader: ()=> cy.get('.complete-header'),
    getPonyImg: ()=> cy.get('.pony_express'),
    getBackToHomeBtn: ()=> cy.get('[data-test="back-to-products"]')
  };