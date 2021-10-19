import styled from 'styled-components';

export const Container = styled.div`
  padding: 36px;
  display: grid;
  grid-template-columns: 70% 25%;
  grid-column-gap: 40px;
`;

export const SideNav = styled.div`
  background: #fafafa;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  height: 210px;

  .name {
    font-weight: bold;
    font-size: 24px;
  }
  hr {
    margin: 12px 0;
  }
  ul {
    list-style-type: none;
    padding: 0;

    li {
      font-size: 17px;
      margin: 16px 0;
    }
  }

  .active {
    color: #ae1b1b;
    font-weight: bold;
  }
`;
