import styled from 'styled-components';
import { media } from '../../../../common/styling';

export const Container = styled.div`
  background: #fafafa;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 2em;
  display: flex;
  position: relative;
`;

export const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  background: #6298e9;
  border-radius: 50%;
  margin-right: 6px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  padding-bottom: 1px;
  text-transform: uppercase;
`;

export const Content = styled.div`
  color: #757575;
  font-size: 16px;
  margin-left: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 90%;

  > div:first-child {
    width: 70%;
  }

  .written-by {
    text-transform: uppercase;
  }
  .author-name {
    color: #ae1b1b;
    font-weight: bold;
    font-size: 18px;
    text-transform: capitalize;
  }
  .author-desc {
    margin-top: 1em;
  }

  ${media.lessThan('sm')`
    flex-direction: column;
    > div:first-child {
      width: 100%;
    }
  `}
`;

export const ShareContainer = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: #757575;
`;

export const StyledButton = styled.button`
  padding: 0.5em 1.5em;
  background: #888686;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: 0;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }

  ${media.lessThan('sm')`
    margin-top: 1em;
  `}
`;
