import { getIsAuth } from '../services/UserSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import React from 'react';

type TProtected = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtected) => {
  const location = useLocation();
  const authUser = useSelector(getIsAuth);

  if (!onlyUnAuth && !authUser) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && authUser) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  return children;
};
