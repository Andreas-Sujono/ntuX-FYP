import React, { memo } from 'react';
import { Container, CoursesContainer, Title, CourseCard } from './Styles';

const ExploreCourses: React.FC = () => {
  return (
    <Container>
      <Title>Available Courses</Title>
      <CoursesContainer>
        <CourseCard>
          <img src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg" />
          <div className="details">
            <div className="name">EE017: Computer Networking I</div>
            <div className="hours">16 Hours</div>
            <div className="batch">
              Next Batch: <strong>20 September 2021 - 30 September 2021</strong>
            </div>
          </div>
        </CourseCard>
        <CourseCard>
          <img src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg" />
          <div className="details">
            <div className="name">EE017: Computer Networking I</div>
            <div className="hours">16 Hours</div>
            <div className="batch">
              Next Batch: <strong>20 September 2021 - 30 September 2021</strong>
            </div>
          </div>
        </CourseCard>
      </CoursesContainer>
    </Container>
  );
};

export default memo(ExploreCourses);
