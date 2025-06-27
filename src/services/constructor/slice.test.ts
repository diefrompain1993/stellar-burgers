import reducer, { addIngredient, removeIngredient, moveIngredientUp } from './slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

jest.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('constructor slice', () => {
  const bun: TIngredient = {
    _id: 'bun1',
    name: 'bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const main: TIngredient = {
    _id: 'ing1',
    name: 'main',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('should handle addIngredient', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun?.name).toBe('bun');
  });

  it('should handle removeIngredient', () => {
    let state = reducer(undefined, addIngredient(main));
    const id = state.ingredients[0].id;
    state = reducer(state, removeIngredient(id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredientUp', () => {
    const ingA: TConstructorIngredient = { ...main, id: 'a' };
    const ingB: TConstructorIngredient = { ...main, id: 'b' };
    const startState = { bun: null, ingredients: [ingA, ingB] };
    const state = reducer(startState, moveIngredientUp(1));
    expect(state.ingredients[0].id).toBe('b');
  });
});
