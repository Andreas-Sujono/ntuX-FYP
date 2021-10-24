import { lazy } from 'react';
import { routes } from '../../Routes';

export const routeData = [
  {
    path: routes.ADMIN.BASE,
    component: lazy(() => import('./Dashboard')),
    exact: true,
    id: '1',
    details: {
      title: 'Dashboard',
    },
  },
  {
    path: routes.ADMIN.MY_COURSES,
    component: lazy(() => import('./StartLearning')),
    exact: true,
    id: '2',
    details: {
      title: 'Start Learning',
    },
  },
  {
    path: routes.ADMIN.MANAGE_FORUM,
    component: lazy(() => import('./ManageForum')),
    exact: true,
    id: '4',
    details: {
      title: 'Manage Forum',
    },
  },
  {
    path: routes.ADMIN.PORTFOLIO,
    component: lazy(() => import('./PortfolioSite')),
    exact: true,
    id: '5',
    details: {
      title: 'Portfolio Site',
    },
  },
  {
    path: routes.SETTINGS.PROFILE.BASE,
    component: lazy(() => import('./SettingsLevel/ProfileSetting')),
    id: '7',
    details: {
      title: 'Profile Setting',
    },
  },
  {
    path: routes.SETTINGS.PORTFOLIO.BASE,
    component: lazy(() => import('./PortfolioSite')),
    id: '8',
    details: {
      title: 'Portfolio Setting',
    },
  },
];
