/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { StyledBox } from './Styles';
import {
  selectAllStudentsByCourseId,
  selectCourseSummary,
} from 'Store/Selector/admin';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
import { Role } from 'Models/Auth';
import UsersChart from './components/UsersChart';
import { useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import UserTable from '../ManageStudents/Table';
import WebsiteTraffic from './components/WebsiteTraffic';

function DashboardContent() {
  const summary = useSelector(selectCourseSummary);
  const user = useSelector(selectUser);
  const ref = useRef<any>(null);

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };
  const courseId = match?.params?.courseId;

  const allData = useSelector(selectAllStudentsByCourseId) || {};
  const data = allData[courseId] || [];

  const dispatch = useDispatch();

  return (
    <Container
      maxWidth="xl"
      sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1, pb: 2 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <UsersChart data={summary} courseId={courseId} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <StyledBox>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 400 }}
                color="text.secondary"
              >
                Total User
              </Typography>
              <Typography variant="h3" component="h2">
                {summary.totalUser || 0}
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <StyledBox>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 400 }}
                color="text.secondary"
              >
                Total Batches
              </Typography>
              <Typography variant="h3" component="h2">
                {summary.totalBatch || 0}
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <StyledBox>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 400 }}
                color="text.secondary"
              >
                Total Announcements
              </Typography>
              <Typography variant="h3" component="h2">
                {summary.totalAnnouncements || 0}
              </Typography>
            </StyledBox>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <WebsiteTraffic courseId={courseId} />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 500, mb: 3, mt: 2 }}
            color="text.secondary"
          >
            Latest Student Registration
          </Typography>
          <UserTable data={data} max={10} courseId={courseId} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContent;
