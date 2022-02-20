import { makePath } from 'common/utils';
import { routes } from 'Components/Routes';
import { Course } from 'Models/Courses';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import { getPublicCourses } from 'Store/Actions/courses';
import { selectPublicCourses } from 'Store/Selector/courses';
import { Container, CoursesContainer, Title, CourseCard } from './Styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ExploreCourses: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const courses = useSelector(selectPublicCourses).slice(0, 6);

  courses.forEach((course) => {
    course?.courseBatches?.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  });

  const getBatchString = (item: Course) => {
    const batch = item?.courseBatches?.[0];
    if (!batch) return '';
    return `${moment(batch.startDate).format('DD MMMM YYYY')} - ${moment(
      batch.endDate,
    ).format('DD MMMM YYYY')}`;
  };

  return (
    <Container id="explore-courses">
      <Title>
        Available Courses
        <Link to={routes.ALL_COURSES}>
          <Button sx={{ ml: 4, float: 'right' }} variant="contained">
            See All Courses
          </Button>
        </Link>
      </Title>
      <CoursesContainer>
        {courses.map((item: Course) => (
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
      </CoursesContainer>
    </Container>
  );
};

export default memo(ExploreCourses);
