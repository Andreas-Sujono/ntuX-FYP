import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PaddedContainer } from '../shared.styles';

export const Container = styled.div`
  height: calc(100% - 120px);
  position: relative;
  padding-bottom: 2em;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Content = styled(PaddedContainer)`
  padding: 0 16px;
  position: relative;
  background: transparent;
  padding-top: 100px;
`;

export const TopContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${media.lessThan('md')`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `}
`;

export const TopContentLeftSection = styled.div`
  width: 70%;

  img.profile-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px solid #eceaea;
  }

  .name {
    font-weight: bold;
    font-size: 2rem;
    margin-top: 4px;
  }
  .role {
    font-size: 1.3rem;
    margin-top: -3px;
  }
  .contact {
    font-size: 1rem;
    color: #6f6f6f;
    margin-top: 0px;
  }

  ${media.lessThan('md')`
    width: 100%;
  `}
`;

export const TopContentRightSection = styled.div`
  ${media.lessThan('md')`
    margin-top: 8px;
  `}
`;

export const BottomContent = styled.div`
  background: #ffffff;
  border: 1px solid #cacaca;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  font-size: 1.1rem;
  margin-top: 1em;
`;
