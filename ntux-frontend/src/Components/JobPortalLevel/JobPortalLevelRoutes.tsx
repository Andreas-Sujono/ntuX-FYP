import React, { Suspense, memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';

const JobPortalLevelRoutes = () => {
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
        <Redirect to={routes.JOB.BASE} />;
      </Switch>
    </Suspense>
  );
};

export default memo(JobPortalLevelRoutes);
