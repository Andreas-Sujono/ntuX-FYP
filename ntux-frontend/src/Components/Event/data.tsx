import { lazy } from 'react';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.EVENT.BASE,
    component: lazy(() => import('./MainPage')),
    exact: true,
  },
];
