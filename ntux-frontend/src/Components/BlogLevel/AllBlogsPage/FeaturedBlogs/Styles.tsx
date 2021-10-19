import styled from 'styled-components';
import { media } from '../../../../common/styling';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.lessThan('md')`
    align-items: center;
  `}
`;

export const LeftSection = styled.div`
  width: 58%;
`;

export const RightSection = styled.div`
  width: 40%;
`;

export const BlogCard = styled.div`
  cursor: pointer;

  .blog-title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #313030;
  }
  .blog-row {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888686;
    font-size: 14px;
    .blog-posted {
    }
  }
  > img {
    width: 100%;
    max-height: 340px;
    margin-top: 12px;
    object-fit: cover;
  }
  &:first-child {
    margin-bottom: 20px;
  }

  ${media.lessThan('md')`
    .blog-title{
      font-size: 18px;
    }
    .blog-row {
      font-size: 12px;
      flex-direction: column;
      align-items: flex-start;
      .common-author-block {
        margin-top: 6px;
      }
      
    }
    > img {
    }
    &:first-child {
      margin-bottom: 0;
    }
  `}
`;

export const SideBlogCard = styled(BlogCard)`
  .blog-title {
    font-size: 18px;
    line-height: 21px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > img {
    max-height: 140px;
  }

  ${media.lessThan('md')`
    .blog-title{
      font-size: 14px;
    }
    > img {
      height: 100%;
      max-height: 120px;
    }
  `}
`;
