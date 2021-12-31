import React, { Suspense, memo, useState, useEffect, useRef } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import StudentMainContainer from './Container/MainContainer';
import CourseContainer from './Container/CourseContainer';
import { routeData } from './data';
import { routes } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getAllLecturers,
  getAllStudents,
  getAllUsers,
  getSummary,
  getWebsiteActivity,
} from 'Store/Actions/admin';
import { getMyAccount } from 'Store/Actions/auth';
import { selectUserId } from 'Store/Selector/auth';

const StaffDashboardRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isCourseLevel, setIsCourseLevel] = useState(false);
  const isAuthenticated = !!useSelector(selectUserId);
  const MainContainer = isCourseLevel ? CourseContainer : StudentMainContainer;

  useEffect(() => {
    const pathname = location.pathname;

    const isCourseLevelPath = /.*admin\/courses.*/.test(pathname);
    if (isCourseLevelPath) {
      setIsCourseLevel(true);
    } else {
      setIsCourseLevel(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getSummary());
    dispatch(getAllUsers());
    dispatch(getMyAccount());
    dispatch(getAllLecturers());
    dispatch(getAllStudents());
    dispatch(getWebsiteActivity());
  }, []);

  // useEffect(() => {
  //   getActivityEveryInterval();

  //   return () => {
  //     if (ref.current) clearTimeout(ref.current);
  //   };
  // }, []);

  // const getActivityEveryInterval = () => {
  //   dispatch(getWebsiteActivity());
  //   ref.current = setTimeout(() => {
  //     getActivityEveryInterval();
  //     ref.current = null;
  //   }, 2500);
  // };

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
          <Redirect to={routes.STAFF.BASE} />;
        </Switch>
      </Suspense>
    </MainContainer>
  );
};

export default memo(StaffDashboardRoutes);
