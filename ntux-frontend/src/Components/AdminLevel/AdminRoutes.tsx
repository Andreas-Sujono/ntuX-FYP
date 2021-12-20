import React, { Suspense, memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';

const AdminRoutes = () => {
  const isAdmin = true;
  const base = isAdmin ? routes.STAFF.BASE : routes.ADMIN.BASE;

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
