import styled from 'styled-components';

const sidebarColor = '#f5f5f5';

export const Container = styled.div`
  min-height: 70vh;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background: ${sidebarColor};
  position: relative;
  z-index: 10;
  padding: 16px;
  box-sizing: border-box;
  padding-left: 276px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    img {
      width: 100%;
      max-width: 165px;
    }

    position: fixed;
    left: 24px;
    top: 16px;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    background: -webkit-linear-gradient(#6699ff, #ff3366);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const ContentRow = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background: ${sidebarColor};
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 100px;
  z-index: 8;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1520px;
  padding-left: 240px;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  > div:first-child {
    margin-right: 8px;
  }
  .name {
    color: #ae1b1b;
    font-weight: bold;
    font-size: 17px;
  }
  .email {
    font-size: 15px;
    line-height: 14px;
    color: #989898;
  }
`;
