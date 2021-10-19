import React, { memo, useEffect } from 'react';
import BlogDetail from './BlogDetail/BlogDetail';
import Recommendations from './Recommendations';
import AuthorDetail from './AuthorDetail';
import { Container } from './Styles';
import { Author } from '../../../Models/Blog';
import CommentSection from './CommentSection';

function BlogDetailPage(): React.ReactElement {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const author: Author = {
    id: '1',
    name: 'andreas',
    profileImage: '',
    description: 'sdssdsdsd',
  };

  return (
    <Container>
      <BlogDetail content="" author={author} />
      <AuthorDetail author={author} />
      <CommentSection />
      <Recommendations />
    </Container>
  );
}

export default memo(BlogDetailPage);
