import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, setUserOrders } from '../../services/orders/slice';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.userOrders);
  const { isAuthChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthChecked) {
      return;
    }
    dispatch(fetchUserOrders());
    const token = getCookie('accessToken')?.replace('Bearer ', '');
    const wsBase = process.env.BURGER_API_URL
      ? process.env.BURGER_API_URL.replace('https', 'wss').replace('/api', '')
      : 'wss://norma.nomoreparties.space';
    const socket = new WebSocket(`${wsBase}/orders?token=${token}`);
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.success) {
        dispatch(setUserOrders(data.orders));
      }
    };
    return () => {
      socket.close();
    };
  }, [dispatch, isAuthChecked]);

  return <ProfileOrdersUI orders={orders} />;
};
