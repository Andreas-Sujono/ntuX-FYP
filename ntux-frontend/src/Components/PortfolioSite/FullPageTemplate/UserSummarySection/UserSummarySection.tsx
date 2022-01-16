import { PageContentContainer } from 'Components/shared/Shared.styles';
import React from 'react';
import { Container, BackgroundImage, AboutContainer } from './Styles';

const backgroundImages = [
  'https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU',
  'https://images2.alphacoders.com/993/993073.jpg',
];

const Header = ({ data }: any) => {
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  // const defaultDesc = `Hi, I'm ${data.fullName}! I'm a ${data.jobRole}. Contact me at ${data.email}`;

  const scrollTo = () => {
    window.scrollTo({
      top: 100000,
      left: 0,
      behavior: 'smooth',
    });
  };
  const defaultDesc = `Hi, I'm ${data.fullName}! I'm a ${data.jobRole}. Contact me at ${data.email}`;

  return (
    <Container>
      <BackgroundImage src="https://wallpaperaccess.com/full/5651990.jpg" />
      <div className="Header">
        <h1>{`I'm ${data.fullName}`}</h1>
        <p>{data.jobRole || 'Student'} </p>
      </div>
      <PageContentContainer>
        <AboutContainer>
          <div className="content">
            <div>
              <h1 className="h1">About Me</h1>
            </div>
            <p style={{ whiteSpace: 'pre-line' }} className="p">
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
      </PageContentContainer>
    </Container>
  );
};

export default Header;
