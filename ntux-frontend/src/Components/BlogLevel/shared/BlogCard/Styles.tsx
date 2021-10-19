import styled from 'styled-components';
import { media } from '../../../../common/styling';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ae1b1b;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  min-width: 320px;
  height: 180px;
  box-sizing: border-box;
  cursor: pointer;

  ${media.lessThan('md')`
    height: 160px;
  `}
`;

export const LeftSection = styled.div`
  width: 58%;
  padding: 16px;

  .blog-title {
    font-weight: bold;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #313030;
    height: 48px;
    overflow: hidden;
  }

  .blog-description {
    margin-top: 10px;
    font-size: 15px;
    line-height: 19px;
    height: 58px;
    color: #888686;
    overflow: hidden;
  }

  .blog-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888686;
    font-size: 14px;
    margin-top: 12px;
    .blog-posted {
    }
  }

  ${media.lessThan('md')`
    width: 70%;
    padding: 8px;
    .blog-title{
      font-size: 18px;
      max-height: 42px;
    }
    .blog-description {
      font-size: 12px;
      height: 50px;
    }
    .blog-row {
      font-size: 12px;
    }
  `}
`;

export const RightSection = styled.div`
  width: 40%;

  > img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0 8px 8px 0;
  }

  ${media.lessThan('md')`
    width: 30%;
    > img {
      height: 100%;
    }
  `}
`;
