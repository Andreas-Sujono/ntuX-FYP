import React, { memo } from 'react';
import { Container, Title, BoxContent } from './Styles';

const WhyUs: React.FC = () => {
  return (
    <Container>
      <div className="left-content">
        <Title>Why NTUX?</Title>
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
          src="https://scontent.fsin8-2.fna.fbcdn.net/v/t1.6435-9/p960x960/154291815_4006838156021999_2126641340921755089_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=36a2c1&_nc_ohc=ygsRzcvpApEAX9ORpD2&_nc_ht=scontent.fsin8-2.fna&oh=8f30fadbc6509966b26927cf0a856f90&oe=619AC46B"
          alt=""
        />
      </div>
    </Container>
  );
};

export default memo(WhyUs);
