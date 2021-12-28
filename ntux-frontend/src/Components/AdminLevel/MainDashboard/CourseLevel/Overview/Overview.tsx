import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { Typography, Paper, Divider, CardHeader, Avatar } from '@mui/material';
import { TopGrid } from './Styles';
import { red } from '@mui/material/colors';
import { useRouteMatch } from 'react-router-dom';
import { selectCourseRegisteredById } from 'Store/Selector/courses';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';

export default function OverviewContent() {
  const match: any = useRouteMatch(routes.COURSES.BASE) || {};

  if (match?.params?.courseId === ':courseId' || !match?.params?.courseId)
    match.params = { courseId: null };

  const allCourseDetailById = useSelector(selectCourseRegisteredById) || {};
  const course = allCourseDetailById[match?.params?.courseId] || {};

  const getDateString = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return `${moment(startDate).format('DD MMMM YYYY')} - ${moment(
      endDate,
    ).format('DD MMMM YYYY')}`;
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
      <Grid container sx={{ pr: 2 }}>
        <TopGrid container spacing={3} maxWidth={'lg'} sx={{}}>
          <Grid item xs={12} md={5}>
            <img
              src={course.imageUrl}
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography variant="h5">
                {course.code}: {course.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                {getDateString(
                  course.courseBatch?.startDate,
                  course.courseBatch?.endDate,
                )}
              </Typography>
            </Paper>
          </Grid>
        </TopGrid>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">About</Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {course.description}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Objectives
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {course.objectives}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Outlines
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {course.outline}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Lecturers
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {course?.lecturers?.map((lecturer: any) => (
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {lecturer.fullName.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={lecturer.fullName}
                  subheader="Lecturer"
                  size="large"
                  key={lecturer.id}
                />
              ))}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
