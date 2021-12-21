import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Button } from '@mui/material';
import UserTable from '../../ManageUsers/Table';

function LatestUsers() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500, mb: 4 }}>
        Latest Users <Button>See More</Button>
      </Typography>
      <UserTable />
    </Paper>
  );
}

export default LatestUsers;
