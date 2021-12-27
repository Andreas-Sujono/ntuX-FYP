import { confirmForgotPassword } from './../../../Store/Actions/auth/general/thunk';
import { lazy } from 'react';
import { routes } from '../data';

export const routeData = [
  {
    path: routes.LP_HOMEPAGE,
    component: lazy(() => import('../../LandingPage/Homepage')),
    exact: true,
  },
  {
    path: routes.LOGIN_PAGE,
    component: lazy(() => import('../../Auth/LoginPage')),
    exact: true,
  },
  {
    path: routes.FORGOT_PASSWORD_PAGE,
    component: lazy(() => import('../../Auth/ForgotPasswordPage')),
    exact: true,
  },
  {
    path: routes.CONFIRM_FORGOT_PASSWORD_PAGE,
    component: lazy(
      () => import('../../Auth/ForgotPasswordPage/ConfirmForgotPassword'),
    ),
    exact: true,
  },
  {
    path: routes.CONFIRM_EMAIL_PAGE,
    component: lazy(() => import('../../Auth/ForgotPasswordPage/ConfirmEmail')),
    exact: true,
  },

  {
    path: routes.CONFIRM_EMAIL_PAGE,
    component: lazy(() => import('../../Auth/ForgotPasswordPage')),
    exact: true,
  },

  {
    path: routes.RESET_PASSWORD_PAGE,
    component: lazy(() => import('../../Auth/ResetPassword')),
    exact: true,
  },
  {
    path: routes.LP_ABOUT_US,
    component: lazy(() => import('../../LandingPage/AboutUs')),
    exact: true,
  },
  {
    path: routes.LP_COURSE,
    component: lazy(() => import('../../LandingPage/CourseDetail')),
    exact: true,
  },
  {
    path: routes.REGISTER_COURSE,
    component: lazy(() => import('../../LandingPage/RegisterCourse')),
    exact: true,
  },
  {
    path: routes.FORUM.BASE,
    component: lazy(() => import('../../ForumQnA')),
  },
  {
    path: routes.PORTFOLIO.BASE,
    component: lazy(() => import('../../PortfolioSite')),
  },
  {
    path: routes.ADMIN.BASE,
    component: lazy(() => import('../AdminRoutes')),
  },
  {
    path: routes.STAFF.BASE,
    component: lazy(() => import('../AdminRoutes')),
  },
  {
    path: routes.FORUM.BASE,
    component: lazy(() => import('../../ForumQnA')),
  },
];
