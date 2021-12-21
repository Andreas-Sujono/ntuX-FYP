import { routes } from 'Components/Routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';

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
    name: 'Manage Overview',
    path: routes.STAFF_COURSES.OVERVIEW,
    Icon: DashboardIcon,
  },
  {
    id: '2',
    name: 'Manage Content',
    path: routes.STAFF_COURSES.COURSE_CONTENT,
    Icon: SchoolIcon,
  },
  {
    id: '3',
    name: 'Manage Batch',
    path: routes.STAFF_COURSES.MANAGE_BATCH,
    Icon: GroupsIcon,
  },
  {
    id: '4',
    name: 'Manage Students',
    path: routes.STAFF_COURSES.MANAGE_STUDENTS,
    Icon: PeopleIcon,
  },
  {
    id: '5',
    name: 'Manage Announcem...',
    path: routes.STAFF_COURSES.ANNOUNCEMENTS,
    Icon: CampaignIcon,
  },
];

export default data;
