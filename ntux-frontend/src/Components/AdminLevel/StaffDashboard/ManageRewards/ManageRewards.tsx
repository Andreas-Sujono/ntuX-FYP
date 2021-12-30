import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRewards } from 'Store/Actions/admin';
import { selectAllRewards } from 'Store/Selector/admin';

export default function ManageRewards() {
  const dispatch = useDispatch();
  const allRewards = useSelector(selectAllRewards);

  useEffect(() => {
    dispatch(getAllRewards());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}>
      <Paper sx={{ p: 2, minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Rewards"
              id="fullWidth"
              sx={{ backgroundColor: 'white' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="Search" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" sx={{ mt: 1 }} fullWidth>
              Create New Reward
            </Button>
          </Grid>
        </Grid>

        <Table data={allRewards} />
      </Paper>
    </Container>
  );
}
