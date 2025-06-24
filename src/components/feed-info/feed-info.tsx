import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { TFeed } from '../ui/feed-info/type';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const ordersData = useSelector((state) => state.orders.feeds);
  const orders: TOrder[] = ordersData?.orders || [];
  const feed: TFeed = {
    total: ordersData?.total || 0,
    totalToday: ordersData?.totalToday || 0
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
