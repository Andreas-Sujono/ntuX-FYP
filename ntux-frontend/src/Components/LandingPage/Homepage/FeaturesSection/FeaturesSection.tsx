import React, { memo } from 'react';
import {
  Overflow,
  FullWidthContainer,
  Container,
  Title,
  Row,
  LeftSection,
  RightSection,
  SkewBackground,
} from './Styles';

const { PUBLIC_URL } = process.env;
const data = [
  {
    title: 'Complete Syllabus',
    desc: 'Learn All aspect of software engineering from 0 to advance topic starting from Computer Science basic, Frontend, Backend Development, DevOps, and many more',
    imagePath: PUBLIC_URL + '/assets/LP/features1.svg',
  },
  {
    title: 'Create Your Portfolio Site',
    desc: 'Show your expertise, portfolio, projects, work experience, track records and your Blog and Forum contribution to please recruiter',
    imagePath: PUBLIC_URL + '/assets/LP/features4.svg',
  },
  {
    title: 'Interview Preparation',
    desc: 'Practice your Algorithm and data structure skills for your future job interview. ',
    imagePath: PUBLIC_URL + '/assets/LP/features2.svg',
  },
  {
    title: 'Forum and Blog',
    desc: 'Build your track record by providing answer to the forum question and write blog to show and share your expertise to the others',
    imagePath: PUBLIC_URL + '/assets/LP/features3.svg',
  },
];

type DataItem = typeof data[0];

const FeaturesSection: React.FC = () => {
  return (
    <Overflow>
      <FullWidthContainer className="dt-bprimary dt-tprimary">
        <Container>
          <Title>What We Offer</Title>
          <SkewBackground />

          {data.map((item: DataItem, idx) =>
            idx % 2 === 0 || window.innerWidth < 568 ? (
              <Row key={item.title}>
                <LeftSection isFirst={idx === 0}>
                  <div className="feature-title dt-tprimary">{item.title}</div>
                  <div className="feature-desc dt-secondary">{item.desc}</div>
                </LeftSection>
                <RightSection>
                  <img src={item.imagePath} />
                </RightSection>
              </Row>
            ) : (
              <Row key={item.title}>
                <RightSection>
                  <img src={item.imagePath} />
                </RightSection>
                <LeftSection>
                  <div className="feature-title dt-tprimary">{item.title}</div>
                  <div className="feature-desc dt-secondary">{item.desc}</div>
                </LeftSection>
              </Row>
            ),
          )}
        </Container>
      </FullWidthContainer>
    </Overflow>
  );
};

export default memo(FeaturesSection);
