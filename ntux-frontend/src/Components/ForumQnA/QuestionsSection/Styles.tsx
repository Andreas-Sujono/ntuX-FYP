import styled from 'styled-components';
import { media } from '../../../common/styling';

export const Container = styled.div``;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;

  ${media.lessThan('md')`
    font-size: 24px;
  `}
`;

export const SearchBarContainer = styled.div`
  margin-top: 1.5em;
  > div {
    width: 100% !important;
    .dre-icon-container {
      top: 12px;
    }

    input {
      border: 1px solid #dcdcdc;
    }
  }
`;

export const FilterContainer = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #888686;

  span {
    &:not(:first-child)::before {
      content: '|';
      margin: 0 0.5em;
    }
  }
`;

export const CardsContainer = styled.div`
  margin-top: 2em;
`;

export const Card = styled.div`
  border: 1px solid #ae1b1b;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 1.2em;
  cursor: pointer;
`;

export const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;

  .left-section {
    width: 78%;

    .title {
      font-weight: 500;
      font-size: 1.1rem;
    }
    .subtitle {
      color: #888686;
      font-size: 0.9rem;
      margin-top: 0.8em;
    }
  }

  .right-section {
    font-size: 14px;
    color: #888686;
    > div.posted-on {
      font-size: 13px;
      white-space: nowrap;
    }
  }

  ${media.lessThan('md')`
    flex-direction: column;
    .right-section {
      margin-top: 1em;
    }
  `}
`;

export const CardBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
  font-size: 14px;
  color: #888686;

  .left-section {
    display: flex;

    span {
      font-size: 18px;
      color: black;
    }

    .votes {
      margin-right: 2em;
    }
  }
`;
