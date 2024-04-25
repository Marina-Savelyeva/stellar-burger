import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { userLogOut, logOut } from '../../services/UserSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut()); //удаляем куки
    dispatch(userLogOut()); //удаляем профиль, до null
    //window.location.reload(); //вышли из акка, поэтому обновляем,
    //navigate('/'); //чтобы нас закинуло на вход
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
