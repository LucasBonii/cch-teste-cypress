describe('Testes SauceDemo CCH', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';

  function login(user = username, pass = password) {
    cy.visit('/');
    cy.get('[data-test="username"]').type(user);
    cy.get('[data-test="password"]').type(pass);
    cy.get('[data-test="login-button"]').click();
  }

  it('01. Login realizado com sucesso', () => {
    login();
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('02. Erro de login', () => {
    login('erro', 'erro');
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
  });

  it('03. Adicionar produto ao carrinho', () => {
    login();
    cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
   it('04. Remover produto do carrinho', () => {
    login();

    cy.get('.inventory_item').eq(0).find('button').contains('Add to cart').click();
    cy.get('.inventory_item').eq(1).find('button').contains('Add to cart').click();
    
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').first().find('button').contains('Remove').click();
    
    cy.get('.cart_item').should('have.length', 1);
  });

  it('05. Finalziar compra', () => {
    login();
    cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
    cy.get('.shopping_cart_link').click();
    
    cy.contains('Checkout').click();
    cy.get('[data-test="firstName"]').type('Rafael');
    cy.get('[data-test="lastName"]').type('Oliveira');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it('06. Verificar aparência visual do site', () => {
    login();
    cy.get('.app_logo').should('be.visible');
    cy.get('.title').should('have.text', 'Products');
    cy.screenshot('pagina-produtos');
  });
});