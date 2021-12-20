import styled from 'styled-components';
import { media } from '../../../common/styling';

export const Container = styled.div``;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;

  ${media.lessThan('md')`
    font-size: 1rem;
  `}
`;

export const TagsContainer = styled.div`
  margin-bottom: 2em;
  margin-top: 8px;
`;

export const CardsContainer = styled.div`
  margin-top: 2em;

  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
  }
  > div {
    margin-bottom: 1em;
  }
`;
