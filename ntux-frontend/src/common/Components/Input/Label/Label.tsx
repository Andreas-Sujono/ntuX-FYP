import React, { memo } from 'react';
import styled from 'styled-components';

export const Container = styled.label`
  color: #555670;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  margin: 0;
  height: 20px;
  display: block;
  overflow: hidden;
  margin-bottom: 10px;

  .required-icon {
    color: #ff5a7e;
  }
`;

interface LabelProps {
  label?: string;
  required?: boolean;
  style?: Record<string, any>;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({
  label = '',
  required = false,
  style = {},
  htmlFor,
}: LabelProps) => {
  let addRequiredIcon = false;
  if (label && required && label.slice(-1) !== '*') {
    addRequiredIcon = true;
  }
  if (!label) return null;

  return (
    <Container style={style} htmlFor={htmlFor}>
      {label} {addRequiredIcon && <span className="required-icon"> *</span>}
    </Container>
  );
};

export default memo(Label);
