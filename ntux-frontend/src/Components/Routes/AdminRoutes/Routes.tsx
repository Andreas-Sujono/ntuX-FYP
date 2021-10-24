import React, { Suspense, memo, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminProvider from '../../context/useAdminContext';
import { routeData } from './data';
import { routes } from '../data';
import FullPageLoadingBar from '../../../common/Components/LoadingBar/FullPageLoadingBar';

const Routes = () => {
  const isAuthenticated = true; //useSelector(selectIsAuthenticated);

  const getAdminData = () => {
    //call required admin data on every admin page
  };

  useEffect(() => {
    getAdminData();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to={routes.LP_HOMEPAGE} />;
  }

  return (
    <AdminProvider>
      <Suspense fallback={<FullPageLoadingBar />}>
        <Switch>
          {routeData.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to={routes.ADMIN.BASE} />;
        </Switch>
      </Suspense>
    </AdminProvider>
  );
};

export default memo(Routes);
