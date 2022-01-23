import React, { useEffect, useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { red } from '@mui/material/colors';
import {
  Avatar,
  CardHeader,
  ListItemButton,
  Badge,
  Popover,
  List,
  ListItem,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AppBar,
  Drawer,
  BoxContainer,
  DrawerList,
  LogoContainer,
  ProfileButton,
} from './Styles';
import data from './sidebarData';
import { routeData } from '../../data';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
import { useThunkDispatch } from 'common/hooks';
import { selectNotifications } from 'Store/Selector/pointsRewards';
import { viewNotifications } from 'Store/Actions/pointsRewards';

const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/full-colored-logo.svg`;

function MainContainer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(window.innerWidth < 550 ? false : true);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const dispatch = useThunkDispatch();

  const notifications = useSelector(selectNotifications);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (event.currentTarget) {
      if (notifications.filter((item) => !item.isViewed).length)
        dispatch(viewNotifications());
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = anchorEl ? 'simple-popover' : undefined;

  const location = useLocation();
  const history = useHistory();
  const [routeDetails, setRouteDetails] = useState<typeof routeData[0]>(
    routeData[0],
  );

  const user = useSelector(selectUser);

  useEffect(() => {
    const pathname = location.pathname;
    let currentRoute = routeData.filter((item) =>
      matchPath(pathname, { path: item.path, exact: true }),
    );
    if (!currentRoute.length) {
      currentRoute = routeData
        .filter((item) =>
          matchPath(pathname, { path: item.path, exact: false }),
        )
        .slice(1);
    }

    setRouteDetails(currentRoute.length ? currentRoute[0] : routeData[0]);
  }, [location.pathname]);

  return (
    <BoxContainer>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={
            {
              // pr: '24px', // keep right padding when drawer closed
            }
          }
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, minWidth: '120px' }}
          >
            {routeDetails.details?.title}
          </Typography>
          <div>
            <IconButton
              sx={{ mr: 2 }}
              onClick={handleClick}
              aria-describedby={id}
            >
              <Badge
                color="primary"
                badgeContent={
                  notifications.filter((item) => !item.isViewed).length
                }
                max={49}
              >
                <MailIcon />
              </Badge>
            </IconButton>
          </div>
          <Popover
            id={id}
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <List sx={{ width: '320px', maxHeight: '450px', overflow: 'auto' }}>
              {notifications.map((item) => (
                <ListItem disablePadding key={item.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              {notifications.length === 0 && (
                <ListItem>
                  <Typography variant="body1" color="text.secondary">
                    No Notifications
                  </Typography>
                </ListItem>
              )}
            </List>
          </Popover>
          <ProfileButton onClick={() => history.push(routes.STAFF.SETTINGS)}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  alt={user.fullName}
                  src={user.profileImageUrl || ''}
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={user.fullName}
              // subheader="admin"
              className="profile-card"
              sx={{
                width: 'auto',
                maxWidth: '250px',
                marginLeft: 'auto',
              }}
            />
          </ProfileButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            marginBottom: '2rem',
          }}
        >
          <LogoContainer onClick={() => history.push(routes.LP_HOMEPAGE)}>
            <img src={logoImagePath} alt="NTUX" />
          </LogoContainer>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        {data.map((item) => (
          <DrawerList key={item.id}>
            <ListItemButton
              selected={routeDetails.id === item.id}
              onClick={() => {
                history.push(item.path);
                if (window.innerWidth < 550) {
                  setOpen(false);
                }
              }}
            >
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.getName(user?.role) || item.name} />
            </ListItemButton>
          </DrawerList>
        ))}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <div style={{ minWidth: '300px', overflowX: 'hidden' }}>
          <Container
            sx={{ m: 0, p: 0, padding: 0, paddingLeft: 0 }}
            style={{ padding: 0, maxWidth: '100%' }}
          >
            {children}
          </Container>
        </div>
      </Box>
    </BoxContainer>
  );
}

export default MainContainer;
