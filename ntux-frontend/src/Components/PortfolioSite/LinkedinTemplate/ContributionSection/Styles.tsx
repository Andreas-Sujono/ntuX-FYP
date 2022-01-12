import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)`
  display: flex;
  margin-top: 1em;

  ${media.lessThan('md')`
    flex-direction: column;
    `}
`;

export const LeftSection = styled.div`
  width: 36%;

  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const RightSection = styled.div`
  width: 64%;
  display: flex;
  flex-wrap: wrap;

  ${media.lessThan('md')`
    margin-top: 1em;
    width: 100%;
  `}
`;

export const Card = styled.div`
  margin-right: 3em;
  margin-bottom: 1em;

  .title {
    font-weight: bold;
    font-size: 14px;
    color: #888686;
  }
  .count {
    font-weight: bold;
    font-size: 14px;
    color: #ae1b1b;

    span {
      font-size: 48px;
    }
  }

  ${media.lessThan('md')`
    margin-right: 1.5em;
    .count {
      span {
        font-size: 36px;
      }
    }
  `}
`;
