import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAppUser } from 'containers/App/selectors';
import { isEmpty } from 'lodash-es';

const PrivateRoute = () => {
  const isLogged = useSelector(selectAppUser);
  return !isEmpty(isLogged) ? <Outlet /> : <Navigate to={'/'} replace />;
};

export default PrivateRoute;
