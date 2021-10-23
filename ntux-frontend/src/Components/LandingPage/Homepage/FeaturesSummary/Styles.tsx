import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const FullWidthContainer = styled.div`
  position: relative;
  background: #f5f5f5;
`;

export const Container = styled(PageContentContainer)`
  padding: 30px 16px;

  ${media.lessThan('sm')`
  padding: 20px 16px;
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-top: 20px;
  /* border-bottom: 2px double #ae1b1b; */
  z-index: 3;
  position: relative;
  text-align: center;

  ${media.lessThan('md')`
    font-size: 22px;
  `}
`;

export const Row = styled.div`
  width: 100%;
  margin-top: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  column-gap: 24px;

  ${media.lessThan('sm')`
    margin-top: 32px;
  `}
`;

export const Card = styled.div`
  width: 19%;
  min-width: 120px;
  margin-bottom: 2em;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  transition: all 0.18s;

  &:hover {
    transform: scale(1.06, 1.06);
  }

  > img {
    display: block;
    width: 50%;
    margin: auto;
    margin-bottom: 1.2em;
    height: 100px;
  }

  ${media.lessThan('md')`
    font-size: 18px;
  `}
`;
