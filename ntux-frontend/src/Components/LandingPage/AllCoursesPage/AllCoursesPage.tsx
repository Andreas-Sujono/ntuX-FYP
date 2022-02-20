import React, { memo, useState, useRef } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PageContentContainer } from 'Components/shared/Shared.styles';
import { useSelector } from 'react-redux';
import { selectPublicCourses } from 'Store/Selector/courses';
import moment from 'moment';
import {
  CourseCard,
  CoursesContainer,
} from '../Homepage/ExploreCourses/Styles';
import { Link } from 'react-router-dom';
import { makePath, searchFromListOfObject } from 'common/utils';
import { routes } from 'Components/Routes';

function AllCoursesPage(): React.ReactElement {
  const [searchInput, setSearchInput] = useState('');
  const [searchRes, setSearchRes] = useState<any>([]);
  const ref = useRef<any>(null);

  const courses = useSelector(selectPublicCourses);

  courses.forEach((course) => {
    course?.courseBatches?.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  });

  const getBatchString = (item: any) => {
    const batch = item?.courseBatches?.[0];
    if (!batch) return '';
    return `${moment(batch.startDate).format('DD MMMM YYYY')} - ${moment(
      batch.endDate,
    ).format('DD MMMM YYYY')}`;
  };

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(courses, ['name', 'code'], value);
      setSearchRes(result);
      ref.current = null;
    }, 100);
  };

  const final = searchInput ? searchRes : courses;

  return (
    <PageContentContainer>
      <Grid container spacing={3} sx={{ mb: 4, mt: 8, minHeight: '60vh' }}>
        <Grid item xs={12} md={6}>
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
            value={searchInput}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CoursesContainer style={{ marginTop: 0 }}>
            {final.map((item: any) => (
              <CourseCard
                // onClick={() => {
                //   history.push(makePath(routes.LP_COURSE, { courseId: item.id }));
                // }}
                key={item.id}
              >
                <Link to={makePath(routes.LP_COURSE, { courseId: item.id })}>
                  <img src={item.imageUrl || '#'} />
                  <div className="details">
                    <div className="name">{item.name}</div>
                    {item.totalHours && (
                      <div className="hours">{item.totalHours} Hours</div>
                    )}
                    <div className="batch">
                      Next Batch: <strong>{getBatchString(item)}</strong>
                    </div>
                  </div>
                </Link>
              </CourseCard>
            ))}
            {final.length === 0 && (
              <Typography variant="h6" color="textSecondary" align="center">
                No Courses
              </Typography>
            )}
          </CoursesContainer>
        </Grid>
      </Grid>
    </PageContentContainer>
  );
}

export default memo(AllCoursesPage);
