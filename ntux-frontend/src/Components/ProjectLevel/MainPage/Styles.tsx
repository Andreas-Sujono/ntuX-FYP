import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const BackgroundContainer = styled.div`
  background: #3c77e9;
  padding: 40px 0;
  min-height: 230px;
  box-sizing: border-box;
  min-width: 800px;
`;

export const TopContainer = styled(PageContentContainer)`
  position: relative;

  img {
    position: absolute;
    right: 10%;
    bottom: -70%;
    width: 350px;
  }
`;

export const SearchBarContainer = styled.div`
  margin-top: 1.5em;
  width: 80%;
  max-width: 500px;

  > div {
    width: 100% !important;
    .dre-icon-container {
      top: 12px;
    }

    input {
      border: 1px solid #dcdcdc;
    }
  }
  ${media.lessThan('sm')`
    > div {
      width: 100% !important;
    }
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin: 0;
  color: white;

  ${media.lessThan('sm')`
    font-size: 24px;
  `}
`;

export const ContentRow = styled(PageContentContainer)`
  display: flex;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  min-width: 920px;
  position: relative;
`;

export const LeftSection = styled.div`
  width: 360px;
  background: #fafafa;
  overflow: auto;
  min-height: 100vh;
  max-height: 150vh;
  padding: 2px;
  padding-top: 0;
  position: relative;
`;

export const Card = styled.div<{ status?: string }>`
  padding: 16px;
  background: white;
  margin-top: 0.4em;
  cursor: pointer;
  transition: all 0.1s;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.09));

  &:hover {
    filter: drop-shadow(0px 2px 2px rgba(77, 31, 161, 0.04));
  }

  .name {
    font-weight: bold;
    font-size: 18px;
  }
  .desc {
    font-size: 14px;
    color: #6f6f6f;
    margin-top: 0.4em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .price {
    font-size: 14px;
    color: #6f6f6f;
    margin-top: 0.8em;
    span {
      /* font-weight: bold; */
      font-size: 18px;
      color: #000000;
    }
  }
  .dt-row {
    margin-top: 0.5em;
    display: flex;
    justify-content: space-between;
  }

  .posted-date {
    font-size: 14px;
    color: #6f6f6f;
    margin-top: 0.6em;
  }
  .type {
    color: ${(props) => (props.status === 'open' ? '#F2C85B' : '#B3B3B3')};
  }
`;

export const RightSection = styled.div`
  width: calc(100% - 320px);
  padding: 32px;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: -42px;
  left: 24px;
`;

export const Tab = styled.div<{ isActive?: boolean }>`
  background: ${(props) => (props.isActive ? '#fafafa' : 'transparent')};
  border-radius: 8px 8px 0px 0px;
  padding: 10px 24px;
  color: ${(props) => (props.isActive ? 'black' : 'white')};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.14s;
`;
