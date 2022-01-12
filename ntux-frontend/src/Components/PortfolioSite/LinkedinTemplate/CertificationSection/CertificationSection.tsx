import React, { memo } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Certification } from '../../../../Models/PortfolioSite';
import { SectionTitle } from '../shared.styles';
import { Container, Content } from './Styles';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface Props {
  data: Certification[];
}

const CertificationSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <SectionTitle>License & Certification</SectionTitle>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          customTransition="all .5"
          transitionDuration={500}
          showDots={true}
        >
          {data.map((item) => (
            <img src={item.imageUrl} key={item.id} className="cer-image" />
          ))}
        </Carousel>
      </Content>
    </Container>
  );
};

export default memo(CertificationSection);
