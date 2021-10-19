import React, { Suspense, memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';
import { TopBackground } from './Styles';

const EntertainmentRoutes = () => {
  return (
    <div style={{ width: '100vw', minHeight: '80vh' }} className="dt-bprimary">
      <TopBackground />
      <Suspense
        fallback={
          <div
            style={{
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingBar width="40px" />
          </div>
        }
      >
        <Switch>
          {routeData.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to={routes.ENTERTAINMENT.BASE} />;
        </Switch>
      </Suspense>
    </div>
  );
};

export default memo(EntertainmentRoutes);
