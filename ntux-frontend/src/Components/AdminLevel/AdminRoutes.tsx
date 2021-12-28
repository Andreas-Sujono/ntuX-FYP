import React, { Suspense, memo } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/Selector/auth';
import { Role } from 'Models/Auth';

const AdminRoutes = () => {
  const location = useLocation();
  const role = useSelector(selectUserRole);

  const isAdmin = role !== Role.STUDENT;
  const base = isAdmin ? routes.STAFF.BASE : routes.ADMIN.BASE;

  const isAdminPath = matchPath(location.pathname, { path: routes.STAFF.BASE });

  if (role === Role.STUDENT && isAdminPath)
    return <Redirect to={routes.LP_HOMEPAGE} />;

  return (
    <Suspense
      fallback={
        <LoadingBar
          width="40px"
          styles={{
            containerStyle: {
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        />
      }
    >
      <Switch>
        {routeData.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect to={base} />;
      </Switch>
    </Suspense>
  );
};

export default memo(AdminRoutes);
