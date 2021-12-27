import { makePath } from 'common/utils';
import { routes } from 'Components/Routes';
import { Course } from 'Models/Courses';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getPublicCourses } from 'Store/Actions/courses';
import { selectPublicCourses } from 'Store/Selector/courses';
import { Container, CoursesContainer, Title, CourseCard } from './Styles';

const ExploreCourses: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const courses = useSelector(selectPublicCourses);

  useEffect(() => {
    dispatch(getPublicCourses());
  }, []);

  courses.forEach((course) => {
    course?.courseBatches?.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  });

  return (
    <Container id="explore-courses">
      <Title>Available Courses</Title>
      <CoursesContainer>
        {courses.map((item: Course) => (
          <CourseCard
            onClick={() =>
              history.push(makePath(routes.LP_COURSE, { courseId: item.id }))
            }
            key={item.id}
          >
            <img src={item.imageUrl || '#'} />
            <div className="details">
              <div className="name">{item.name}</div>
              {item.totalHours && (
                <div className="hours">{item.totalHours} Hours</div>
              )}
              <div className="batch">
                Next Batch:{' '}
                <strong>
                  {item?.courseBatches?.[0]?.startDate?.toLocaleDateString()} -{' '}
                  {item?.courseBatches?.[0]?.endDate?.toLocaleDateString()}
                </strong>
              </div>
            </div>
          </CourseCard>
        ))}
      </CoursesContainer>
    </Container>
  );
};

export default memo(ExploreCourses);
