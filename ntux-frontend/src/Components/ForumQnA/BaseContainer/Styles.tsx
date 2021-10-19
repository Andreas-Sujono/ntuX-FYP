import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  min-height: 60vh;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 80px;

  /* h1 {
    margin: 0;
  } */

  ${media.lessThan('md')`
    flex-direction: column;
  `}
`;

export const LeftSection = styled.div`
  width: 20%;
  max-width: 240px;
  position: sticky;
  top: 68px;
  max-height: 80vh;

  ${media.lessThan('md')` 
    width: 100%;
    max-width: 360px;
    margin-bottom: 1.5em;
    position: static;

    > div:not(:first-child){
      display: none;
    }
  `}
`;

export const CenterSection = styled.div`
  width: 60%;
  min-height: 50vh;
  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const RightSection = styled.div`
  width: 180px;
  position: sticky;
  top: 100px;
  max-height: 80vh;

  ${media.lessThan('md')`
    /* display: none */
    margin-top: 1.5em;
    position: static;
  `}
`;
