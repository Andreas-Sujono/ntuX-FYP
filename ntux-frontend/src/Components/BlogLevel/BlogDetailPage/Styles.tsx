import styled from 'styled-components';
import { media } from '../../../common/styling';

export const Container = styled.div`
  min-height: 73vh;
  padding: 60px 0;
  padding-top: 40px;

  .cw-1 {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
  .cw-2 {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  ${media.lessThan('md')`
    margin-left: 16px;
    margin-right:16px;
  `}
`;
