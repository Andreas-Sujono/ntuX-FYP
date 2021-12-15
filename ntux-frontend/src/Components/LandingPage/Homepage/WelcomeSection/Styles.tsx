import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

const CONTAINER_HEIGHT = '550px';

export const Container = styled(PageContentContainer)`
  padding: 0 16px;
  position: relative;
  z-index: 1;

  ${media.lessThan('md')`
  padding-top: 0;
  padding: 0;
  `};
`;

export const TaglineContainer = styled.div`
  position: absolute;
  top: -${CONTAINER_HEIGHT};
  left: 0%;
  background: rgba(89, 136, 180, 0.75);
  border-radius: 0;
  padding: 52px 36px;
  width: 44%;
  height: ${CONTAINER_HEIGHT};
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;

  h1 {
    font-weight: bold;
    font-size: 42px;
    margin-top: 40px;
  }

  h2 {
    font-size: 28px;
    margin-top: 18px;
    margin-bottom: 28px;
    color: white;
  }

  strong {
    color: white;
  }

  ${media.lessThan('md')`
    position: relative;
    top: 0;
    width: 100%;
    padding: 10vh 16px;
    height: auto;

    h1{
      font-size: 32px;
    }
    h2{
      font-size: 24px;
    }
  `};
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: ${CONTAINER_HEIGHT};
  position: relative;

  img {
    width: 60% !important;
    height: ${CONTAINER_HEIGHT};
    object-fit: cover;
    float: right;
  }

  ${media.lessThan('md')`
    display: none;
  `};
`;
