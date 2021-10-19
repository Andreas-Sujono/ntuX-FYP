import { lazy } from 'react';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.ADMIN.DASHBOARD,
    component: lazy(() => import('./MainDashboard')),
  },
];
