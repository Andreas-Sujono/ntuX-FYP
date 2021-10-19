import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
`;

export const StyledInput = styled.textarea`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e1e1e6;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 12px;
  color: #313030;

  &:disabled {
    background-color: #ebebf2;
  }

  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: #e2e0e0;
  }

  &:focus {
    outline: 0;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
