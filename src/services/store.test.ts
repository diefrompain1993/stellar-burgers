import { rootReducer } from './store';
import ingredientsReducer from './ingredients/slice';
import constructorReducer from './constructor/slice';
import userReducer from './user/slice';
import ordersReducer from './orders/slice';

const initialState = {
  ingredients: ingredientsReducer(undefined, { type: '' }),
  burgerConstructor: constructorReducer(undefined, { type: '' }),
  user: userReducer(undefined, { type: '' }),
  orders: ordersReducer(undefined, { type: '' })
};

describe('rootReducer', () => {
  it('should return initial state', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });
});
