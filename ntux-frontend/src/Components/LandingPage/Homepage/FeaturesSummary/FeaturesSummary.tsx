import React, { memo } from 'react';
import { FullWidthContainer, Container, Title, Row, Card } from './Styles';

const { PUBLIC_URL } = process.env;
const data = [
  {
    title: 'Online Course',
    iconPath: PUBLIC_URL + '/assets/LP/feature1.svg',
  },
  {
    title: 'Forum Discussion',
    iconPath: PUBLIC_URL + '/assets/LP/feature4.svg',
  },
  {
    title: 'Student Tutoring',
    iconPath: PUBLIC_URL + '/assets/LP/feature2.svg',
  },
  {
    title: 'Portfolio Site',
    iconPath: PUBLIC_URL + '/assets/LP/feature3.svg',
  },
  {
    title: 'Points & Rewards',
    iconPath: PUBLIC_URL + '/assets/LP/feature5.svg',
  },
];

type DataItem = typeof data[0];

const FeaturesSummary: React.FC = () => {
  return (
    <FullWidthContainer className="w-bsecondary w-tprimary">
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
