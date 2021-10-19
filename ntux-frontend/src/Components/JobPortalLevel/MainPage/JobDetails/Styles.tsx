import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .left-section {
    img {
      width: 120px;
      height: 120px;
    }
    .company-name {
      font-weight: bold;
      font-size: 24px;
      margin-top: 0.5em;
    }
    .role-name {
      font-weight: 500;
      font-size: 20px;
      margin-top: 0.2em;
    }
    .role-type {
      font-size: 18px;
      color: #6f6f6f;
      margin-top: 0.6em;
    }
    .posted-date {
      font-size: 16px;
      color: #6f6f6f;
      margin-top: 0.4em;
    }
  }
  .right-section {
  }
`;

export const Description = styled.div`
  background: #ffffff;
  border: 1px solid #cacaca;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px;
  margin-top: 2em;
  /* max-height: 600px;
  overflow: auto; */
`;
