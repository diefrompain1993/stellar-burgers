import reducer, { fetchIngredients } from '../slice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  const initial = { items: [], loading: false, error: null };
  const payload: TIngredient[] = [
    {
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
    }
  ];

  it('handles pending', () => {
    const state = reducer(initial, fetchIngredients.pending('req'));
    expect(state.loading).toBe(true);
  });

  it('handles fulfilled', () => {
    const state = reducer(initial, fetchIngredients.fulfilled(payload, 'req'));
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(payload);
  });

  it('handles rejected', () => {
    const state = reducer(initial, fetchIngredients.rejected(null, 'req'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
