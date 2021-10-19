import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { Link } from 'react-router-dom';
import { ForumUser } from '../../../Models/Forum';
import { mockForumUsers } from '../../../Models/mockData';
import { makePath, routes } from '../../Routes';
import {
  Container,
  Title,
  Subtitle,
  Row,
  TopTable,
  SearchBarContainer,
  CardsContainer,
  UserCard,
} from './Styles';

const Card = ({ user }: { user: ForumUser }) => {
  const getProfileImage = (_user: ForumUser) => {
    if (_user.profileImage) return <img src={_user.profileImage} />;
    return _user.fullName.slice(0, 1);
  };

  return (
    <Link to={makePath(routes.PORTFOLIO.BASE, { userId: user.id })}>
      <UserCard>
        <div className="left-section">{getProfileImage(user)}</div>
        <div className="right-section">
          <div className="name">{user.fullName}</div>
          <div className="role">{user.role}</div>
          <div className="level">Level {user.level}</div>
        </div>
      </UserCard>
    </Link>
  );
};

function UsersSection(): React.ReactElement {
  const topUsersWeekly = mockForumUsers.slice(0, 3);
  const topUsersAllTime = mockForumUsers.slice(0, 3);

  return (
    <Container>
      <Title>Users</Title>
      <Subtitle>Find user to see their credibility and history</Subtitle>
      <Row>
        <TopTable>
          <div className="title">Top Users This Week</div>
          {topUsersWeekly.map((item) => (
            <Card key={item.id} user={item} />
          ))}
        </TopTable>
        <TopTable>
          <div className="title">Top Users All Time</div>
          {topUsersAllTime.map((item) => (
            <Card key={item.id} user={item} />
          ))}
        </TopTable>
      </Row>
      <SearchBarContainer>
        <SearchBar
          value=""
          onChange={() => null}
          width="100%"
          placeholder="Search for Users"
        />
      </SearchBarContainer>
      <CardsContainer>
        {mockForumUsers.map((item) => (
          <Card key={item.id} user={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(UsersSection);
