import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .left-section {
    .name {
      font-weight: bold;
      font-size: 24px;
      line-height: 29px;
    }
    .posted-date {
      font-size: 16px;
      color: #6f6f6f;
      margin-top: 0.6em;
    }
    .type {
      margin-top: 0.6em;
      color: #6f6f6f;
    }
  }
  .right-section {
    .budget {
      font-weight: bold;
      font-size: 24px;
    }
  }
`;

export const Description = styled.div`
  background: #ffffff;
  border: 1px solid #cacaca;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px;
  margin-top: 2em;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: flex-start;
  margin-top: 2em;

  .left-section {
    width: 55%;
    margin-right: 1em;
  }
  .right-section {
    width: 45%;
    font-size: 14px;
    line-height: 17px;
    margin-top: 2em;

    color: #6f6f6f;
  }
`;

export const OrderText = styled.div`
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
`;
