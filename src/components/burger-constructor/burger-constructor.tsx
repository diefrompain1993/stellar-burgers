import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { ConstructorItems } from '../ui/burger-constructor/type';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearCreatedOrder } from '../../services/orders/slice';
import { clearConstructor } from '../../services/constructor/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const constructorItems: ConstructorItems = { bun, ingredients };

  const { orderRequest, createdOrder } = useSelector((state) => state.orders);

  const orderModalData = createdOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ids))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const closeOrderModal = () => {
    dispatch(clearCreatedOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
