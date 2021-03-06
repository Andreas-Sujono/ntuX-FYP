import { Box, Pagination } from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { getLevelAndBadges } from 'common/utils';
import React, { memo, useRef } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from 'Store/Actions/forum';
import {
  selectActiveUsers,
  selectAllUsers,
  selectTopUsers,
} from 'Store/Selector/forum';
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
        <img
          src={
            _user.currentAvatar?.imageUrl ||
            _user.avatarImageUrl ||
            _user.profileImageUrl
          }
        />
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
  const allUsers = useSelector(selectAllUsers);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const [searchInput, setSearchInput] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ref = useRef<any>(null);
  const dispatch = useThunkDispatch();

  const onSearch = (value) => {
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(async () => {
      await dispatch(getAllUsers(value));
      ref.current = null;
    }, 200);
  };

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
          value={searchInput}
          onChange={onSearch}
          width="100%"
          placeholder="Search for Users"
        />
      </SearchBarContainer>
      <CardsContainer>
        {allUsers
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage,
          )
          .map((item) => (
            <Card key={item.id} user={item} />
          ))}
      </CardsContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.floor(allUsers.length / rowsPerPage) + 1}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Container>
  );
}

export default memo(UsersSection);
