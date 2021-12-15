import styled, { css, createGlobalStyle } from 'styled-components';
// import { media } from '../../../../common/styling';

export const GlobalStyle = createGlobalStyle<{ showDropdown: boolean }>`

`;

export const BackgroundContainer = styled.div<{
  isScrolled: boolean;
  isDarkTheme: boolean;
}>`
  transition: all 0.15s;
  background-color: rgba(255, 255, 255, 1);
  color: #888686;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;
  transition: all 0.15s;

  ${(props) =>
    props.isScrolled &&
    css`
      box-shadow: 1px 1px 1px 1px rgba(174, 27, 27, 0.1);
    `}
`;

export const Container = styled.div`
  width: 100%;
  margin: auto;
  max-width: 1232px;
  padding: 12px 16px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;

  .dropdown-button-container {
    ul {
      &::before {
        content: '';
        width: 5px;
        height: 100%;
        background: #f2c85b;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
`;

export const LogoContainer = styled.div`
  width: 165px;
  img {
    max-height: 32px;
  }
`;

export const InlineUl = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  margin: 0;

  > li {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: inherit;
    cursor: pointer;
    transition: all 0.15s;
    a:hover {
      color: #ae1b1b;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    &.active {
      color: #ae1b1b;
    }
  }
  .highlighted {
    a:hover {
      color: inherit;
    }
  }

  .products-button {
    transition: all 0.15s;
    &:hover {
      color: #ae1b1b;
    }
  }

  > li:not(:first-child) {
    margin-left: 24px;
  }
`;

export const DropdownUlContainer = styled.div`
  .icon {
    position: absolute;
    top: 12px;
    right: 16px;
    width: 24px;
    height: 24px;
    color: inherit;
  }
`;

export const DropdownUl = styled(InlineUl)<{
  showDropdown: boolean;
  isDarkTheme: boolean;
}>`
  position: absolute;
  top: 46px;
  left: 0;
  width: 100%;
  background-color: ${(props) => (props.isDarkTheme ? '#1d1d1d' : 'white')};
  color: ${(props) => (props.isDarkTheme ? '#c4c3c3' : '#888686')};
  display: block;
  padding: 0;
  padding: ${(props) => (props.showDropdown ? '20px' : 0)};
  box-sizing: border-box;
  margin: 0;
  box-shadow: ${(props) =>
    props.showDropdown ? ' 1px 1px 1px 1px rgba(174, 27, 27, 0.1)' : 0};
  height: ${(props) => (props.showDropdown ? '200px' : 0)};
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.showDropdown ? '1' : '0')};
  overflow: ${(props) => (props.showDropdown ? 'show' : 'hidden')};

  > li {
    text-align: center;
  }

  > li:not(:first-child) {
    margin-left: 0;
    margin-top: 18px;
  }
`;

export const DropdownLi = styled.li`
  .name {
    font-size: 17px;
  }
  .desc {
    font-weight: normal;
    font-size: 15px;
  }
`;
