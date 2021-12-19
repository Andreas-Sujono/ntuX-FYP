import { lazy } from 'react';
import { routes } from '../../../Routes';

export const routeData = [
  {
    path: routes.COURSES.BASE,
    component: lazy(() => import('./Overview')),
    exact: true,
    id: '1',
    details: {
      title: 'Courses',
    },
  },
  {
    path: routes.COURSES.OVERVIEW,
    component: lazy(() => import('./Overview')),
    exact: true,
    id: '1',
    details: {
      title: 'Courses',
    },
  },
  {
    path: routes.COURSES.COURSE_CONTENT,
    component: lazy(() => import('./CourseContent')),
    exact: true,
    id: '2',
    details: {
      title: 'Courses',
    },
  },
  {
    path: routes.COURSES.ANNOUNCEMENTS,
    component: lazy(() => import('./Announcements')),
    exact: true,
    id: '3',
    details: {
      title: 'Courses',
    },
  },
];
