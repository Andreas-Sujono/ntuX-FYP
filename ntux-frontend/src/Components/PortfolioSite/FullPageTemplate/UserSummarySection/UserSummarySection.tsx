import React from 'react';
import { Container } from './Styles';

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

  return (
    <Container>
      <img
        src={data.portfolio?.bannerImageUrl || randomImage}
        alt="background"
        className="particle"
      />
      <div className="Header">
        <h1>{`I'm ${data.fullName}`}</h1>
        <p>{data.jobRole || 'Student'} </p>
      </div>
    </Container>
  );
};

export default Header;
