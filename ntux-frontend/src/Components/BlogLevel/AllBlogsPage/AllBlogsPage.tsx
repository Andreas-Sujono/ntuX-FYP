import React, { memo, useState } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { OpenForAds, WriteBlogAds } from '../../../common/Components/AdsCard';
import BlogCard from '../shared/BlogCard';
import FeaturedBlogs from './FeaturedBlogs';
import { blogs } from './mockData';
import {
  Container,
  Row,
  LeftSection,
  RightSection,
  CardsContainer,
} from './Styles';

function AllBlogsPage(): React.ReactElement {
  const [searchInput, setSearchInput] = useState('');

  return (
    <Container>
      <FeaturedBlogs />
      <Row>
        <LeftSection>
          <SearchBar
            width="100%"
            value={searchInput}
            onChange={(value) => setSearchInput(value)}
            placeholder="Search for Blog Title or Topic"
            styles={{
              inputStyle: {
                border: '1px solid #DCDCDC',
              },
              iconStyle: {
                top: '12px',
              },
            }}
          />
          <CardsContainer>
            {blogs.map((item) => (
              <BlogCard blog={item} key={item.id} />
            ))}
          </CardsContainer>
        </LeftSection>
        <RightSection>
          <WriteBlogAds bottom="32px" widths={['40%', '160px', '350px']} />
          <OpenForAds widths={['50%', '200px', '350px']} />
        </RightSection>
      </Row>
    </Container>
  );
}

export default memo(AllBlogsPage);
