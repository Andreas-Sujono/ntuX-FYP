import React, { memo } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import UserTable from '../../ManageUsers/Table';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';

function LatestUsers({ data }: any) {
  const history = useHistory();
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500, mb: 4 }}>
        Latest Users{' '}
        <Button onClick={() => history.push(routes.STAFF.MANAGE_USERS)}>
          See More
        </Button>
      </Typography>
      <UserTable data={data.slice(0, 5)} />
    </Paper>
  );
}

export default memo(LatestUsers);
