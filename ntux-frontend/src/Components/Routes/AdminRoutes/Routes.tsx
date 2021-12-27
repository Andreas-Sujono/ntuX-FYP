import React, { Suspense, memo, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminProvider from '../../context/useAdminContext';
import { routeData } from './data';
import { routes } from '../data';
import FullPageLoadingBar from '../../../common/Components/LoadingBar/FullPageLoadingBar';
import { useSelector } from 'react-redux';
import { selectUserId } from 'Store/Selector/auth';

const Routes = () => {
  const isAuthenticated = !!useSelector(selectUserId);

  const getAdminData = () => {
    //call required admin data on every admin page
  };

  useEffect(() => {
    getAdminData();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to={routes.LOGIN_PAGE} />;
  }

  return (
    <AdminProvider>
      <Suspense fallback={<FullPageLoadingBar />}>
        <Switch>
          {routeData.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Suspense>
    </AdminProvider>
  );
};

export default memo(Routes);
