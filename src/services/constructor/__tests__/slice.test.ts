import reducer, { addIngredient, removeIngredient, moveIngredientUp } from '../slice';
import { TIngredient } from '@utils-types';

jest.mock('uuid', () => ({ v4: () => '123' }));

describe('constructor slice', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const sauce: TIngredient = {
    _id: '2',
    name: 'sauce',
    type: 'sauce',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 2,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('should handle addIngredient', () => {
    let state = reducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('1');
    state = reducer(state, addIngredient(sauce));
    expect(state.ingredients.length).toBe(1);
  });

  it('should handle removeIngredient', () => {
    const initial = reducer(undefined, addIngredient(sauce));
    const state = reducer(initial, removeIngredient('123'));
    expect(state.ingredients.length).toBe(0);
  });

  it('should handle moveIngredientUp', () => {
    const firstState = reducer(undefined, addIngredient(sauce));
    const secondState = reducer(firstState, addIngredient({ ...sauce, _id: '3' }));
    const moved = reducer(secondState, moveIngredientUp(1));
    expect(moved.ingredients[0]._id).toBe('3');
    expect(moved.ingredients[1]._id).toBe('2');
  });
});
