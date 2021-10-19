import React, { memo } from 'react';
import { BlogPreview } from '../../../../Models/Blog';
import BlogCard from '../../../BlogLevel/shared/BlogCard';
import { SectionTitle } from '../shared.styles';
import { Container, Content, LeftSection, RightSection } from './Styles';

interface Props {
  data: BlogPreview[];
}

const MAX_BLOG = 3;

const BlogSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <LeftSection>
          <SectionTitle>My Blogs</SectionTitle>
          <div className="total-blogs">
            Total Blogs written: <span>{data.length}</span>
          </div>
        </LeftSection>
        <RightSection>
          {data.slice(0, MAX_BLOG).map((item) => (
            <BlogCard blog={item} key={item.id} />
          ))}
          {data.length > MAX_BLOG && (
            <div className="see-more">
              See {data.length - MAX_BLOG} more blog...
            </div>
          )}
        </RightSection>
      </Content>
    </Container>
  );
};

export default memo(BlogSection);
