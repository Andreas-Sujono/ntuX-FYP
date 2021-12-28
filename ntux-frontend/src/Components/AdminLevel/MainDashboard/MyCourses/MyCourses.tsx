import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import { LinearProgressWithLabel } from './Styles';
import { CourseCard as LPCourseCard } from '../../../LandingPage/Homepage/ExploreCourses/Styles';
import { LinkText } from 'common/Components/shared/shared';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../Routes';
import { makePath, searchFromListOfObject } from 'common/utils';
import { Course, CourseBatch } from 'Models/Courses';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMyCourses,
  selectRecommendationCourses,
} from 'Store/Selector/courses';
import { getRecommendationCourses } from 'Store/Actions/courses';

export const CourseCard = ({
  course,
  courseBatch,
}: {
  course: Course;
  courseBatch: CourseBatch;
}) => {
  course = course || {};
  courseBatch = courseBatch || {};
  const history = useHistory();
  const cousePath = makePath(routes.COURSES.BASE, { courseId: 1 });

  const getDateString = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return `${moment(startDate).format('DD MMMM YYYY')} - ${moment(
      endDate,
    ).format('DD MMMM YYYY')}`;
  };

  const getProgressPercentage = () => {
    const now = new Date();
    if (now < courseBatch.startDate) return 0;
    if (now > courseBatch.endDate) return 100;

    const totalTime =
      new Date(courseBatch.endDate).getTime() -
      new Date(courseBatch.startDate).getTime();
    const nowDiff = now.getTime() - new Date(courseBatch.startDate).getTime();

    return (totalTime - nowDiff) / (totalTime * 100);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        marginLeft: 0,
        cursor: 'pointer',
      }}
      onClick={() => history.push(cousePath)}
    >
      <Grid item xs={12} md={4} lg={4} sx={{ maxHeight: '150px' }}>
        <img
          src={course?.imageUrl}
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
            {course.code}: {course.name}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ mt: 0.6 }}
            color="text.secondary"
          >
            {getDateString(courseBatch?.startDate, courseBatch?.endDate)}
          </Typography>
          <LinearProgressWithLabel
            variant="determinate"
            value={getProgressPercentage()}
            sx={{ mt: 2 }}
          />
          <LinkText>See Content</LinkText>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function MyCourses() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const ref = useRef<any>(null);
  const history = useHistory();

  const myCourses = useSelector(selectMyCourses);
  const recommendationCourses = useSelector(selectRecommendationCourses);

  useEffect(() => {
    dispatch(getRecommendationCourses());
  }, []);

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(
        myCourses,
        ['course.name', 'course.code'],
        value,
      );
      setSearchResult(result);
      console.log(value, result);
      ref.current = null;
    }, 100);
  };

  const final = searchInput ? searchResult : myCourses;

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search My Courses"
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
            value={searchInput}
            onChange={onChange}
          />
        </Grid>

        {final.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" component="div" color="text.tertiary">
              No Data
            </Typography>
          </Grid>
        )}
        {final.map((item) => (
          <Grid item xs={12} lg={6} key={item.id}>
            <CourseCard course={item.course} courseBatch={item.courseBatch} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" mt={7} sx={{ fontWeight: '500' }}>
        Recommended Courses
      </Typography>
      <Grid container spacing={3} mt={1}>
        {recommendationCourses.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={item.id}
            onClick={() =>
              history.push(makePath(routes.LP_COURSE, { courseId: item.id }))
            }
          >
            <LPCourseCard>
              <img src={item.imageUrl} />
              <div className="details">
                <div className="name">
                  {item.code}: {item.name}
                </div>
                <div className="hours">{item.totalHours} Hours</div>
              </div>
            </LPCourseCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
