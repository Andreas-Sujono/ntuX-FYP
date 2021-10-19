import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const BackgroundContainer = styled.div`
  background: #fafafa;
  min-height: 80vh;
`;

export const Container = styled(PageContentContainer)`
  padding-top: 2em;
  padding-bottom: 5em;
  display: grid;
  grid-template: auto / 25% auto 17%;
  grid-column-gap: 36px;

  ${media.lessThan('md')`
  grid-template: auto auto / auto;
  grid-row-gap: 24px;
  `}
`;

export const LeftSection = styled.div`
  ${media.lessThan('md')`
    /* display: none; */
  `}
`;

export const CenterSection = styled.div``;

export const RightSection = styled.div`
  ${media.lessThan('md')`
    display: none;
  `}
`;
