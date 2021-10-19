import React, { Suspense, memo } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath,
  Link,
} from 'react-router-dom';
import { LoadingBar } from 'react-dre/lib/LoadingBar';
import { routes } from 'Components/Routes';
import { routeData } from './data';
import { Container, SideNav } from './Styles';

const ProfileSettingLevelRoutes = () => {
  const location = useLocation();

  const isPathSame = (path: string) => {
    return matchPath(location.pathname, { path, exact: true });
  };

  return (
    <Container>
      <Suspense
        fallback={
          <LoadingBar
            width="40px"
            styles={{
              containerStyle: {
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          />
        }
      >
        <Switch>
          {routeData.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to={routes.SETTINGS.PROFILE.BASE} />;
        </Switch>
      </Suspense>
      <SideNav>
        <div className="name">Settings</div>
        <hr />
        <ul>
          {routeData.map((item) => (
            <Link to={item.path} key={item.path}>
              <li className={isPathSame(item.path) ? 'active' : ''}>
                {item.details.name}
              </li>
            </Link>
          ))}
        </ul>
      </SideNav>
    </Container>
  );
};

export default memo(ProfileSettingLevelRoutes);
