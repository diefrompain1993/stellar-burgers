import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp
} from './slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('constructor slice', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'Булка',
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
    _id: '2',
    name: 'Начинка',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 2,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('should handle addIngredient', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('1');
  });

  it('should handle removeIngredient', () => {
    const start = {
      bun: null,
      ingredients: [
        { ...main, id: 'a' },
        { ...main, id: 'b' }
      ] as TConstructorIngredient[]
    };
    const state = reducer(start, removeIngredient('a'));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('b');
  });

  it('should handle moveIngredientUp', () => {
    const start = {
      bun: null,
      ingredients: [
        { ...main, id: 'a' },
        { ...main, id: 'b' }
      ] as TConstructorIngredient[]
    };
    const state = reducer(start, moveIngredientUp(1));
    expect(state.ingredients[0].id).toBe('b');
  });
});
