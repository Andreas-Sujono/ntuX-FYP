import React, { memo } from 'react';
import { Container, Title, BoxContent } from './Styles';

const WhyUs: React.FC = () => {
  return (
    <Container>
      <div className="left-content">
        <Title>
          Why <strong>NTUX</strong>?
        </Title>
        <BoxContent>
          NTUX seek to provide working professionals and our alumni alternate
          and flexible pathways to upskill, boost their employability or pursue
          their intellectual enrichment through a selected range of academic
          accredited CET courses that can be stacked towards a MiniMasters™
          Certificate awarded from an acclaimed University.
        </BoxContent>
      </div>
      <div className="right-content">
        <img
          src="https://cdn.dribbble.com/users/1350460/screenshots/9707394/studu1_4x.jpg"
          alt=""
        />
      </div>
    </Container>
  );
};

export default memo(WhyUs);
