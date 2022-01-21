import styled from 'styled-components';
import { PaddedContainer } from '../shared.styles';

export const BackgroundImage = styled.div<any>`
  background-image: url(${(props) => props.src});

  /* Set a specific height */
  max-width: 100vw;
  min-height: 100vh;
  width: 100%;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
`;

export const Container = styled.div`
  .Header {
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Montserrat, sans-serif;
    z-index: 2;
    position: relative;
  }
  .Header h1 {
    color: #000;
    text-align: center;
    font-size: 4rem;
    background: rgba(227, 27, 109, 0.2);
    color: white;
    padding: 1rem 2rem;

    @media screen and (max-width: 768px) {
      font-size: 2.5rem;
      padding: 1rem 1rem;
    }
  }
  .Header p {
    margin-top: 0;
    font-size: 2rem;
    background: rgba(227, 27, 109, 0.1);
    padding: 0.5rem 1.5rem;
    color: white;
  }
`;

export const AboutContainer = styled(PaddedContainer)`
  margin-top: 8vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 20vh;
  white-space: pre-line;
  column-gap: 2rem;
  row-gap: 2rem;
  padding: 1em 16px;

  > div {
    flex: 3 1 0;
  }
  .image-wrapper {
    flex: 1 1 0;
    img {
      display: block;
      margin: auto;
    }
  }

  .h2 {
    font-size: 1rem;
    text-align: center;
    @media Screen and (max-width: 680px) {
      font-size: 1rem;
    }
  }
  .h1 {
    font-size: 2.5rem;
    @media Screen and (max-width: 680px) {
      font-size: 2rem;
    }
  }
  p {
    overflow: hidden;
  }
  @media Screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 5vh;
  }
`;
