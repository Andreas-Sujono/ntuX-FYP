import React, { memo } from 'react';
import { mockFeaturedMajors, mockMajors } from 'Models/mockData/courses';
import { Container, FeaturedMajorBox, MajorRow, MajorBox } from './Styles';

const StartLearning: React.FC = () => {
  return (
    <Container>
      <div className="title">Choose Your Major</div>
      <div className="subtitle">
        Choose your specialization and start your journey
      </div>
      {mockFeaturedMajors.map((item) => (
        <FeaturedMajorBox key={item.id}>
          <div className="details">
            <div className="name">{item.name}</div>
            <div className="course">
              <b>Related Course</b>
            </div>
            <ul>
              {item.relatedCourses.map((item2) => (
                <li key={item2}>{item2}</li>
              ))}
            </ul>
          </div>
          <img src={item.image} />
        </FeaturedMajorBox>
      ))}
      <MajorRow>
        {mockMajors.map((item) => (
          <MajorBox key={item.id}>
            <div className="name">{item.name}</div>
            <div className="coming-soon">Coming Soon</div>
          </MajorBox>
        ))}
      </MajorRow>
    </Container>
  );
};

export default memo(StartLearning);
