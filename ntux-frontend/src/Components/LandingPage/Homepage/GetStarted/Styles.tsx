import styled from 'styled-components';
import { Button } from 'react-dre/lib/Button';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding-top: 80px;
  padding-bottom: 50px;

  ${media.lessThan('sm')`
  padding-top: 40px;
  `}
`;

export const Card = styled.div`
  background: linear-gradient(278.04deg, #090739 1.33%, #211f66 106.46%);
  border-radius: 32px;
  padding: 40px 24px;
  text-align: center;
  max-width: 80%;
  margin: auto;

  ${media.lessThan('sm')`
    padding: 40px 24px;
  `}
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 38px;
  line-height: 140%;
  color: white;
  margin-top: 0;

  ${media.lessThan('sm')`
    font-size: 24px;
  `}
`;

export const Subtitle = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: white;
  margin-top: 16px;
  margin-bottom: 56px;

  ${media.lessThan('sm')`
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 40px;
  `}
`;

export const StyledButton = styled(Button).attrs({
  styles: {
    buttonStyle: {
      background: '#DC2D27',
      margin: 'auto',
      fontSize: '1.5em',
      color: 'white',
      width: '200px',
    },
  },
})``;
