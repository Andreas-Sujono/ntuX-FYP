import React, { memo } from 'react';
import {
  FullWidthContainer,
  Container,
  Title,
  Row,
  Card,
  AndMoreText,
} from './Styles';

const { PUBLIC_URL } = process.env;
const data = [
  {
    title: 'Video Courses & Tutorial',
    iconPath: PUBLIC_URL + '/assets/LP/features1.svg',
  },
  {
    title: 'Interview Preparation',
    iconPath: PUBLIC_URL + '/assets/LP/features2.svg',
  },
  {
    title: 'Portfolio Site',
    iconPath: PUBLIC_URL + '/assets/LP/features4.svg',
  },
  // {
  //   title: 'Books Recommendation & Review',
  //   iconPath: PUBLIC_URL + '/assets/LP/read-book.svg',
  // },
  {
    title: 'Freelance & Contract Projects',
    iconPath: PUBLIC_URL + '/assets/LP/read-book.svg',
  },
  {
    title: 'Job Portal',
    iconPath: PUBLIC_URL + '/assets/LP/resume.svg',
  },
  {
    title: 'Free & Paid Events',
    iconPath: PUBLIC_URL + '/assets/LP/video.svg',
  },
  {
    title: 'Blogs',
    iconPath: PUBLIC_URL + '/assets/LP/write-blog.svg',
  },
  {
    title: 'Forum QnA',
    iconPath: PUBLIC_URL + '/assets/LP/features3.svg',
  },
];

type DataItem = typeof data[0];

const FeaturesSummary: React.FC = () => {
  return (
    <FullWidthContainer className="dt-bsecondary dt-tprimary">
      <Container>
        <Title>All in One Platform</Title>
        <Row>
          {data.map((item: DataItem) => (
            <Card key={item.title}>
              <img src={item.iconPath} alt={item.title} />
              {item.title}
            </Card>
          ))}
        </Row>
        <AndMoreText>And More...</AndMoreText>
      </Container>
    </FullWidthContainer>
  );
};

export default memo(FeaturesSummary);
