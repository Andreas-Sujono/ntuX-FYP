import { lazy } from 'react';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.PROJECT.BASE,
    component: lazy(() => import('./MainPage')),
    exact: true,
  },
];
