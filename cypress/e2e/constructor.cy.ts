describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
  });

  it('should add ingredient to constructor', () => {
    cy.visit('/');
    cy.wait('@ingredients');
    cy.contains('button', 'Добавить').eq(1).click();
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('should open and close ingredient modal', () => {
    cy.visit('/');
    cy.wait('@ingredients');
    cy.get('a').contains('Булка').click();
    cy.contains('Детали ингредиента');
    cy.contains('Булка');
    cy.get('#modals button').click();
    cy.contains('Детали ингредиента').should('not.exist');

    cy.get('a').contains('Булка').click();
    cy.get('#modals .overlay').click('topLeft');
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test');
    });

    cy.visit('/');
    cy.wait('@ingredients');
    cy.contains('button', 'Добавить').eq(0).click();
    cy.contains('button', 'Добавить').eq(1).click();
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('1234');
    cy.get('#modals button').click();
    cy.contains('1234').should('not.exist');
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
    cy.clearCookie('accessToken');
    cy.window().then((win) => win.localStorage.clear());
  });
});
