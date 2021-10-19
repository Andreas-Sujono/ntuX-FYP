import styled, { css } from 'styled-components';

export const Container = styled.ul`
  background: #fafafa;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  padding: 8px 0;
  border-radius: 8px;
  margin: 0;
  list-style-type: none;
`;

export const ListItem = styled.li<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? '#f3f3f3' : 'transparent')};
  padding: 14px;
  padding-left: 26px;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => (props.isActive ? '#AE1B1B' : '#a5a5a5')};
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #ae1b1b;
      }
    `}
`;
