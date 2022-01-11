import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';
import { selectCourseAnnouncementsById } from 'Store/Selector/courses';
import { CourseAnnouncement } from 'Models/Courses';

export default function AnnouncementsContent() {
  const match: any = useRouteMatch(routes.COURSES.BASE) || {};

  if (match?.params?.courseId === ':courseId' || !match?.params?.courseId)
    match.params = { courseId: null };

  const allCourseAnnouncementsById =
    useSelector(selectCourseAnnouncementsById) || {};
  const courseAnnouncements: CourseAnnouncement[] =
    allCourseAnnouncementsById[match?.params?.courseId] || [];

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 6, ml: 1, mr: 1 }}>
      <Grid container sx={{ pr: 2 }}>
        {courseAnnouncements.map((item) => (
          <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'} key={item.id}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography variant="h6">{item.metadata.title}</Typography>
              <Divider />
              <Typography
                variant="body1"
                sx={{ mt: 2, whiteSpace: 'pre-line' }}
              >
                {item.metadata.description}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">
              If you have any question, you can visit the forum discussion
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Visit forum discussion{' '}
              <Link to={routes.FORUM.QUESTIONS} style={{ color: 'blue' }}>
                here
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
