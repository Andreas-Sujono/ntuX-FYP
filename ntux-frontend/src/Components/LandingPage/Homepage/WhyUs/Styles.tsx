import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding: 60px 16px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  column-gap: 40px;

  .left-content {
    flex: 1 1 0;
  }
  .right-content {
    flex: 1 1 0;
    img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  ${media.lessThan('md')`
    flex-direction: column;
    padding: 32px 16px;
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-top: 20px;
  /* border-bottom: 2px double #ae1b1b; */
  z-index: 3;
  position: relative;

  strong {
    color: #ae1b1b;
  }

  ${media.lessThan('md')`
    font-size: 24px;
  `}
`;

export const BoxContent = styled.div`
  padding: 32px;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  margin-top: 28px;
  font-size: 20px;
  line-height: 24px;

  ${media.lessThan('md')`
  font-size: 18px;
  `}
`;
