import React, { memo } from 'react';
import { Container } from './Styles';

const ComingSoonPage: React.FC = () => {
  return (
    <Container>
      <img src="https://res.cloudinary.com/dx6juznlw/image/upload/v1624826391/devThinker/under-construction_edzsxd.png" />
      <div>We&apos;re working on it</div>
      <p>Coming Really Soon...</p>
    </Container>
  );
};

export default memo(ComingSoonPage);
