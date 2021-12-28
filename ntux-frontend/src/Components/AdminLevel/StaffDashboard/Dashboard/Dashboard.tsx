/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import UsersChart from './components/UsersChart';
import WebsiteTraffic from './components/WebsiteTraffic';
import { StyledBox } from './Styles';
import PopularCourses from './components/PopularCourses';
import LatestUsers from './components/LatestUsers';
import {
  selectAllCourses,
  selectAllUsers,
  selectSummary,
  selectWebsiteActivitiesByInterval,
} from 'Store/Selector/admin';
import { useSelector } from 'react-redux';

function DashboardContent() {
  const [interval, setInterval] = useState<'d' | 'w' | 'm'>('d');
  const summary = useSelector(selectSummary);
  const allCourses = useSelector(selectAllCourses);
  const allUsers = useSelector(selectAllUsers);
  const websiteActivity = useSelector(selectWebsiteActivitiesByInterval)(
    interval,
  );

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={7}>
          <WebsiteTraffic data={websiteActivity} interval={interval} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <UsersChart data={summary} />
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
                  {allCourses.length}
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
                  {summary.totalQuestions} / {summary.totalAnswers}
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
                  {summary.totalTutors}
                </Typography>
              </StyledBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PopularCourses data={allCourses} />
        </Grid>
        <Grid item xs={12}>
          <LatestUsers data={allUsers} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContent;
