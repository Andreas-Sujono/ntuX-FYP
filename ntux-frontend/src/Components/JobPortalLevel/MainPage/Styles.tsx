import styled from 'styled-components';
import { media } from '../../../common/styling';
import { PageContentContainer } from '../../shared/Shared.styles';

export const BackgroundContainer = styled.div`
  background: #3c77e9;
  padding: 40px 0;
  min-height: 200px;
  box-sizing: border-box;
  min-width: 800px;
`;

export const TopContainer = styled(PageContentContainer)`
  position: relative;

  img {
    position: absolute;
    right: 10%;
    bottom: -50%;
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
  /* height: 100vh; */
`;

export const LeftSection = styled.div`
  width: 380px;
  background: #fafafa;
  min-height: 100vh;
  max-height: 150vh;
  overflow: auto;
  padding: 2px;
  padding-top: 0;
`;

export const JobCard = styled.div`
  padding: 16px;
  background: white;
  margin-top: 0.4em;
  cursor: pointer;
  transition: all 0.1s;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.09));

  &:hover {
    filter: drop-shadow(0px 2px 2px rgba(77, 31, 161, 0.04));
  }

  .dt-row {
    display: flex;

    .company-logo {
      width: 40px;
      height: 40px;
      margin-right: 1em;
    }
    .job-role {
      font-size: 18px;
      line-height: 22px;
      /* font-weight: 600; */
    }
    .company-name {
      font-size: 14px;
      color: #6f6f6f;
    }
  }
  .posted-date {
    font-size: 14px;
    color: #6f6f6f;
    margin-top: 0.6em;
  }
`;

export const RightSection = styled.div`
  width: calc(100% - 320px);
  padding: 32px;
  padding-bottom: 80px;
`;
