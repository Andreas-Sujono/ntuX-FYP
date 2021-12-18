import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Link, Typography } from '@mui/material';
import { LinearProgressWithLabel } from './Styles';
import { CourseCard as LPCourseCard } from '../../../LandingPage/Homepage/ExploreCourses/Styles';
import { LinkText } from 'common/Components/shared/shared';

export const CourseCard = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{ backgroundColor: 'white', borderRadius: '8px', marginLeft: 0 }}
      // maxWidth={'md'}
    >
      <Grid item xs={12} md={4} lg={4} sx={{ maxHeight: '150px' }}>
        <img
          src="https://www.cisco.com/c/dam/assets/swa/img/anchor-info/what-is-network-security-blog-banner-628x353.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 0,
          }}
        >
          <Typography variant="h6" component="h2">
            EE0117: Computer Networking I
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ mt: 0.6 }}
            color="text.secondary"
          >
            20 Oct - 27 Oct 2021
          </Typography>
          <LinearProgressWithLabel
            variant="determinate"
            value={50}
            sx={{ mt: 2 }}
          />
          <LinkText>See Content</LinkText>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function MyCourses() {
  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search My Courses"
            id="fullWidth"
            sx={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CourseCard />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CourseCard />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CourseCard />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CourseCard />
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        component="h2"
        mt={10}
        sx={{ fontWeight: '500' }}
      >
        Recommended Courses
      </Typography>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} lg={6}>
          <LPCourseCard>
            <img src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg" />
            <div className="details">
              <div className="name">EE017: Computer Networking I</div>
              <div className="hours">16 Hours</div>
              <div className="batch">
                Next Batch:{' '}
                <strong>20 September 2021 - 30 September 2021</strong>
              </div>
            </div>
          </LPCourseCard>
        </Grid>
      </Grid>
    </Container>
  );
}
