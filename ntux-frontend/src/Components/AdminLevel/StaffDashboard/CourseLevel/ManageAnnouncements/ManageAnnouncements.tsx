import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from './Table';
import { useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';
import { selectAllCourseAnnouncementsByCourseId } from 'Store/Selector/admin';

export default function ManageAnnouncements() {
  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allData = useSelector(selectAllCourseAnnouncementsByCourseId) || {};
  const data = allData[match?.params?.courseId] || [];

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}>
      <Paper sx={{ p: 2, minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Announcement by title"
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
              Create New Announcement
            </Button>
          </Grid>
        </Grid>

        <Table data={data} />
      </Paper>
    </Container>
  );
}
