import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding-top: 60px;
  padding-bottom: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: white;

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
  column-gap: 24px;
  row-gap: 24px;
`;

export const Column = styled.div`
  flex: 1 1 0;
  h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    margin: 0;
    margin-top: 16px;
    margin-bottom: 12px;
    color: white;
  }

  ${media.lessThan('md')`
    margin-bottom: 24px;
    min-width: 300px;
  `}
`;

export const FirstColumn = styled(Column)`
  flex: 2 1 0;
  > img {
    width: 220px;
  }
  .slogan {
    margin-top: 0px;
    font-size: 18px;
    color: white;
  }
`;

export const SecondColumn = styled(Column)`
  flex: 1 1 0;
  text-align: right;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      white-space: nowrap;
    }
  }
`;

export const ThirdColumn = styled(Column)`
  flex: 2 1 0;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
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
