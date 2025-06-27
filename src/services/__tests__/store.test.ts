import { rootReducer } from '../store';
import constructorReducer from '../constructor/slice';
import ingredientsReducer from '../ingredients/slice';
import userReducer from '../user/slice';
import ordersReducer from '../orders/slice';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: constructorReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});
