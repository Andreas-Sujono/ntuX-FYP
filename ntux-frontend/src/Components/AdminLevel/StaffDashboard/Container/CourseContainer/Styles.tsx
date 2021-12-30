import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Container, List, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const BoxContainer = styled(Box)<any>`
  display: flex;

  .profile-card {
    .MuiCardHeader-title {
      font-size: 1rem;
      margin-left: -8px;
    }
  }
`;
export const LogoContainer = styled(Container)`
  width: 100%;
  cursor: pointer;
  img {
    max-height: 32px;
  }
`;

export const DrawerList = styled(List)`
  /* margin: 0.2rem 1.5rem; */
`;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#FFFFFF',
  color: theme.palette.text.primary,
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
  overflowX: 'hidden',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {}),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
      [theme.breakpoints.down('sm')]: {
        width: 0,
      },
    }),
  },
}));

export const ProfileButton = styled(ListItemButton)(({ theme }) => ({
  padding: 0,
  maxWidth: '250px',
  width: 'auto',
  flexGrow: 0,
  [theme.breakpoints.down('sm')]: {
    '& .MuiCardHeader-root': {
      paddingRight: 0,
    },
    '& .MuiCardHeader-avatar': {
      marginRight: 0,
    },
    '& .MuiCardHeader-title': {
      display: 'none',
    },
  },
}));

export const ListButtonAddPage = styled(ListItemText)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#b5b5b5',
  '&:hover': {
    background: 'none',
  },
  cursor: 'pointer',
  display: 'flex',
}));

export const ListAddPage = styled(ListItemText)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#b5b5b5',
}));
