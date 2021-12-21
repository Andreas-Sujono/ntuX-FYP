import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import UsersChart from './components/UsersChart';
import WebsiteTraffic from './components/WebsiteTraffic';
import { StyledBox } from './Styles';
import PopularCourses from './components/PopularCourses';
import LatestUsers from './components/LatestUsers';

function DashboardContent() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={7}>
          <WebsiteTraffic />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <UsersChart />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledBox>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 400 }}
                  color="text.secondary"
                >
                  Total Courses
                </Typography>
                <Typography variant="h3" component="h2">
                  2
                </Typography>
              </StyledBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledBox>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 400 }}
                  color="text.secondary"
                >
                  Total Question Asked / Solution Answered
                </Typography>
                <Typography variant="h3" component="h2">
                  2 / 5
                </Typography>
              </StyledBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledBox>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 400 }}
                  color="text.secondary"
                >
                  Total Tutors
                </Typography>
                <Typography variant="h3" component="h2">
                  10
                </Typography>
              </StyledBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PopularCourses />
        </Grid>
        <Grid item xs={12}>
          <LatestUsers />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContent;
