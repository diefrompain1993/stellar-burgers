import reducer, { fetchIngredients } from './slice';
import { TIngredient } from '../../utils/types';

describe('ingredients slice', () => {
  const initialState = { items: [], loading: false, error: null };

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
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
      }
    ];
    const state = reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(initialState, { type: fetchIngredients.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
