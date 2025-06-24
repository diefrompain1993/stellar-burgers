import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  element: JSX.Element;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  element
}) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: string })?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return element;
};
