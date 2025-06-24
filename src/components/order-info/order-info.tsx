import { FC, useEffect, useMemo } from 'react';
import { useParams, useLocation, Location } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderInfo,
  clearCurrentOrder,
  setCurrentOrder
} from '../../services/orders/slice';
import { fetchIngredients } from '../../services/ingredients/slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.currentOrder);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const feedsOrders = useSelector((state) => state.orders.feeds?.orders);
  const userOrders = useSelector((state) => state.orders.userOrders);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (number) {
      const num = Number(number);
      const fromStore =
        feedsOrders?.find((o) => o.number === num) ||
        userOrders.find((o) => o.number === num);

      if (fromStore) {
        dispatch(setCurrentOrder(fromStore));
      } else if (!orderData || orderData.number !== num) {
        dispatch(fetchOrderInfo(num));
      }
    }

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, number, orderData, feedsOrders, userOrders]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || loading) {
    return error ? (
      <p className='text text_type_main-default p-10'>{error}</p>
    ) : (
      <Preloader />
    );
  }

  const inModal = Boolean(
    (location.state as { background?: Location })?.background
  );

  return <OrderInfoUI orderInfo={orderInfo} inModal={inModal} />;
};
