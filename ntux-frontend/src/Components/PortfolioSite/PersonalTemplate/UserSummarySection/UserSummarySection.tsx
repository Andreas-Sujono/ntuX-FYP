import React from 'react';
import { Container, BackgroundImage, AboutContainer } from './Styles';

const backgroundImages = [
  'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
  'https://www.techrepublic.com/a/hub/i/r/2021/02/05/2c503225-0fb7-447f-8f34-facda0dc4472/resize/1200x/cda20270e6cc67f471f748edf15cba0f/smash-3.jpg',
  'https://www.techrepublic.com/a/hub/i/2021/02/05/5e274c2d-a892-45d5-8354-361ad5e86a46/smash-4.jpg',
];

const Header = ({ data }: any) => {
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  const defaultDesc = `Hi, I'm ${data.fullName}! I'm a ${data.jobRole}. Contact me at ${data.email}`;
  return (
    <>
      <BackgroundImage src={data.portfolio?.bannerImageUrl || randomImage} />

      <Container>
        <div>
          <h2>
            Hi, I&apos;m {data.fullName}&nbsp;
            <span role="img" aria-label="Emoji">
              👋
            </span>
          </h2>
        </div>
        <div>
          <h1>{data.jobRole || 'Student'}</h1>
        </div>
        <div>
          <p>{data.headerParagraph}</p>
        </div>
        <div>
          <a href={`mailto:${data.email}`} className="primary-btn">
            CONNECT WITH ME
          </a>
        </div>
      </Container>

      <AboutContainer>
        <div className="content">
          <div>
            <h1>About Me</h1>
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>
            {data.description || data.portfolio?.description || defaultDesc}
          </p>
        </div>
        <div className="image-wrapper">
          <img
            src={
              data.portfolio?.profileImageUrl || data.currentAvatar?.imageUrl
            }
            alt="about"
          ></img>
        </div>
      </AboutContainer>
    </>
  );
};

export default Header;
