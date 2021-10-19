import styled from 'styled-components';
import { media } from '../../../styling';

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #ae1b1b;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  padding: 24px 16px;

  > img {
    width: 80%;
    margin: auto;
    /* display: block; */
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-top: 1em;

  span {
    color: #ae1b1b;
  }

  ${media.lessThan('md')`
    font-size: 18px;
  `}
  ${media.lessThan('sm')`
    font-size: 16px;
  `}
`;
