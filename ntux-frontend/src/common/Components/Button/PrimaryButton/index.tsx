import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styling';

export const Button = styled.button<{ widthS?: string }>`
  display: block;
  padding: 0.5em 1.5em;
  border: 0;
  background: ${(props) => props.color};
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.12s;
  width: ${(props) => props.widthS};

  &:focus {
    outline: 0;
    box-shadow: rgb(175 208 254) 0px 0px 2px 3px;
  }

  &:hover {
    filter: brightness(0.85);
  }

  ${media.lessThan('md')`
    padding: 0.5em 1em;
    font-size: 15px;
  `}
`;

interface IPrimaryByttonProps {
  children: any;
  className?: string;
  style?: Record<string, any>;
  color?: string;
  width?: string;
}

const PrimaryBytton: React.FunctionComponent<IPrimaryByttonProps> = ({
  children,
  className,
  style = {},
  color = '#C63044',
  width = 'auto',
}: IPrimaryByttonProps) => {
  return (
    <Button color={color} className={className} style={style} widthS={width}>
      {children}
    </Button>
  );
};

export default PrimaryBytton;
