import styled from 'styled-components';
// import { media } from '../../styling';

export const Container = styled.div`
  hr {
    height: 1px;
    background: #d2d2d2;
    border: 0;
  }
`;

export const MainBox = styled.div`
  border: 1px solid #c7c7c7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px 16px;
  font-size: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const VoteContainer = styled.div`
  margin-right: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
  > button {
    border: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > * {
      width: 20px;
      height: 20px;
    }
  }
  > div {
    margin: 0.5em 0;
  }
`;

export const TextContainer = styled.div`
  font-size: 1rem;
`;

export const BottomRow = styled.div`
  color: #888686;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
  font-size: 14px;

  span {
    &:not(:first-child)::before {
      content: '|';
      margin: 0 0.5em;
    }
  }
`;

export const ReplyContainer = styled.div`
  padding: 8px;
  padding-left: 60px;
  font-size: 0.9rem;

  .author-name {
    font-size: 0.9rem;
    color: #ae1b1b;
    margin-left: 1em;
  }
  .posted-date {
    color: #888686;
    font-size: 0.9rem;
  }
`;
