import styled, { css } from 'styled-components';

export const Container = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li<{ active?: boolean }>`
  padding: 16px 24px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.12s;
  font-weight: 500;
  padding-right: 0;

  .top-level {
    display: flex;
    align-items: center;

    > .icon {
      margin-right: 16px;
      width: 24px;
      height: 24px;
      color: #666666;
    }
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
      font-size: 16px;
      color: #ae1b1b;
      background: #ffffff;

      &::before {
        content: '';
        background: #ae1b1b;
        width: 6px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    `}
`;

export const DropdownUl = styled.ul`
  padding: 0;
  list-style-type: none;
  margin-top: 16px;
  li {
    padding-left: 32px;
  }
`;
