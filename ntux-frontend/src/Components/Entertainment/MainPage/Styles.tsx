import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding-top: 50px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  ${media.lessThan('md')`
    flex-direction: column;
  `}
`;

export const TopSection = styled(Row)`
  height: 520px;

  iframe {
    position: absolute;
    top: 0;
    height: 500px;
  }
  .left-section {
    width: 70%;
    height: 520px;
    position: relative;
  }

  .right-section {
    width: 28%;
    top: 0;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  ${media.lessThan('md')`
    height: 520px;
    iframe{
      height: 320px;
      left: -0%;
    }
    .left-section {
      width: 90%;
      height: 320px;
    }
    .right-section {
      width: 90%;
      position: relative;
      top: 5%;
      flex-direction: row;
      flex-wrap: wrap;
    }
  `}
`;

export const VideoContainer = styled.div`
  margin-bottom: 1em;
  cursor: pointer;
  img {
    width: 100%;
    max-height: 160px;
    object-fit: cover;
  }

  ${media.lessThan('md')`
    width: 30%;
    margin-right: 1.5%;
    img {
      width: 100%;
      height: 120px;
    }
  `}
`;

export const WidgetsContainer = styled.div``;
