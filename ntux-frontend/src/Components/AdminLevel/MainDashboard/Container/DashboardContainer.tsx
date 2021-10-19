import React, { memo, useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import ProfileImage from 'common/Components/ProfileImage';
import { mockUser } from 'Models/mockData';
import Sidebar from 'Components/AdminLevel/shared/Sidebar';
import sidebarData from './sidebarData';
import {
  Container,
  HeaderContainer,
  SidebarContainer,
  ContentRow,
  ContentContainer,
  UserDetails,
} from './Styles';
import { routeData } from '../data';

const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/full-colored-logo.svg`;

interface Props {
  children: React.ReactElement;
}

const DashboardContainer: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation();
  const [routeDetails, setRouteDetails] = useState<typeof routeData[0]>(
    routeData[0],
  );
  const user = mockUser;

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
    <Container>
      <HeaderContainer>
        <Link to="/">
          <img src={logoImagePath} className="logo" />
        </Link>
        <div className="title">{routeDetails.details.title}</div>
        <UserDetails>
          <ProfileImage name={user.fullName} image={user.profileImage} />
          <div>
            <div className="name">{user.fullName}</div>
            <div className="email">{user.email}</div>
          </div>
        </UserDetails>
      </HeaderContainer>
      <ContentRow>
        <SidebarContainer>
          <Sidebar items={sidebarData} activeId={routeDetails.id} />
        </SidebarContainer>
        <ContentContainer>{children}</ContentContainer>
      </ContentRow>
    </Container>
  );
};

export default memo(DashboardContainer);
