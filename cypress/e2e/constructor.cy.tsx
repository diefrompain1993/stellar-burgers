describe('Burger constructor flow', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/ingredients',
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/auth/user',
      { fixture: 'user.json' }
    ).as('getUser');
    cy.intercept(
      'POST',
      'https://norma.nomoreparties.space/api/orders',
      { fixture: 'order.json' }
    ).as('postOrder');
    cy.visit('/');
    cy.window().its('store').then((store) => {
      cy.fixture('ingredients.json').then((data) => {
        store.dispatch({
          type: 'ingredients/fetch/fulfilled',
          payload: data.data
        });
      });
    });
  });

  it('should add ingredient to constructor', () => {
    cy.contains('Добавить').first().click({ force: true });
    cy.get('[class*=burger-constructor-element]').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента');
    cy.get('[class*=modal] button').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => win.localStorage.setItem('refreshToken', 'test'));
    cy.contains('Добавить').first().click({ force: true });
    cy.contains('Оформить заказ').click();
    cy.contains('1234');
    cy.get('[class*=modal] button').click({ force: true });
    cy.get('[class*=burger-constructor-element]').should('not.exist');
    cy.clearCookie('accessToken');
    cy.window().then((win) => win.localStorage.removeItem('refreshToken'));
  });
});
