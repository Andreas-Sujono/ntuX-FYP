import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TopBox, FeatureBox } from './Styles';
import { Typography } from '@mui/material';
import { CourseCard } from '../MyCourses/MyCourses';
import { LinkText } from 'common/Components/shared/shared';
import { HowToGetPoints } from '../PointsRewards/components';

function DashboardContent() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBox>
            <Typography component="h3" variant="h5">
              Welcome back <strong>Andreas Sujono!</strong>
            </Typography>
            <Typography
              component="h3"
              variant="h5"
              sx={{ mt: 1, color: '#C63044' }}
            >
              Your Points:&nbsp;
              <strong>
                0 <small>pts</small>
              </strong>
            </Typography>
            <Typography component="h3" variant="body1" sx={{ mt: 1 }}>
              Keep contributing to the community to earn more points
            </Typography>
            <img
              src={process.env.PUBLIC_URL + '/assets/studyIllustration.svg'}
              className="side-image"
            />
          </TopBox>
        </Grid>
        <Grid item xs={12} md={8} lg={8} maxWidth={'md'}>
          <Grid spacing={0} sx={{ marginLeft: 0, mt: 1 }}>
            <Grid item xs={12} sx={{ marginLeft: 0 }}>
              <CourseCard />
            </Grid>
            <Grid item xs={12} mt={2}>
              <CourseCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <HowToGetPoints />
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <FeatureBox>
            <Typography component="h3" variant="h6">
              Forum Discussion
            </Typography>
            <Typography component="h3" variant="body1" sx={{ mt: 1 }}>
              Be active and earn more points,{' '}
              <LinkText>
                <strong>visit Forum Discussion</strong>
              </LinkText>
            </Typography>
          </FeatureBox>
        </Grid>
        <Grid item xs={12}>
          <FeatureBox>
            <Typography component="h3" variant="h6">
              Student Tutoring
            </Typography>
            <Typography component="h3" variant="body1" sx={{ mt: 1 }}>
              Have difficulties in your learning, find a tutor and earn more
              points,&nbsp;
              <LinkText>
                <strong> visit Student Tutoring</strong>
              </LinkText>
            </Typography>
          </FeatureBox>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContent;
