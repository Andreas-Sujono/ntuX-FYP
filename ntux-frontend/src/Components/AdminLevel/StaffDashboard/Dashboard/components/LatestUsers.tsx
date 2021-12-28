import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import UserTable from '../../ManageUsers/Table';

function LatestUsers({ data }: any) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500, mb: 4 }}>
        Latest Users <Button>See More</Button>
      </Typography>
      <UserTable data={data.slice(0, 5)} />
    </Paper>
  );
}

export default LatestUsers;
