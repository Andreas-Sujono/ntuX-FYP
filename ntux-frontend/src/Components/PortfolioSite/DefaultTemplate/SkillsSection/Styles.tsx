import styled from 'styled-components';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)``;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-bottom: 1em;
  }
`;
