import { lazy } from 'react';
import { routes } from 'Components/Routes';

export const routeData = [
  {
    path: routes.SETTINGS.PROFILE.BASE,
    component: lazy(() => import('./BasicProfile')),
    exact: true,
    details: {
      name: 'Basic Profile',
    },
  },
  {
    path: routes.SETTINGS.PROFILE.CHANGE_PASSWORD,
    component: lazy(() => import('./ChangePassword')),
    details: {
      name: 'Change Password',
    },
  },
  {
    path: routes.SETTINGS.PROFILE.LOGOUT,
    component: lazy(() => import('./Logout')),
    details: {
      name: 'Logout',
    },
  },
];
