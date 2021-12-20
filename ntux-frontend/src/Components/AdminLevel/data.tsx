import { lazy } from 'react';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.ADMIN.BASE,
    component: lazy(() => import('./MainDashboard')),
  },
  {
    path: routes.STAFF.BASE,
    component: lazy(() => import('./StaffDashboard')),
  },
];
