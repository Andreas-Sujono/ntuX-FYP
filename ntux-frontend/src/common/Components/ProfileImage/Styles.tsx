import styled from 'styled-components';
import { media } from '../../styling';

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: #ae1b1b;
  text-transform: capitalize;

  img {
    width: 40px;
    height: 40px;
    background: #6298e9;
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
    object-fit: cover;
  }

  ${media.lessThan('sm')`
    img {
        width: 30px;
        height: 30px;
        font-size: 14px;
    }
  `}
`;
