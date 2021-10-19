import styled, { css } from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Overflow = styled.div`
  overflow-x: hidden;
`;
export const FullWidthContainer = styled.div`
  position: relative;
  /* overflow-x: hidden; */
`;

export const Container = styled(PageContentContainer)`
  padding: 60px 16px;

  .side-image {
    position: absolute;
  }
  .rect1 {
    top: 20%;
    left: 5%;
  }
  .rect2 {
    top: 40%;
    right: 0;
  }

  ${media.lessThan('sm')`
  padding: 40px 16px;
      .rect1 {
        left: -10%;
      }
      .rect2 {
        right: -10%;
      }
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 140%;
  margin-top: 20px;
  border-bottom: 2px double #ae1b1b;
  width: 300px;
  padding-bottom: 12px;
  z-index: 3;
  position: relative;

  ${media.lessThan('sm')`
  font-size: 22px;
  width: 200px;
  `}
`;

export const Row = styled.div`
  width: 100%;
  margin-top: 50px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  z-index: 3;

  ${media.lessThan('sm')`
    margin-top: 32px;
    >div {
      width: 100%;
    }
  `}
`;

export const LeftSection = styled.div<{ isFirst?: boolean }>`
  width: 50%;
  max-width: 560px;
  margin: 0;
  font-size: 20px;
  z-index: 3;

  .feature-title {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 20px;
  }

  ${(props) =>
    props.isFirst &&
    css`
      color: white;
      .feature-title {
        color: white;
      }
      ${media.lessThan('sm')`
        margin-top: 40px;
      `}
    `}

  ${media.lessThan('sm')`
    font-size: 16px;
    .feature-title{
      font-size: 18px;
    }
  `}
`;

export const RightSection = styled.div`
  width: 50%;
  max-width: 500px;
  margin: auto;
  z-index: 3;

  img {
    width: 100%;
    display: block;
    margin: auto;
    max-width: 300px;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1, 1.1);
    }
  }

  ${media.lessThan('md')`
    margin-top: 28px;
    img{
      max-width: 240px;
    }
    `}
`;

export const SkewBackground = styled.div`
  width: 120%;
  height: 300px;
  position: absolute;
  top: 100px;
  left: -10%;
  transform: rotateZ(-10deg);
  background: #dc2d27;

  ${media.lessThan('sm')`
    height: 200px;
    top: 120px;
  `}
`;
