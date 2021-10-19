import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)`
  display: flex;

  ${media.lessThan('md')`
    flex-direction: column;
  `}
`;

export const LeftSection = styled.div`
  width: 30%;

  .total-blogs {
    color: #6f6f6f;
    position: relative;
    top: -8px;
    span {
      font-weight: bold;
    }
  }

  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const RightSection = styled.div`
  width: 68%;
  max-width: 650px;
  > div:not(:first-child) {
    margin-top: 1em;
  }

  .see-more {
    color: #6f6f6f;
    text-align: center;
    cursor: pointer;
  }

  ${media.lessThan('md')`
    margin-top: 2em;
    width: 100%;
  `}
`;
