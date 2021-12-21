import { lazy } from 'react';
import { routes } from '../../../Routes';

export const routeData = [
  {
    path: routes.STAFF_COURSES.BASE,
    component: lazy(() => import('./ManageOverview')),
    exact: true,
    id: '1',
    details: {
      title: 'Manage Overview',
    },
  },
  {
    path: routes.STAFF_COURSES.OVERVIEW,
    component: lazy(() => import('./ManageOverview')),
    exact: true,
    id: '1',
    details: {
      title: 'Manage Overview',
    },
  },
  {
    path: routes.STAFF_COURSES.COURSE_CONTENT,
    component: lazy(() => import('./CourseContent')),
    exact: true,
    id: '2',
    details: {
      title: 'Manage Content',
    },
  },
  {
    path: routes.STAFF_COURSES.MANAGE_BATCH,
    component: lazy(() => import('./ManageBatch')),
    exact: true,
    id: '3',
    details: {
      title: 'Manage Batch',
    },
  },
  {
    path: routes.STAFF_COURSES.MANAGE_STUDENTS,
    component: lazy(() => import('./ManageStudents')),
    exact: true,
    id: '4',
    details: {
      title: 'Manage Students',
    },
  },
  {
    path: routes.STAFF_COURSES.ANNOUNCEMENTS,
    component: lazy(() => import('./ManageAnnouncements')),
    exact: true,
    id: '5',
    details: {
      title: 'Manage Announcements',
    },
  },
  {
    path: routes.STAFF_COURSES.STUDENT_DETAIL,
    component: lazy(() => import('./StudentDetail')),
    exact: true,
    id: '4',
    details: {
      title: 'Student Detail',
    },
  },
];
