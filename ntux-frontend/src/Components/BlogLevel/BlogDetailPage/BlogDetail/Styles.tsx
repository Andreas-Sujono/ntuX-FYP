import styled from 'styled-components';
import { media } from '../../../../common/styling';

export const Container = styled.div`
  hr {
    border: 0;
    height: 1px;
    background: lightgrey;
    margin: 3em;
  }

  ${media.lessThan('md')`
    padding-top: 20px;
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 42px;
  margin: 0;

  ${media.lessThan('md')`
  font-size: 36px;
  `}
  ${media.lessThan('sm')`
  font-size: 28px;
  `}
`;

export const AuthorShareRow = styled.div.attrs({
  className: 'cw-2',
})`
  font-size: 14px;
  color: #888686;
  margin-top: 0.4em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-section {
    display: flex;
    align-items: center;
    > div {
      margin-left: 1em;
    }
  }
  .right-section {
    color: #6298e9;
    font-weight: bold;
    cursor: pointer;
  }

  ${media.lessThan('sm')`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .left-section {
      margin-bottom: 1em;
    }
  `}
`;

export const ImageContent = styled.div`
  max-height: 54vh;
  padding: 2em 0;
  > img {
    width: 100%;
    height: 100%;
    max-height: 48vh;
    margin: auto;
    object-fit: cover;
  }
`;

export const TextContent = styled.div.attrs({
  className: 'cw-2',
})`
  font-size: 20px;
  margin-bottom: 1em;

  ${media.lessThan('md')`
  font-size: 18px;
  `}
`;
