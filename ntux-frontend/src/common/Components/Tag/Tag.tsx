import React from 'react';
import styled from 'styled-components';

const colors = ['rgb(236, 221, 83)', 'rgb(119, 236, 83)', 'rgb(245, 126, 90)'];

export const Container = styled.span<{ color: string }>`
  padding: 0.3em 1em;
  font-weight: bold;
  font-size: 14px;
  color: black;
  background: ${(props) => props.color};
  border-radius: 8px;
  border: 0;

  &:not(:last-child) {
    margin-right: 0.5em;
  }
`;

interface ITagProps {
  children: any;
  color?: string;
}

const Tag: React.FunctionComponent<ITagProps> = ({
  children,
  color,
}: ITagProps) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return <Container color={color || randomColor}>{children}</Container>;
};

export default Tag;
