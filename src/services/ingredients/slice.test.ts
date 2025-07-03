import reducer, { fetchIngredients, initialState } from './slice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  it('should set loading on pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should store data on fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
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
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: ingredients };
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.items).toEqual(ingredients);
    expect(state.loading).toBe(false);
  });

  it('should set error on rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
