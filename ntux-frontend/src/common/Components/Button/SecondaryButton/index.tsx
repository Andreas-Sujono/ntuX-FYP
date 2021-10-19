import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styling';

export const Button = styled.button`
  display: block;
  padding: 0.5em 1.5em;
  border: 1px solid ${(props) => props.color};
  background: transparent;
  border-radius: 8px;
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.12s;

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

interface ISecondaryButtonProps {
  children: any;
  className?: string;
  style?: Record<string, any>;
  color?: string;
}

const SecondaryButton: React.FunctionComponent<ISecondaryButtonProps> = ({
  children,
  className,
  style = {},
  color = '#ae1b1b',
}: ISecondaryButtonProps) => {
  return (
    <Button color={color} className={className} style={style}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
