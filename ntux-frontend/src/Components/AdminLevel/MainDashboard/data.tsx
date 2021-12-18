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
    component: lazy(() => import('./MyCourses')),
    exact: true,
    id: '2',
    details: {
      title: 'My Courses',
    },
  },
  {
    path: routes.ADMIN.PORTFOLIO,
    component: lazy(() => import('./ManagePortfolio')),
    exact: true,
    id: '3',
    details: {
      title: 'Manage Portfolio Site',
    },
  },
  {
    path: routes.ADMIN.STUDENT_TUTORING,
    component: lazy(() => import('./StudentTutoring')),
    exact: true,
    id: '4',
    details: {
      title: 'Student Tutoring',
    },
  },
  {
    path: routes.ADMIN.POINTS_REWARDS,
    component: lazy(() => import('./PointsRewards')),
    exact: true,
    id: '5',
    details: {
      title: 'Points & Rewards',
    },
  },
  {
    path: routes.SETTINGS.BASE,
    component: lazy(() => import('./Settings')),
    id: '6',
    details: {
      title: 'Settings',
    },
  },
];
