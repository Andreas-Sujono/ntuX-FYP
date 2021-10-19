import React, { memo } from 'react';
import { Container } from './Styles';
import { SecondaryButton } from 'common/Components/Button';

const Logout = () => {
  return (
    <Container>
      <h1>Logout</h1>
      <h2>We’ll miss you! Hope you come back soon!</h2>
      <SecondaryButton>Logout</SecondaryButton>
    </Container>
  );
};

export default memo(Logout);
