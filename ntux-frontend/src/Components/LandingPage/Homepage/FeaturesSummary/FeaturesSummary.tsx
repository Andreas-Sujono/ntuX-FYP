import React, { memo } from 'react';
import { FullWidthContainer, Container, Title, Row, Card } from './Styles';

const { PUBLIC_URL } = process.env;
const data = [
  {
    title: 'Online Course',
    iconPath: PUBLIC_URL + '/assets/LP/features1.svg',
  },
  {
    title: 'Forum Discussion',
    iconPath: PUBLIC_URL + '/assets/LP/features3.svg',
  },
  {
    title: 'Student Tutoring',
    iconPath: PUBLIC_URL + '/assets/LP/read-book.svg',
  },
  {
    title: 'Portfolio Site',
    iconPath: PUBLIC_URL + '/assets/LP/features4.svg',
  },
  {
    title: 'Points & Rewards',
    iconPath: PUBLIC_URL + '/assets/LP/resume.svg',
  },
];

type DataItem = typeof data[0];

const FeaturesSummary: React.FC = () => {
  return (
    <FullWidthContainer className="dt-bsecondary dt-tprimary">
      <Container>
        <Title>Our Features</Title>
        <Row>
          {data.map((item: DataItem) => (
            <Card key={item.title}>
              <img src={item.iconPath} alt={item.title} />
              {item.title}
            </Card>
          ))}
        </Row>
      </Container>
    </FullWidthContainer>
  );
};

export default memo(FeaturesSummary);
