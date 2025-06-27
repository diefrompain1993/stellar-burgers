import reducer, { fetchIngredients } from './slice';
import { TIngredient } from '@utils-types';

const initialState = { items: [], loading: false, error: null };

const item: TIngredient = {
  _id: '1',
  name: 'test',
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

describe('ingredients slice', () => {
  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initialState, fetchIngredients.pending('', undefined));
    expect(state.loading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = reducer(initialState, fetchIngredients.fulfilled([item], '', undefined));
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([item]);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(initialState, fetchIngredients.rejected(null, '', undefined));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
