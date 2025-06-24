import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/orders/slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feeds, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!feeds) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, feeds]);

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
