import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, setFeeds } from '../../services/orders/slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feeds, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchFeeds());
    const wsUrl =
      process.env.BURGER_API_URL?.replace('https', 'wss').replace('/api', '') +
      '/orders/all';
    const socket = new WebSocket(
      wsUrl || 'wss://norma.nomoreparties.space/orders/all'
    );
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.success) {
        dispatch(setFeeds(data));
      }
    };
    return () => {
      socket.close();
    };
  }, [dispatch]);

  if (loading || !feeds) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feeds.orders}
      handleGetFeeds={() => dispatch(fetchFeeds())}
    />
  );
};
