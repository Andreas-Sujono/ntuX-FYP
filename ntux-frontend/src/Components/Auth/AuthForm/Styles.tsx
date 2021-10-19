import styled, { css } from 'styled-components';
import { Button } from 'react-dre/lib/Button';
import { media } from '../../../common/styling';

export const Container = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(220, 45, 39, 0.8);
  box-sizing: border-box;
  border-radius: 30px;
  z-index: 2;
  position: relative;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: #dc2d27;
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
  margin-top: 0;

  ${media.lessThan('sm')`
    font-size: 22px;
    line-height: 28px;
  `}
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  width: 50%;
  text-align: center;
  font-size: 22px;
  line-height: 26px;
  padding: 12px;
  cursor: pointer;
  color: #dc2d27;
  transition: all 0.12s;

  &:first-child {
    border-radius: 30px 0 0px 0px;
  }
  &:last-child {
    border-radius: 0px 30px 0px 0px;
  }

  &:hover {
    ${(props) =>
      !props.isActive &&
      css`
        background: #eeaeac1d;
      `}
  }

  ${(props) =>
    props.isActive &&
    css`
      background: #dc2d27;
      color: #ffffff;
      font-weight: bold;
    `}

  ${media.lessThan('sm')`
    font-size: 18px;
    line-height: 24px;
    padding: 8px;
  `}
`;

export const StyledForm = styled.form`
  padding: 24px;
`;

export const StyledButton = styled(Button).attrs({
  styles: {
    buttonStyle: {
      width: '100%',
      marginTop: '32px',
      height: '42px',
      background: '#DC2D27',
      fontWeight: 'bold',
      fontSize: '20px',
      color: 'white',
    },
  },
})`
  > button {
    ${media.lessThan('sm')`
        height: 36px;
      
  `}
  }
`;

export const AlternativeText = styled.p`
  margin: 0;
  padding: 0 20px;
  color: #888686;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;

  ${media.lessThan('sm')`
    font-size: 14px;
    line-height: 18px;
  `}
`;

export const AlternativeLoginContainer = styled.div`
  display: flex;
  padding: 0 20px;
  padding-bottom: 32px;

  > img {
    width: 40px;
    height: 40px;
    margin-top: 16px;
    cursor: pointer;
  }

  ${media.lessThan('sm')`
    > img {
      width: 30px;
    }
  `}
`;
