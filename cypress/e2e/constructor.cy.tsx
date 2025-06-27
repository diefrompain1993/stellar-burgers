describe('Burger constructor flow', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/ingredients',
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      'GET',
      '**/auth/user',
      { fixture: 'user.json' }
    ).as('getUser');
    cy.intercept(
      'POST',
      '**/orders',
      { fixture: 'order.json' }
    ).as('postOrder');
    cy.visit('/');
    cy.wait('@getIngredients');
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
    cy.get('[data-cy=add-button]').first().click();
    cy.get('[data-cy=constructor-item]').should('have.length', 1);
  });

  it('should open and close ingredient modal', () => {
    cy.get('[data-cy=ingredient-card]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy=ingredient-modal]').should('be.visible');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=ingredient-modal]').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => win.localStorage.setItem('refreshToken', 'test'));
    cy.get('[data-cy=add-button]').first().click();
    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');
    cy.get('[data-cy=order-number]').should('contain', '1234');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=constructor-item]').should('not.exist');
    cy.clearCookie('accessToken');
    cy.window().then((win) => win.localStorage.removeItem('refreshToken'));
  });
});
