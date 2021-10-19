import React, { memo } from 'react';
import { blogs } from '../../AllBlogsPage/mockData';
import BlogCard from '../../shared/BlogCard';
import { Container, Title, CardsContainer } from './Styles';

function Recommendations(): React.ReactElement {
  return (
    <Container className="cw-2">
      <Title>Similar Topic</Title>
      <CardsContainer>
        {blogs.map((item) => (
          <BlogCard blog={item} key={item.id} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(Recommendations);
