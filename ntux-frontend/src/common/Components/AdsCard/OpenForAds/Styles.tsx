import styled from 'styled-components';
import { media } from '../../../styling';

export const Card = styled.div`
  background: #dc2d27;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 8px;
  color: white;
  text-align: center;
  padding: 24px 16px;

  img {
    width: 80%;
    margin: auto;
    /* display: block; */
  }

  a:hover {
    color: white;
  }
`;

export const Title = styled.div<{ sizeRatio: number }>`
  font-weight: bold;
  font-size: ${(props) => props.sizeRatio * 20 + 'px'};
  margin-top: 1em;

  ${media.lessThan('md')`
    font-size: ${(props: any) => props.sizeRatio * 18 + 'px'};
  `}
  ${media.lessThan('sm')`
    font-size: 16px;
  `}
`;

export const Subtitle = styled.div<{ sizeRatio: number }>`
  font-weight: bold;
  font-size: ${(props) => props.sizeRatio * 16 + 'px'};
  margin-top: 16px;

  ${media.lessThan('md')`
    font-size: 14px;
  `}
`;
