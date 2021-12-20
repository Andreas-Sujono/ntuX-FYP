import { routes } from 'Components/Routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
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
    path: routes.STAFF.BASE,
    Icon: DashboardIcon,
  },
  {
    id: '2',
    name: 'Manage Courses',
    path: routes.STAFF.MANAGE_COURSES,
    Icon: SchoolIcon,
  },
  {
    id: '3',
    name: 'Manage Users',
    path: routes.STAFF.MANAGE_USERS,
    Icon: PeopleIcon,
  },
  {
    id: '4',
    name: 'Manage Forum',
    path: routes.STAFF.MANAGE_FORUM,
    Icon: PeopleIcon,
  },
  {
    id: '5',
    name: 'Manage Rewards',
    path: routes.STAFF.MANAGE_REWARDS,
    Icon: LoyaltyIcon,
  },
  {
    id: '6',
    name: 'Settings',
    path: routes.STAFF.SETTINGS,
    Icon: SettingsIcon,
  },
];

export default data;
