describe('Burger constructor flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/orders', { fixture: 'order.json' });
    cy.visit('/');
  });

  it('should add ingredient to constructor', () => {
    cy.contains('Добавить').first().click();
    cy.get('[class*=burger-constructor-element]').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Булки');
    cy.get('a').contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента');
    cy.get('button').first().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.contains('Добавить').first().click();
    cy.contains('Оформить заказ').click();
    cy.contains('1234');
    cy.get('button').first().click();
    cy.get('[class*=burger-constructor-element]').should('not.exist');
  });
});
