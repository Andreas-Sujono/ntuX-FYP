import React, { useEffect, useState } from 'react';
import {
  matchPath,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import queryString from 'query-string';
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
  ProfileButton,
} from './Styles';
import data from './sidebarData';
import ArrowIcon from '@mui/icons-material/ArrowBack';
import { routeData } from '../../CourseLevel/data';
import { routes } from 'Components/Routes';
import { makePath } from 'common/utils';
import { useSelector } from 'react-redux';
import {
  getCourseAnnouncements,
  getCourseContents,
  getOneCourseRegistered,
} from 'Store/Actions/courses';
import { selectUser } from 'Store/Selector/auth';
import {
  selectCourseContentById,
  selectCourseRegisteredById,
} from 'Store/Selector/courses';
import { CourseContent } from 'Models/Courses';
import { useThunkDispatch } from 'common/hooks';
import { LoadingBar } from 'common/Components/LoadingBar/FullPageLoadingBar';

const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/full-colored-logo.svg`;

const defaultContents = [
  {
    id: 101,
    name: 'Lesson 1',
  },
];

function MainContainer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(window.innerWidth < 550 ? false : true);
  const [loading, setLoading] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const history = useHistory();
  const dispatch = useThunkDispatch();
  const match: any = useRouteMatch(routes.COURSES.BASE) || {};

  if (match?.params?.courseId === ':courseId' || !match?.params?.courseId)
    match.params = { courseId: null };

  const user = useSelector(selectUser);
  const allCourseDetailById = useSelector(selectCourseRegisteredById) || {};
  const allCourseContentsById = useSelector(selectCourseContentById) || {};
  const course = allCourseDetailById[match?.params?.courseId] || {};
  const courseContents: CourseContent[] =
    allCourseContentsById[match?.params?.courseId] || [];

  const firstCourseContentPageId =
    courseContents[0]?.pageId || defaultContents[0].id;

  const [routeDetails, setRouteDetails] = useState<typeof routeData[0]>(
    routeData[0],
  );
  const { pageId: courseContentPageId } = queryString.parse(location.search);

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

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setLoading(true);
    await Promise.all([
      dispatch(getOneCourseRegistered(match.params.courseId)),
      dispatch(getCourseContents(match.params.courseId)),
      dispatch(getCourseAnnouncements(match.params.courseId)),
    ]);
    setLoading(false);
  };

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
            {course.code}: {course.name}
          </Typography>
          <ProfileButton>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {user?.fullName?.charAt(0)?.toUpperCase()}
                </Avatar>
              }
              title={user?.fullName}
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
        <DrawerList>
          <ListItemButton
            selected={false}
            onClick={() => {
              history.push(routes.ADMIN.BASE);
              if (window.innerWidth < 550) {
                setOpen(false);
              }
            }}
          >
            <ListItemIcon>
              <ArrowIcon sx={{ fontSize: '1rem', color: '#47A1F4' }} />
            </ListItemIcon>
            <ListItemText
              primary={'Go Back to Dashboard'}
              sx={{ fontSize: '0.6rem !important', color: '#47A1F4', ml: -2 }}
            />
          </ListItemButton>
        </DrawerList>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <DrawerList key={item.id}>
              <ListItemButton
                selected={routeDetails.id === item.id && item.id !== '2'}
                onClick={() => {
                  history.push(
                    makePath(
                      item.path,
                      match?.params || {},
                      undefined,
                      item.id === '2'
                        ? {
                            pageId: firstCourseContentPageId,
                          }
                        : {},
                    ),
                  );
                  if (window.innerWidth < 550) {
                    setOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <item.Icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </DrawerList>

            {item.id === '2' &&
              courseContents.map((item2) => (
                //course content
                <ListItemButton
                  key={item2.id}
                  selected={String(item2.id) === courseContentPageId}
                  onClick={() => {
                    history.push(
                      makePath(
                        item.path,
                        match?.params || {},
                        undefined,
                        item.id === '2'
                          ? {
                              pageId: item2.id,
                            }
                          : {},
                      ),
                    );
                    if (window.innerWidth < 550) {
                      setOpen(false);
                    }
                  }}
                  sx={{ flexGrow: 0, pl: 12 }}
                >
                  <ListItemText primary={item2.pageName} />
                </ListItemButton>
              ))}
          </React.Fragment>
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
            {loading && <LoadingBar height="70vh" />}
            {!loading && children}
          </Container>
        </div>
      </Box>
    </BoxContainer>
  );
}

export default MainContainer;
