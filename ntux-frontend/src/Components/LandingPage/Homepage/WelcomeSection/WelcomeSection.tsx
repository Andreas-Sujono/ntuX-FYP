import React, { memo } from 'react';
import { Container, TaglineContainer, ImageContainer } from './Styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'common/Components/Button/PrimaryButton';

const images = [
  'https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/18ed3765-abbe-4e0f-9c95-b119a8e5eb57/Rendition/low-res/Content/Public',
  'https://live.staticflickr.com/5476/11870998636_daf8d91bb5_c.jpg',
  'https://media.gettyimages.com/photos/dusk-elevation-of-learning-hub-with-lit-interiors-ntu-nanyang-picture-id929401118?s=612x612',
  'https://thumbs.dreamstime.com/b/inside-view-hive-learning-called-dim-sum-basket-building-nanyang-technological-university-ntu-singapore-62933890.jpg',
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
        interval={2500}
      >
        {images.map((image) => (
          <ImageContainer key={image}>
            <img src={image} alt="" />
          </ImageContainer>
        ))}
      </Carousel>
      <Container>
        <TaglineContainer>
          <h1>Learn Computer Networking Now</h1>
          <h2>Learn from Top 12nd Universities in the world</h2>
          <Button color="#ae1b1b">Explore Courses</Button>
        </TaglineContainer>
      </Container>
    </>
  );
};

export default memo(WelcomeSection);
