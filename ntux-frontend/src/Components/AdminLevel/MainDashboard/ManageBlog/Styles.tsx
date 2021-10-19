import styled from 'styled-components';

export const Container = styled.div`
  padding: 36px;
  width: 100%;

  .table {
    margin-top: 3em;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: bold;
    font-size: 24px;
  }
  .subtitle {
    font-size: 18px;
    color: #888686;
    margin-top: 6px;
  }
`;

export const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-column-gap: 24px;
  margin-top: 28px;
`;

export const Box = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;

  .name {
    color: #888686;
    font-weight: bold;
    font-size: 18px;
  }
  .number {
    font-weight: bold;
    font-size: 18px;
    color: #ae1b1b;
    margin-top: 24px;
    span {
      font-size: 64px;
    }
  }
`;
