import styled from 'styled-components';
import { PaddedContainer } from '../shared.styles';

export const BackgroundImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  @media Screen and (max-width: 680px) {
    height: 20vh;
  }
`;

export const Container = styled.div`
  margin-top: 6vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 45vh;
  z-index: 2;
  position: relative;
  .h2 {
    font-size: 2rem;
    text-align: center;

    @media Screen and (max-width: 680px) {
      font-size: 1.5rem;
    }
  }
  .h1 {
    font-size: 3rem;
    text-align: center;

    @media Screen and (max-width: 680px) {
      font-size: 2rem;
    }
  }

  .p {
    width: 50%;
    text-align: center;
    overflow: hidden;
  }
  .primary-btn1 {
    margin: 10px;
    padding: 10px;
    margin-top: 2rem;
    display: inline-block;
    background-color: black;
    color: white;
    border: 0px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    @media Screen and (max-width: 680px) {
      margin-top: 1rem;
    }
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
