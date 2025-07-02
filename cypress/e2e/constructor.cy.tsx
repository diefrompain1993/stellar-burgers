/// <reference types="cypress" />

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
  });

  it('should add ingredient to constructor', () => {
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Добавить').first().click();
    cy.get('[data-testid="constructor-drop"]').should(
      'contain.text',
      'Краторная булка N-200i'
    );
  });

  it('should open and close ingredient modal', () => {
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.contains('Детали ингредиента');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => win.localStorage.setItem('refreshToken', 'test'));
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Добавить').first().click();
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('1234');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="constructor-drop"]').should(
      'not.contain.text',
      'Краторная булка N-200i'
    );
    cy.clearCookie('accessToken');
    cy.window().then((win) => win.localStorage.clear());
  });
});
