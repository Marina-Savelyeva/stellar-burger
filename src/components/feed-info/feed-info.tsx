import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeed, getTodayTotal, getTotal } from '../../services/FeedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getFeed);
  const feed = {
    total: useSelector(getTotal),
    totalToday: useSelector(getTodayTotal)
  };

  const readyOrders = getOrders(orders, 'done');
  //console.log('hi', readyOrders);
  const pendingOrders = getOrders(orders, 'pending');
  //console.log('ooo', pendingOrders);
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
