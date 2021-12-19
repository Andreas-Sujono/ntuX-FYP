import { routes } from 'Components/Routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';

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
    name: 'Overview',
    path: routes.COURSES.OVERVIEW,
    Icon: DashboardIcon,
  },
  {
    id: '2',
    name: 'Content',
    path: routes.COURSES.COURSE_CONTENT,
    Icon: SchoolIcon,
  },
  {
    id: '3',
    name: 'Announcements',
    path: routes.COURSES.ANNOUNCEMENTS,
    Icon: CampaignIcon,
  },
];

export default data;
