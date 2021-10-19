import { lazy } from 'react';
import { routes } from '../data';

export const routeData = [
  {
    path: routes.ADMIN.BASE,
    component: lazy(() => import('../../AdminLevel')),
  },
];
