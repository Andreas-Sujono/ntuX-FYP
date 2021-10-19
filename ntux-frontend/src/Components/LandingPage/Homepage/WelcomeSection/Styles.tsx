import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 16px;
  padding-top: 50px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;

  ${media.lessThan('md')`
  padding: 30px 16px;
  padding-top: 0;
  `};
`;

export const LeftSection = styled.div`
  width: 50%;
  position: relative;
  min-height: 300px;

  img {
    width: 100%;
    margin: auto;
    display: block;
  }
  ${media.lessThan('md')`
      width: 80%;
      max-height: 400px;
      margin: auto;
      /* overflow: hidden; */
  `}
`;

export const RightSection = styled.div`
  width: 45%;
  max-width: 450px;

  ${media.lessThan('md')`
    width: 100%;
    margin: auto;
    margin-top: 48px;
  `}
`;

export const TaglineContainer = styled.div`
  position: absolute;
  top: 40%;
  right: 0%;
  background: #ae1b1b;
  border-radius: 18px;
  padding: 20px;
  text-align: center;
  width: 340px;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
  color: #ffffff;
  transition: all 0.2s;

  p {
    max-width: 280px;
    margin: auto;
  }

  &:hover {
    transform: scale(1.05, 1.05);
  }

  ${media.lessThan('md')`
    width: 60%;
    font-size: 22px;
    line-height: 28px;
    right: -5%;
  `}
`;
