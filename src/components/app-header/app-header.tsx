import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getProfileUser } from '../../services/UserSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getProfileUser);
  return <AppHeaderUI userName={'' || userName?.name} />;
};
