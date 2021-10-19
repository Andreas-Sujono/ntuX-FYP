import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding-top: 60px;
  padding-bottom: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  ${media.lessThan('sm')`
    padding-top: 40px;
    font-size: 14px;
    line-height: 20px;
  `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  width: 31%;
  h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    margin: 0;
    margin-top: 16px;
    margin-bottom: 12px;
  }

  ${media.lessThan('md')`
    margin-bottom: 24px;
    min-width: 300px;
  `}
`;

export const FirstColumn = styled(Column)`
  width: 40%;
  > img {
    width: 220px;
  }
  .slogan {
    margin-top: 0px;
    font-size: 18px;
  }
`;

export const SecondColumn = styled(Column)`
  width: 40%;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

export const ThirdColumn = styled(Column)`
  width: 20%;
  text-align: right;

  .theme-button {
    margin-top: 0.5em;
    cursor: pointer;
    color: #ad1c1c;
    font-weight: bold;
  }

  ${media.lessThan('sm')`
  text-align: left;
  `}
`;

export const CopyrightGroup = styled.div`
  color: #aeafc1;
  /* text-align: center; */
  margin-top: 24px;

  ${media.lessThan('sm')`
    font-size: 12px;
    line-height: 16px;
    margin-top: 0;
  `}
`;
