import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding: 0 16px;
  position: relative;
  z-index: 1;

  ${media.lessThan('md')`
  padding-top: 0;
  `};
`;

export const TaglineContainer = styled.div`
  position: absolute;
  top: -580px;
  left: 0%;
  background: rgba(89, 136, 180, 0.75);
  border-radius: 0;
  padding: 52px;
  width: 50%;
  height: 580px;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    font-weight: bold;
    font-size: 42px;
    line-height: 50px;
    margin-top: 20px;
  }

  h2 {
    margin-top: 18px;
    margin-bottom: 28px;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 580px;
  position: relative;

  img {
    width: 60% !important;
    height: 580px;
    object-fit: cover;
    float: right;
  }
`;
