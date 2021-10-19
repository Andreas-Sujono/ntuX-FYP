import React, { memo, useMemo } from 'react';
import { createId } from '../../../utils';
import Label from '../Label';
import { Container, InputContainer, StyledInput } from './Styles';

interface TextInputProps {
  label: string;
  containerStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  onChange: (value: string, e?: any) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  mt?: string;
  mb?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  containerStyle = {},
  inputStyle = {},
  onChange,
  value,
  placeholder = '',
  disabled = false,
  type = 'text',
  required = false,
  mt = '0',
  mb = '0',
}: TextInputProps) => {
  const id = useMemo(() => {
    return createId();
  }, []);

  return (
    <Container style={{ marginTop: mt, marginBottom: mb, ...containerStyle }}>
      <Label label={label} required={required} htmlFor={id} />

      <InputContainer>
        <StyledInput
          style={inputStyle}
          value={value || ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={disabled ? () => null : (e) => onChange(e.target.value, e)}
          type={type}
          required={required}
          id={id}
        />
      </InputContainer>
    </Container>
  );
};

export default memo(TextInput);
