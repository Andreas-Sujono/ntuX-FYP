import { lazy } from 'react';
import { routes } from '../../Routes';

export const routeData = [
  {
    path: routes.STAFF.BASE,
    component: lazy(() => import('./Dashboard')),
    exact: true,
    id: '1',
    details: {
      title: 'Admin Dashboard',
    },
  },
  {
    path: routes.STAFF.DASHBOARD,
    component: lazy(() => import('./Dashboard')),
    exact: true,
    id: '1',
    details: {
      title: 'Admin Dashboard',
    },
  },
  {
    path: routes.STAFF.MANAGE_COURSES,
    component: lazy(() => import('./ManageCourses')),
    exact: true,
    id: '2',
    details: {
      title: 'Manage Courses',
    },
  },
  {
    path: routes.STAFF.MANAGE_USERS,
    component: lazy(() => import('./ManageUsers')),
    exact: true,
    id: '3',
    details: {
      title: 'Manage Users',
    },
  },
  {
    path: routes.STAFF.MANAGE_FORUM,
    component: lazy(() => import('./ManageForum')),
    exact: true,
    id: '4',
    details: {
      title: 'Manage Forum',
    },
  },
  {
    path: routes.STAFF.MANAGE_REWARDS,
    component: lazy(() => import('./ManageRewards')),
    exact: true,
    id: '5',
    details: {
      title: 'Manage Rewards',
    },
  },
  {
    path: routes.STAFF.SETTINGS,
    component: lazy(() => import('./Settings')),
    exact: true,
    id: '6',
    details: {
      title: 'Settings',
    },
  },
];
