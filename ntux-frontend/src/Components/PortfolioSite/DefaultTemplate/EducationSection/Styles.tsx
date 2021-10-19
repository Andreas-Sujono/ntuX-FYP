import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer, SectionContainer } from '../shared.styles';

export const Container = styled(SectionContainer)``;

export const Content = styled(PaddedContainer)``;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  &:not(:first-child) {
    margin-bottom: 32px;
  }

  ${media.lessThan('md')`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `}
`;

export const LeftCard = styled.div`
  width: 70px;
  img {
    width: 70px;
  }
`;

export const RightCard = styled.div`
  width: calc(100% - 130px);
  font-size: 18px;

  .name {
    font-weight: bold;
  }
  .role {
    margin-top: 6px;
  }
  .period {
    color: #6f6f6f;
    margin-top: 6px;
    font-size: 16px;
  }
  .desc {
    background: #ffffff;
    /* border: 1px solid #cacaca;
    padding: 16px; */
    box-sizing: border-box;
    border-radius: 8px;
    margin-top: 12px;
    font-size: 16px;
  }

  ${media.lessThan('md')`
    width: 100%;
    margin-top: 18px;
  `}
`;
