import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorBlock from '../../../../common/Components/AuthorBlock';
import { BlogPreview } from '../../../../Models/Blog';
import { makePath, routes } from '../../../Routes';
import { Container, LeftSection, RightSection } from './Styles';

function BlogCard({ blog }: { blog: BlogPreview }): React.ReactElement {
  const history = useHistory();
  const blogPath = makePath(routes.BLOG.EACH_BLOG, { blogId: blog.id });

  return (
    <Container onClick={() => history.push(blogPath)}>
      <LeftSection>
        <div className="blog-title">{blog.title}</div>
        <div className="blog-description">{blog.shortDescription}</div>

        <div className="blog-row">
          <div className="blog-posted">{blog.postedDate.toDateString()}</div>
          <AuthorBlock author={blog.author} />
        </div>
      </LeftSection>
      <RightSection>
        <img src={blog.thumbnail} />
      </RightSection>
    </Container>
  );
}

export default memo(BlogCard);
