export let LoginPage = {
    getUsername: () =>cy.get('#user-name'),
    getPassword: () => cy.get('#password'),
    getLoginBtn: () => cy.get('.login-box .btn_action'),
    getErrorMesage: () => cy.get('[data-test="error"]'),
  };