import { rootReducer } from './store';
import { AnyAction } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, {} as AnyAction);
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
