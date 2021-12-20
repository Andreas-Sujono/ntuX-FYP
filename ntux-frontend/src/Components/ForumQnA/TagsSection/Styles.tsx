import styled from 'styled-components';
import { media } from '../../../common/styling';

export const Container = styled.div`
  ${media.lessThan('sm')`
    padding-bottom: 30px;
  `}
`;

export const Title = styled.h1`
  margin: 0;

  ${media.lessThan('md')`
    font-size: 24px;
  `}
`;

export const Subtitle = styled.div`
  font-size: 16px;
  color: #888686;
  margin-top: 8px;
`;

export const SearchBarContainer = styled.div`
  margin-top: 1.5em;
  margin-bottom: 1em;

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

export const CardsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagCard = styled.div`
  margin-top: 1em;
  background: #fafafa;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  width: 48%;
  margin-right: 2%;
  cursor: pointer;

  .desc {
    margin-top: 10px;
    font-size: 14px;
    color: #676565;
    height: 72px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .question {
    margin-top: 12px;
    font-weight: bold;
    font-size: 14px;
    color: #888686;
  }

  ${media.lessThan('sm')`
      width: 48%;
  `}
`;
