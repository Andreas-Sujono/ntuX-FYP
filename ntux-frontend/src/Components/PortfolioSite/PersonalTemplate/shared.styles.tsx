import styled from 'styled-components';
import { media } from '../../../common/styling';

export const PaddedContainer = styled.div`
  width: 90%;
  /* left: -8%; */
  margin: auto;
  position: relative;
  /* min-width: 800px; */
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell,
    Droid Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Lucida Grande, Helvetica, Arial, sans-serif;
  background: white;
  box-sizing: border-box;

  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const SectionContainer = styled.div`
  padding: 1em 16px;
  padding-bottom: 2em;
  position: relative;

  ${media.lessThan('md')`
    padding: 1em 16px;
    padding-bottom: 1em;
  `}
`;

export const SectionTitle = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 2rem;

  // border-bottom: 2px double #ae1b1b;
  display: inline-block;
`;
