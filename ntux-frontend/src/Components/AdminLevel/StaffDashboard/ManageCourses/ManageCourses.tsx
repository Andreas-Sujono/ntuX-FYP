import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import { CourseCard as LPCourseCard } from '../../../LandingPage/Homepage/ExploreCourses/Styles';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../Routes';
import { makePath } from 'common/utils';

export const CourseCard = () => {
  const history = useHistory();
  const cousePath = makePath(routes.COURSES.BASE, { courseId: 1 });
  return (
    <LPCourseCard
      onClick={() => history.push(cousePath)}
      style={{ maxWidth: '350px' }}
    >
      <img src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg" />
      <div className="details" style={{ padding: '1.1rem' }}>
        <div className="name">EE017: Computer Networking I</div>
        <div className="hours">16 Hours</div>
        <div className="batch" style={{ color: 'green' }}>
          Open Registration
        </div>
      </div>
    </LPCourseCard>
  );
};

export default function ManageCourses() {
  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 6, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            label="Search Courses"
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
            Create New Course
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              // justifyContent: 'space-between',
              columnGap: '1rem',
              rowGap: '1rem',
            }}
          >
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
