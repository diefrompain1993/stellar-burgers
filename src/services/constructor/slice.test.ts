import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  initialState
} from './slice';
import { TIngredient } from '@utils-types';

describe('constructor slice', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'bun',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  };
  const sauce: TIngredient = {
    _id: '2',
    name: 'sauce',
    type: 'sauce',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 2,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('should handle addIngredient', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.bun?._id).toEqual('1');
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = reducer(initialState, addIngredient(sauce));
    const state = reducer(stateWithIngredient, removeIngredient(stateWithIngredient.ingredients[0].id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredientUp', () => {
    let state = reducer(initialState, addIngredient(sauce));
    state = reducer(state, addIngredient({ ...sauce, _id: '3' }));
    const secondId = state.ingredients[1].id;
    const newState = reducer(state, moveIngredientUp(1));
    expect(newState.ingredients[0].id).toEqual(secondId);
  });
});
