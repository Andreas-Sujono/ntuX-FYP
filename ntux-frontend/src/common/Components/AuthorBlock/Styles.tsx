import styled from 'styled-components';
import { media } from '../../styling';

export const Container = styled.div`
  display: flex;
  align-items: center;
  .author-image {
    width: 26px;
    height: 26px;
    background: #4caf50;
    border-radius: 50%;
    margin-right: 6px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 1px;
    text-transform: uppercase;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .author-name {
    color: #ae1b1b;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${media.lessThan('sm')`
    .author-image {
        width: 20px;
        height: 20px;
        font-size: 14px;
    }
  `}
`;
