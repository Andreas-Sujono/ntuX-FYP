import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding: 80px 0;
  padding-top: 40px;
`;

export const TopContainer = styled.div`
  position: relative;
  min-height: 250px;

  img {
    width: 100%;
  }

  .slogan {
    font-weight: bold;
    font-size: 36px;
    position: absolute;
    top: 15%;
    left: 5%;
    width: 40%;
    line-height: 43px;

    button {
      margin-top: 4em;
    }

    span {
      color: #482eb0;
    }
  }

  ${media.lessThan('md')`
    .slogan{
      position: relative;
      width: 100%;
      font-size: 28px;
      left: 0;
      button {
        margin-top: 1em;
      }
    }
  `}
`;

export const SearchBarContainer = styled.div`
  margin-top: 1.5em;
  > div {
    width: 50% !important;

    .dre-icon-container {
      top: 12px;
    }

    input {
      border: 1px solid #dcdcdc;
    }
  }
  ${media.lessThan('sm')`
    > div {
      width: 100% !important;
    }
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;

  ${media.lessThan('sm')`
    font-size: 22px;
  `}
`;

export const SectionContainer = styled.div`
  &:not(:last-child) {
    margin: 5em 0;
  }
  ${media.lessThan('sm')`
    &:not(:last-child) {
      margin: 2.5em 0;
    }
  `}
`;

export const NoEventText = styled.p`
  color: #888686;
  ${media.lessThan('sm')`
    font-size: 14px;
  `}
`;
