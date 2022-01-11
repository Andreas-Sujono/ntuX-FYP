import React, { Suspense, memo, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import StudentMainContainer from './Container/MainContainer';
import CourseContainer from './Container/CourseContainer';
import { routeData } from './data';
import { routes } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCourses } from 'Store/Actions/courses';
import { getMyAccount } from 'Store/Actions/auth';
import {
  getGoalTask,
  getMyAchievements,
  getNotifications,
} from 'Store/Actions/pointsRewards';
import { selectUserId } from 'Store/Selector/auth';

const MainDashboardRoutes = () => {
  const location = useLocation();
  const isAuthenticated = !!useSelector(selectUserId);

  const [isCourseLevel, setIsCourseLevel] = useState(false);
  const MainContainer = isCourseLevel ? CourseContainer : StudentMainContainer;
  const dispatch = useDispatch();

  useEffect(() => {
    const pathname = location.pathname;

    const isCourseLevelPath = /.*dashboard\/courses.*/.test(pathname);
    if (isCourseLevelPath) {
      setIsCourseLevel(true);
    } else {
      setIsCourseLevel(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getMyAccount());
    dispatch(getMyCourses());
    dispatch(getGoalTask());
    dispatch(getMyAchievements());
    dispatch(getNotifications());
  }, []);

  if (!isAuthenticated) {
    return <Redirect to={routes.LOGIN_PAGE} />;
  }

  return (
    <MainContainer>
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
          <Redirect to={routes.ADMIN.BASE} />;
        </Switch>
      </Suspense>
    </MainContainer>
  );
};

export default memo(MainDashboardRoutes);
