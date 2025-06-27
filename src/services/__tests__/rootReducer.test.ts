import rootReducer from '../rootReducer';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      ingredients: { items: [], loading: false, error: null },
      burgerConstructor: { bun: null, ingredients: [] },
      user: { user: null, loading: false, error: null, isAuthChecked: false },
      orders: {
        feeds: null,
        userOrders: [],
        currentOrder: null,
        createdOrder: null,
        orderRequest: false,
        loading: false,
        error: null
      }
    });
  });
});
