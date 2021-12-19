import { routes } from 'Components/Routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import WebIcon from '@mui/icons-material/Web';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

export interface DropdownItem {
  id: string;
  name: string;
  path: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  path: string;
  Icon: any;
  items?: DropdownItem[];
}

const data: SidebarItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: routes.ADMIN.BASE,
    Icon: DashboardIcon,
  },
  {
    id: '2',
    name: 'My Courses',
    path: routes.ADMIN.MY_COURSES,
    Icon: SchoolIcon,
  },
  {
    id: '3',
    name: 'Manage Portfolio Site',
    path: routes.ADMIN.PORTFOLIO,
    Icon: WebIcon,
  },
  {
    id: '4',
    name: 'Student Tutoring',
    path: routes.ADMIN.STUDENT_TUTORING,
    Icon: PeopleIcon,
  },
  {
    id: '5',
    name: 'Points & Rewards',
    path: routes.ADMIN.POINTS_REWARDS,
    Icon: LoyaltyIcon,
  },
  {
    id: '6',
    name: 'Settings',
    path: routes.SETTINGS.PROFILE.BASE,
    Icon: SettingsIcon,
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
