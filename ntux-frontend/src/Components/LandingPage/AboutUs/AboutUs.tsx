import React, { memo } from 'react';
import { Container } from './Styles';

function AboutUs(): React.ReactElement {
  return (
    <Container>
      <h1>About Us</h1>
    </Container>
  );
}

export default memo(AboutUs);
