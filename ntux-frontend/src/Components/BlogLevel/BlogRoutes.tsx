import React, { Suspense, memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';

const BlogRoutes = () => {
  return (
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
        <Redirect to={routes.BLOG.BASE} />;
      </Switch>
    </Suspense>
  );
};

export default memo(BlogRoutes);
