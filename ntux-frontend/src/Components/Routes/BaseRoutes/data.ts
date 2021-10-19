import { lazy } from 'react';
import { routes } from '../data';

export const routeData = [
  {
    path: routes.LP_HOMEPAGE,
    component: lazy(() => import('../../LandingPage/Homepage')),
    exact: true,
  },
  {
    path: routes.LP_ABOUT_US,
    component: lazy(() => import('../../LandingPage/AboutUs')),
    exact: true,
  },
  {
    path: routes.BLOG.BASE,
    component: lazy(() => import('../../BlogLevel')),
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
    path: routes.EVENT.BASE,
    component: lazy(() => import('../../Event')),
  },
  {
    path: routes.ENTERTAINMENT.BASE,
    component: lazy(() => import('../../Entertainment')),
  },
  {
    path: routes.JOB.BASE,
    component: lazy(() => import('../../JobPortalLevel')),
  },
  {
    path: routes.FEED.BASE,
    component: lazy(() => import('../../FeedLevel')),
  },
  {
    path: routes.PROJECT.BASE,
    component: lazy(() => import('../../ProjectLevel')),
  },
  {
    path: routes.COMING_SOON,
    component: lazy(() => import('../../ComingSoonPage')),
  },
];
