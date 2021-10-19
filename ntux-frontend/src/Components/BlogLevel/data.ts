import { lazy } from 'react';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.BLOG.BASE,
    component: lazy(() => import('./AllBlogsPage')),
    exact: true,
  },
  {
    path: routes.BLOG.EACH_BLOG,
    component: lazy(() => import('./BlogDetailPage')),
    exact: true,
  },
];
