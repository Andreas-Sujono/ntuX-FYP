import styled from 'styled-components';
import { media } from '../../../common/styling';

export const Container = styled.div``;

export const BackButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: #6298e9;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: transparent;
  .icon {
    margin-right: 0.5em;
  }
`;

export const Title = styled.h1`
  margin: 0;
  margin-top: 0.7em;
  font-size: 32px;

  ${media.lessThan('md')`
    font-size: 24px;
  `}
`;

export const Subtitle = styled.div`
  margin-top: 0.5em;
  color: #888686;
  font-size: 16px;
`;

export const CardsContainer = styled.div`
  margin-top: 2em;
`;
