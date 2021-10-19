import styled from 'styled-components';
import { media } from '../../common/styling';
import { PageContentContainer } from '../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  img {
    max-width: 400px;
  }
  div {
    font-weight: bold;
    font-size: 36px;
    margin-top: 1.2em;
  }
  p {
    font-weight: bold;
    font-size: 24px;
    color: #888686;
  }

  ${media.lessThan('sm')`
    img {
      max-width: 250px;
    }
    div {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  `}
`;
