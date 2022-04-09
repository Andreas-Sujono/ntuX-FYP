import React, { Suspense, memo, useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { routeData } from './data';
import { routes } from '../data';
import TopNav from '../../LandingPage/TopNav';
import Footer from '../../LandingPage/Footer';
import FullPageLoadingBar from '../../../common/Components/LoadingBar/FullPageLoadingBar';
import { useDispatch } from 'react-redux';
import { addWebsiteVisitActivity } from 'Store/Actions/pointsRewards';
import { getMyAccount, refreshToken } from 'Store/Actions/auth';
import { getMyCourses, getPublicCourses } from 'Store/Actions/courses';

const Routes = () => {
  const location = useLocation();
  const [isAdminRoutes, setIsAdminRoutes] = useState(false);

  const dispatch = useDispatch();

  const checkAdminPath = () => {
    if (
      matchPath(location.pathname, { path: routes.ADMIN.BASE }) ||
      matchPath(location.pathname, { path: routes.LOGIN_PAGE }) ||
      matchPath(location.pathname, { path: routes.RESET_PASSWORD_PAGE }) ||
      matchPath(location.pathname, { path: routes.STAFF.BASE }) ||
      matchPath(location.pathname, { path: routes.FORGOT_PASSWORD_PAGE }) ||
      matchPath(location.pathname, { path: routes.CONFIRM_EMAIL_PAGE }) ||
      matchPath(location.pathname, {
        path: routes.CONFIRM_FORGOT_PASSWORD_PAGE,
      })
    ) {
      setIsAdminRoutes(true);
    } else setIsAdminRoutes(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    });
    checkAdminPath();
  }, [location.pathname]);

  useEffect(() => {
    dispatch(addWebsiteVisitActivity());
    dispatch(getMyAccount());
    dispatch(getMyCourses());
    dispatch(getPublicCourses());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={<FullPageLoadingBar />}>
      {!isAdminRoutes && <TopNav />}
      <Switch>
        {routeData.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect to={routes.LP_HOMEPAGE} />;
      </Switch>
      {!isAdminRoutes && <Footer />}
    </Suspense>
  );
};

export default memo(Routes);
