import { rootReducer } from '../store';
import { initialState as constructorInitial } from '../constructor/slice';
import { initialState as ingredientsInitial } from '../ingredients/slice';
import { initialState as userInitial } from '../user/slice';
import { initialState as ordersInitial } from '../orders/slice';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      ingredients: ingredientsInitial,
      burgerConstructor: constructorInitial,
      user: userInitial,
      orders: ordersInitial
    });
  });
});
