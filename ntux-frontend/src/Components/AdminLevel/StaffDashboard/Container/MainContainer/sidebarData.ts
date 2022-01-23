import { routes } from 'Components/Routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import { Role } from 'Models/Auth';

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
  getName: any;
}

const data: SidebarItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: routes.STAFF.BASE,
    Icon: DashboardIcon,
    getName: (role) => (role === Role.ADMIN ? 'Dashboard' : 'Dashboard'),
  },
  {
    id: '2',
    name: 'Manage Courses',
    path: routes.STAFF.MANAGE_COURSES,
    Icon: SchoolIcon,
    getName: (role) =>
      role === Role.ADMIN ? 'Manage Courses' : 'View Courses',
  },
  {
    id: '3',
    name: 'Manage Users',
    path: routes.STAFF.MANAGE_USERS,
    Icon: PeopleIcon,
    getName: (role) => (role === Role.ADMIN ? 'Manage Users' : 'View Users'),
  },
  // {
  //   id: '4',
  //   name: 'Manage Forum',
  //   path: routes.STAFF.MANAGE_FORUM,
  //   Icon: ForumIcon,
  // },
  {
    id: '5',
    name: 'Manage Rewards',
    path: routes.STAFF.MANAGE_REWARDS,
    Icon: LoyaltyIcon,
    getName: (role) =>
      role === Role.ADMIN ? 'Manage Rewards' : 'View Rewards',
  },
  {
    id: '6',
    name: 'Settings',
    path: routes.STAFF.SETTINGS,
    Icon: SettingsIcon,
    getName: (role) => (role === Role.ADMIN ? 'Settings' : 'Settings'),
  },
];

export default data;
