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
];
