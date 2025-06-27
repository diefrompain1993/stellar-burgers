describe('Burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('adds ingredients to constructor', () => {
    cy.contains('Тестовая булка').parent().contains('Добавить').click();
    cy.contains('Тестовый ингредиент').parent().contains('Добавить').click();
    cy.get('[class*=burger_constructor]').should('contain', 'Тестовая булка');
    cy.get('[class*=burger_constructor]').should('contain', 'Тестовый ингредиент');
  });

  it('opens and closes ingredient modal', () => {
    cy.contains('Тестовый ингредиент').click();
    cy.get('[class*=modal]').should('contain', 'Тестовый ингредиент');
    cy.get('[class*=modal] button').click();
    cy.get('[class*=modal]').should('not.exist');
  });

  it('closes ingredient modal by overlay', () => {
    cy.contains('Тестовая булка').click();
    cy.get('[class*=modal]').should('contain', 'Тестовая булка');
    cy.get('[class*=overlay]').click('center');
    cy.get('[class*=modal]').should('not.exist');
  });

  it('creates order and clears constructor', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test');
    });

    cy.contains('Тестовая булка').parent().contains('Добавить').click();
    cy.contains('Тестовый ингредиент').parent().contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[class*=modal]').should('contain', '12345');
    cy.get('[class*=modal] button').click();
    cy.get('[class*=modal]').should('not.exist');
    cy.get('[class*=elements] li').should('have.length', 0);
    cy.get('[class*=burger_constructor]').should('not.contain', 'Тестовая булка');
  });
});
