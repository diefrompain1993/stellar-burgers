/// <reference types="cypress" />

describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should add ingredients to constructor', () => {
    cy.contains('li', 'Краторная булка').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('li', 'Соус Spicy-X').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.get('section.burger_constructor').contains('Оформить заказ');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('li', 'Краторная булка').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal"]').contains('Краторная булка');
    cy.get('[data-testid="close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should close ingredient modal by overlay click', () => {
    cy.contains('li', 'Краторная булка').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="overlay"]').click('center');
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test');
      win.document.cookie = 'accessToken=test';
    });

    cy.contains('li', 'Краторная булка').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('li', 'Соус Spicy-X').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('[data-testid="modal"] h2', '1234');
    cy.get('[data-testid="overlay"]').click('center');
    cy.get('[data-testid="modal"]').should('not.exist');
    cy.get('section.burger_constructor').within(() => {
      cy.contains('Выберите булки');
      cy.contains('Выберите начинку');
    });
  });
});
