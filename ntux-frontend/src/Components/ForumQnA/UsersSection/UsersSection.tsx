import { getLevelAndBadges } from 'common/utils';
import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from 'Store/Selector/admin';
import { selectActiveUsers, selectTopUsers } from 'Store/Selector/forum';
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

const Card = ({ user }: { user: any }) => {
  const getProfileImage = (_user: any) => {
    if (_user.currentAvatar?.imageUrl || _user.avatarImageUrl)
      return (
        <img src={_user.currentAvatar?.imageUrl || _user.avatarImageUrl} />
      );
    return _user.fullName.slice(0, 1);
  };
  const pointData = getLevelAndBadges(user.totalExps);

  return (
    <Link to={makePath(routes.PORTFOLIO.BASE, { userId: user.id })}>
      <UserCard>
        <div className="left-section">{getProfileImage(user)}</div>
        <div className="right-section">
          <div className="name">{user.fullName}</div>
          <div className="role">{user.jobRole || 'Student'}</div>
          <div className="level">Level {pointData.level}</div>
        </div>
      </UserCard>
    </Link>
  );
};

function UsersSection(): React.ReactElement {
  const topUsers = useSelector(selectTopUsers).slice(0, 5);
  const activeUsers = useSelector(selectActiveUsers).slice(0, 5);
  const allUsers = useSelector(selectAllUsers).slice(0, 5);

  return (
    <Container>
      <Title>Users</Title>
      <Subtitle>Find user to see their credibility and history</Subtitle>
      <Row>
        <TopTable>
          <div className="title">Most Active Users This Week</div>
          {activeUsers.map((item) => (
            <Card key={item.id} user={item} />
          ))}
        </TopTable>
        <TopTable>
          <div className="title">Top Users All Time</div>
          {topUsers.map((item) => (
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
        {allUsers.map((item) => (
          <Card key={item.id} user={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(UsersSection);
