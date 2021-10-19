import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)`
  .cer-image {
    width: 90%;
    display: block;
  }

  ${media.lessThan('sm')`
    .cer-image {
      width: 100%;
    }
  `}
`;
