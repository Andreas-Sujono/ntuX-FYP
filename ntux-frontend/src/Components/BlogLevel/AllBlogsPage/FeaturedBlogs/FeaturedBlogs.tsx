import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorBlock from '../../../../common/Components/AuthorBlock';
import { makePath, routes } from '../../../Routes';
import { featuredBlogs } from '../mockData';
import {
  Container,
  LeftSection,
  RightSection,
  BlogCard,
  SideBlogCard,
} from './Styles';

function FeaturedBlogs(): React.ReactElement {
  const mainBlog = featuredBlogs[0];
  const otherBlogs = featuredBlogs.slice(1);
  const history = useHistory();
  const makeBlogPath = (id: any) =>
    makePath(routes.BLOG.EACH_BLOG, { blogId: id });

  return (
    <Container>
      <LeftSection>
        <BlogCard onClick={() => history.push(makeBlogPath(mainBlog.id))}>
          <div className="blog-title">{mainBlog.title}</div>
          <div className="blog-row">
            <div className="blog-posted">
              {mainBlog.postedDate.toDateString()}
            </div>

            <AuthorBlock author={mainBlog.author} />
          </div>
          <img src={mainBlog.thumbnail} />
        </BlogCard>
      </LeftSection>
      <RightSection>
        {otherBlogs.map((item) => (
          <SideBlogCard
            key={item.id}
            onClick={() => history.push(makeBlogPath(item.id))}
          >
            <div className="blog-title">{item.title}</div>
            <div className="blog-row">
              <div className="blog-posted">
                {item.postedDate.toDateString()}
              </div>
              <AuthorBlock author={item.author} />
            </div>
            <img src={item.thumbnail} />
          </SideBlogCard>
        ))}
      </RightSection>
    </Container>
  );
}

export default memo(FeaturedBlogs);
