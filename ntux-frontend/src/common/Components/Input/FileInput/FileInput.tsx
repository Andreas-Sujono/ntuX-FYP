import { get } from 'lodash';
import React, { memo, useState, useEffect, useRef, ChangeEvent } from 'react';
import Label from '../Label';
import {
  Container,
  InputContainer,
  StyledInputBox,
  PlaceholderContainer,
} from './Styles';

interface FileInputProps {
  label: string;
  containerStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  onChange: (value: { file: any; url: string }) => void;
  value?: string;
  initialImageUrl?: string;
  width?: string;
  height?: string;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  mt?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  containerStyle = {},
  inputStyle = {},
  onChange,
  value = '',
  width = '100%',
  height = '200px',
  placeholder = <>Click to upload image</>,
  disabled = false,
  required = false,
  mt = '0',
}: FileInputProps) => {
  const [imageUrl, setImageUrl] = useState(value);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const onClickInputBox = () => {
    console.log(fileRef);
    if (disabled) return;
    fileRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = get(e, 'target.files[0]', {});
    const url = URL.createObjectURL(file);
    return !disabled && onChange({ file, url });
  };
  console.log('fileRef', fileRef);

  return (
    <Container style={{ marginTop: mt, ...containerStyle }}>
      <Label label={label} required={required} htmlFor="" />

      <InputContainer width={width} height={height} onClick={onClickInputBox}>
        <input type="file" ref={fileRef} onChange={onFileChange} />
        <StyledInputBox style={inputStyle} />
        <PlaceholderContainer hasImage={!!imageUrl}>
          {imageUrl ? <img src={imageUrl} className="preview" /> : placeholder}
        </PlaceholderContainer>
      </InputContainer>
    </Container>
  );
};

export default memo(FileInput);
