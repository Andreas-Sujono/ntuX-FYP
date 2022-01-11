import React, { Suspense, memo, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routeData } from './data';
import { routes } from '../Routes';
import BaseContainer from './BaseContainer';
import { useDispatch } from 'react-redux';
import {
  getActiveUsers,
  getAllQuestions,
  getAllTags,
  getAllUsers,
  getMyQuestions,
  getTopUsers,
  getUnansweredQuestions,
} from 'Store/Actions/forum';

const ForumRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestions());
    dispatch(getMyQuestions());
    dispatch(getUnansweredQuestions());
    dispatch(getAllTags());
    dispatch(getAllUsers());
    dispatch(getTopUsers());
    dispatch(getActiveUsers());
  }, []);

  return (
    <BaseContainer>
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
          <Redirect to={routes.FORUM.BASE} />;
        </Switch>
      </Suspense>
    </BaseContainer>
  );
};

export default memo(ForumRoutes);
