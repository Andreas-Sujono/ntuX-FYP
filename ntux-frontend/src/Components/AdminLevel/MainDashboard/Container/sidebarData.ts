import { routes } from 'Components/Routes';

export interface DropdownItem {
  id: string;
  name: string;
  path: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  path: string;
  icon: string;
  items?: DropdownItem[];
}

const data: SidebarItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: routes.ADMIN.DASHBOARD,
    icon: 'https://image.flaticon.com/icons/png/512/1828/1828765.png',
  },
  {
    id: '2',
    name: 'Start Learning',
    path: routes.ADMIN.SPECIALIZATIONS,
    icon: 'https://image.flaticon.com/icons/png/512/2883/2883662.png',
  },
  {
    id: '3',
    name: 'Manage Blog',
    path: routes.ADMIN.MANAGE_BLOG,
    icon: 'https://image.flaticon.com/icons/png/512/1159/1159633.png',
  },
  {
    id: '4',
    name: 'Manage Forum',
    path: routes.ADMIN.MANAGE_FORUM,
    icon: 'https://image.flaticon.com/icons/png/512/1545/1545615.png',
  },
  {
    id: '5',
    name: 'Portfolio Site',
    path: routes.ADMIN.PORTFOLIO,
    icon: 'https://image.flaticon.com/icons/png/512/2920/2920242.png',
  },
  {
    id: '6',
    name: 'Settings',
    path: routes.SETTINGS.PROFILE.BASE,
    icon: 'https://image.flaticon.com/icons/png/512/2099/2099058.png',
    items: [
      {
        id: '7',
        name: 'Profile Setting',
        path: routes.SETTINGS.PROFILE.BASE,
      },
      {
        id: '8',
        name: 'Portfolio Setting',
        path: routes.SETTINGS.PORTFOLIO.BASE,
      },
    ],
  },
];

export default data;
