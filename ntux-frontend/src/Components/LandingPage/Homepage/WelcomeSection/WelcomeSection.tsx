import React, { memo } from 'react';
import { Container, TaglineContainer, ImageContainer } from './Styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { Button } from 'common/Components/Button/PrimaryButton';
import { HashLink } from 'react-router-hash-link';
import { Button } from '@mui/material';

const images = [
  'https://cdni.iconscout.com/illustration/premium/thumb/young-people-doing-social-networking-in-internet-cafe-2706737-2266901.png',
  'https://image.shutterstock.com/z/stock-vector-cloud-surrounded-by-abstract-computer-network-with-integrated-circles-and-icons-for-digital-283309469.jpg',
  'https://www.kindpng.com/picc/m/403-4038581_technology-icon-png-transparent-png.png',
  // 'https://live.staticflickr.com/5476/11870998636_daf8d91bb5_c.jpg',
  // 'https://media.gettyimages.com/photos/dusk-elevation-of-learning-hub-with-lit-interiors-ntu-nanyang-picture-id929401118?s=612x612',
  // 'https://thumbs.dreamstime.com/b/inside-view-hive-learning-called-dim-sum-basket-building-nanyang-technological-university-ntu-singapore-62933890.jpg',
];

const WelcomeSection: React.FC = () => {
  return (
    <>
      <Carousel
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        autoPlay
        showIndicators={false}
        interval={3000}
      >
        {images.map((image) => (
          <ImageContainer key={image}>
            <img src={image} alt="" />
          </ImageContainer>
        ))}
      </Carousel>
      <Container>
        <TaglineContainer>
          <h1>
            Learn <strong>Computer Networking</strong> Now
          </h1>
          <h2>Learn from top Universities in the world</h2>
          <HashLink smooth to="#explore-courses">
            <Button variant="contained" color="primary">
              Explore Courses
            </Button>
          </HashLink>
        </TaglineContainer>
      </Container>
    </>
  );
};

export default memo(WelcomeSection);
