import reducer, { fetchIngredients } from './slice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  const ingredient: TIngredient = {
    _id: 'id1',
    name: 'ing',
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

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.loading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled([ingredient], '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([ingredient]);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(null, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
