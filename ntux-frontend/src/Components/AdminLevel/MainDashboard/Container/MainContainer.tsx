import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { red } from '@mui/material/colors';
import { Avatar, CardHeader, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AppBar,
  Drawer,
  BoxContainer,
  DrawerList,
  LogoContainer,
} from './Styles';
import data from './sidebarData';
import { routeData } from '../data';
import { matchPath, useLocation } from 'react-router-dom';

const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/full-colored-logo.svg`;

function MainContainer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const [routeDetails, setRouteDetails] = useState<typeof routeData[0]>(
    routeData[0],
  );

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
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
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
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                A
              </Avatar>
            }
            title="Andreas Sujono"
            className="profile-card"
          />
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
          <LogoContainer>
            <img src={logoImagePath} alt="NTUX" />
          </LogoContainer>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        {data.map((item) => (
          <DrawerList key={item.id}>
            <ListItemButton selected={routeDetails.id === item.id}>
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
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
        <Container
          maxWidth="xl"
          sx={{ mt: 4, mb: 4, padding: 0, margin: '32px 0' }}
        >
          {children}
        </Container>
      </Box>
    </BoxContainer>
  );
}

export default MainContainer;
