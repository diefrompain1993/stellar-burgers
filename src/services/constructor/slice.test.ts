import reducer, { addIngredient, removeIngredient, moveIngredientUp } from './slice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

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
    image: 'bun.png',
    image_large: 'bun.png',
    image_mobile: 'bun.png'
  };

  const ingredient: TIngredient = {
    _id: 'ing1',
    name: 'sauce',
    type: 'sauce',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 2,
    image: 'sauce.png',
    image_large: 'sauce.png',
    image_mobile: 'sauce.png'
  };

  it('should handle addIngredient', () => {
    const action = addIngredient(ingredient);
    const state = reducer(undefined, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(action.payload);
  });

  it('should handle removeIngredient', () => {
    const addAction = addIngredient(ingredient);
    const stateWithIngredient = reducer(undefined, addAction);
    const removed = reducer(stateWithIngredient, removeIngredient(addAction.payload.id));
    expect(removed.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredientUp', () => {
    const item1: TConstructorIngredient = { ...ingredient, id: '1' };
    const item2: TConstructorIngredient = { ...ingredient, id: '2' };
    const startState = { bun: bun, ingredients: [item1, item2] };
    const moved = reducer(startState, moveIngredientUp(1));
    expect(moved.ingredients[0].id).toBe('2');
    expect(moved.ingredients[1].id).toBe('1');
  });
});
