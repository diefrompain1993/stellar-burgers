import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, setUserOrders } from '../../services/orders/slice';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.userOrders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchUserOrders());
    }
    const accessToken = getCookie('accessToken');
    const token = accessToken ? accessToken.replace('Bearer ', '') : '';
    const wsUrl =
      process.env.BURGER_API_URL?.replace('https', 'wss').replace('/api', '') +
      `/orders?token=${token}`;
    const socket = new WebSocket(
      wsUrl || 'wss://norma.nomoreparties.space/orders'
    );
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.success) {
        dispatch(setUserOrders(data.orders));
      }
    };
    return () => {
      socket.close();
    };
  }, [dispatch, orders.length]);

  return <ProfileOrdersUI orders={orders} />;
};
