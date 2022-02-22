import { media } from 'common/styling';
import styled from 'styled-components';

export const FullWidthContainer = styled.div`
  width: 100%;
  min-height: 72vh;
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 280px;
  background: #f5f5f5;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const TopSummary = styled.div`
  margin-top: 100px;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  row-gap: 24px;

  .left-content {
    flex: 1 1 0;
    img {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
    }
  }

  .right-content {
    flex: 1 1 0;
    h1 {
      font-weight: bold;
      font-size: 28px;
      line-height: 34px;
    }
  }

  ${media.lessThan('md')` 
    margin-top: 62px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .right-content {
      padding: 0;
      width: 100%;
      h1 {
        font-size: 24px;
        line-height: 30px;
      }
      ul:nth-child(2){
        margin-bottom: 0
      }
    }
  `}
`;

export const Status = styled.div`
  font-size: 18px;
  line-height: 22px;
  color: #46b712;
`;

export const AvailabilityBox = styled.div`
  background: #ffffff;
  padding: 24px;
  margin-top: 20px;

  ul {
  }
  button {
    margin-top: 30px;
  }

  ${media.lessThan('md')` 
    padding: 0;
  `}
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  column-gap: 50px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  background: #f5f5f5;
  padding: 14px 30px;
  margin-top: 24px;
  border-radius: 12px;
  overflow: auto;
  p {
    margin: 0;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 40px 0;
  padding-top: 20px;
  max-width: 1024px;
  .title {
    font-weight: 500;
    font-size: 22px;
    line-height: 29px;
    margin-bottom: 16px;
    margin-top: 1em;
  }
  .content {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 2em;
    white-space: pre-line;

    .MuiCardHeader-avatar {
      width: 50px;
      height: 50px;
      font-size: 20px;
      > * {
        width: 100%;
        height: 100%;
      }
    }
    .MuiCardHeader-title {
      font-size: 1.1rem;
    }
    .MuiCardHeader-subheader {
      font-size: 1rem;
    }
  }

  ${media.lessThan('md')`
  padding: 0 0;

    .title{
      font-size: 20px;
    }
    .content{
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 1em;

      .MuiCardHeader-avatar {
        width: 40px;
        height: 40px;
        font-size: 18px;
      }
      .MuiCardHeader-title {
        font-size: 1rem;
      }
      .MuiCardHeader-subheader {
        font-size: 0.9rem;
      }
    }
  `}
`;
