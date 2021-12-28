import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TopBox, FeatureBox } from './Styles';
import { Typography } from '@mui/material';
import { CourseCard } from '../MyCourses/MyCourses';
import { LinkText } from 'common/Components/shared/shared';
import { HowToGetPoints } from '../PointsRewards/components';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth/general';
import { selectMyCourses } from 'Store/Selector/courses';
import { Link } from 'react-router-dom';
import { routes } from 'Components/Routes';

function DashboardContent() {
  const user = useSelector(selectUser);
  const myCourses = useSelector(selectMyCourses);

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBox>
            <Typography component="h3" variant="h5">
              Welcome back <strong>{user.fullName}!</strong>
            </Typography>
            <Typography
              component="h3"
              variant="h5"
              sx={{ mt: 1, color: '#C63044' }}
            >
              Your Points:&nbsp;
              <strong>
                {user.totalPoints} <small>pts</small>
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
        <Grid item xs={12} md={8} lg={8}>
          <Grid container spacing={3}>
            {myCourses.length > 0 && (
              <Grid item xs={12} sx={{ marginLeft: 0, mt: 1, mb: 1 }}>
                <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                  Your Courses
                </Typography>
                {myCourses.slice(0, 3).map((item) => (
                  <Grid item xs={12} sx={{ marginLeft: 0 }} key={item.id}>
                    <CourseCard
                      course={item.course}
                      courseBatch={item.courseBatch}
                    />
                  </Grid>
                ))}
                <LinkText style={{ marginTop: '0.5rem' }}>
                  <Link to={routes.ADMIN.MY_COURSES}>See All My Courses</Link>
                </LinkText>
              </Grid>
            )}

            <Grid item xs={12}>
              <FeatureBox>
                <Typography component="h3" variant="h6">
                  Forum Discussion
                </Typography>
                <Typography component="h3" variant="body1" sx={{ mt: 1 }}>
                  Have any doubt?, Ask any questions and answer somebody
                  question.&nbsp; Be active and earn more points.&nbsp;
                  <LinkText>
                    <Link to={routes.FORUM.QUESTIONS}>
                      <strong>visit Forum Discussion</strong>
                    </Link>
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
                  Have any difficulties in your learning, find a tutor or be a
                  tutor to earn more points,&nbsp;
                  <LinkText>
                    <Link to={routes.ADMIN.STUDENT_TUTORING}>
                      <strong> visit Student Tutoring</strong>
                    </Link>
                  </LinkText>
                </Typography>
              </FeatureBox>
            </Grid>
            <Grid item xs={12}>
              <FeatureBox>
                <Typography component="h3" variant="h6">
                  Portfolio Site
                </Typography>
                <Typography component="h3" variant="body1" sx={{ mt: 1 }}>
                  Showcase your experience and build your own page. You can show
                  this to the future employer.&nbsp;
                  <LinkText>
                    <Link to={routes.ADMIN.PORTFOLIO}>
                      <strong> visit Portfolio Site</strong>
                    </Link>
                  </LinkText>
                </Typography>
              </FeatureBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ ml: 0 }}>
          <HowToGetPoints limit={5} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContent;
