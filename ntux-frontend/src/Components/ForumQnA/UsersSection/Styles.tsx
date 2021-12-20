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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.lessThan('sm')`
    flex-wrap: wrap;
  `}
`;

export const TopTable = styled.div`
  background: #fafafa;
  border: 1px solid rgba(184, 184, 184, 0.8);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  width: 49%;
  margin-top: 1.5em;

  .title {
    font-weight: bold;
    font-size: 18px;
  }

  ${media.lessThan('sm')`
    width: 100%;
  `}
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

  > a {
    width: 31%;
    margin-right: 1.3%;
    margin-left: 0.7%;
  }

  ${media.lessThan('sm')`
    > a {
      width: 100%;
      margin-right: 0%;
      margin-left: 0%;
    }
  `}
`;

export const UserCard = styled.div`
  margin-top: 1.5em;
  display: flex;
  align-items: center;
  cursor: pointer;

  .left-section {
    width: 36px;
    height: 36px;
    background: #6298e9;
    border-radius: 50%;
    margin-right: 12px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 1px;
    text-transform: uppercase;
  }
  .right-section {
    width: calc(100% - 50px);
    .name {
      font-size: 1rem;
      /* font-weight: bold; */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .role {
      font-size: 0.8rem;
      color: #888686;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: -3px;
    }
    .level {
      font-size: 0.8rem;
      color: #000000;
    }
  }
`;
