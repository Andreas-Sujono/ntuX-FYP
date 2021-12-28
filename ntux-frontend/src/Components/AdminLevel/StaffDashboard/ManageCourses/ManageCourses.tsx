import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import { CourseCard as LPCourseCard } from '../../../LandingPage/Homepage/ExploreCourses/Styles';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../Routes';
import { getCourseStatus, makePath } from 'common/utils';
import { useSelector } from 'react-redux';
import { selectAllCourses } from 'Store/Selector/admin';

export const CourseCard = ({ data }: any) => {
  const history = useHistory();
  const cousePath = makePath(routes.STAFF_COURSES.BASE, { courseId: 1 });
  return (
    <LPCourseCard
      onClick={() => history.push(cousePath)}
      style={{ maxWidth: '350px' }}
    >
      <img src={data.imageUrl} />
      <div className="details" style={{ padding: '1.1rem' }}>
        <div className="name">
          {data.code}: {data.name}
        </div>
        <div className="hours">{data.totalHours} Hours</div>
        <div className="batch" style={{ color: 'green' }}>
          {getCourseStatus([])}
        </div>
      </div>
    </LPCourseCard>
  );
};

export default function ManageCourses() {
  const allCourses = useSelector(selectAllCourses);
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
            {allCourses.map((item) => (
              <CourseCard key={item.id} data={item} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
