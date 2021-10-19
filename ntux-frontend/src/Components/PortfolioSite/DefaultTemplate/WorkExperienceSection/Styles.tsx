import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)``;

export const WorkCard = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: flex-start;
  position: relative;

  &:not(:first-child) {
    margin-bottom: 36px;
  }

  ${media.lessThan('md')`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 18px;

    &:not(:first-child) {
      margin-bottom: 18px;
    }
  `}
`;

export const WorkLeftCard = styled.div`
  font-size: 18px;
  width: 25%;

  img {
    width: 70px;
  }
  .name {
    font-weight: bold;
    margin-top: 12px;
  }
  .role {
    margin-top: 6px;
  }
  .period {
    color: #6f6f6f;
    margin-top: 6px;
    font-size: 16px;
  }

  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const WorkRightCard = styled.div`
  width: 70%;
  max-width: 600px;
  background: #ffffff;
  border: 1px solid #cacaca;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  padding-left: 0;
  padding-top: 8px;
  font-size: 15px;
  margin-left: 3em;

  ul {
    margin: 0;
    padding: 0;
    padding-left: 32px;
    li {
      margin-top: 8px;
    }
  }

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    background: #cfcfcf;
    top: 0;
    left: 25%;
  }

  ${media.lessThan('md')`
    width: 100%;
    margin-top: 12px;
    &::before {
      opacity: 0;
    }
  `}
`;
