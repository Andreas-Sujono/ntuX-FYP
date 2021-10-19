import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  input[type='file'] {
    display: none;
  }
`;

export const InputContainer = styled.div<{ width: string; height: string }>`
  position: relative;
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;

export const StyledInputBox = styled.div`
  width: 100%;
  height: 100%;
  background: #fafafa;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 8px;
  position: relative;
`;

export const PlaceholderContainer = styled.div<{ hasImage?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #888686;
  font-size: 14px;
  padding: ${(props) => (props.hasImage ? 0 : '16px')};
  box-sizing: border-box;

  > * {
    pointer-events: none;
  }

  img.preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: initial;
  }
`;
