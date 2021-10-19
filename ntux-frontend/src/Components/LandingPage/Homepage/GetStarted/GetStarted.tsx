import React, { memo } from 'react';
import { Container, Card, Title, Subtitle, StyledButton } from './Styles';

const GetStarted: React.FC = () => {
  return (
    <Container>
      <Card>
        <Title>What Are your waiting for? Get Started Now</Title>
        <Subtitle>Coding never feel this easy</Subtitle>
        <StyledButton onClick={() => null}>Sign Up</StyledButton>
      </Card>
    </Container>
  );
};

export default memo(GetStarted);
