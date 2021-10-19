import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  min-height: 80vh;
  padding: 60px 0;
  padding-top: 40px;
`;

export const Row = styled.div`
  display: flex;

  ${media.lessThan('md')`
    flex-direction: column;
  `}
`;

export const LeftSection = styled.div`
  width: 58%;
  margin-right: 2%;
  margin-top: 1em;

  > div:first-child {
    width: 100% !important;
  }

  ${media.lessThan('md')`
    width: 100%;
    margin-right: 0;
  `}
`;

export const RightSection = styled.div`
  width: 40%;
  ${media.lessThan('md')`
    padding-top: 24px;
  `}
`;

export const CardsContainer = styled.div`
  > * {
    margin-top: 24px;
  }
`;
