import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { feedsApi, getFeed } from '../../services/FeedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedsApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const newFeeds = () => {
    dispatch(feedsApi());
    //console.log('update');
  };

  return <FeedUI orders={orders} handleGetFeeds={newFeeds} />;
};
