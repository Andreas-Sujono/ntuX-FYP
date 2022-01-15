import styled from 'styled-components';
import { PaddedContainer } from '../shared.styles';

export const BackgroundImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  .particle {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
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
    background: rgba(227, 27, 109, 0.5);
    color: white;
    padding: 1rem 2rem;
  }
  .Header p {
    margin-top: 0;
    font-size: 2rem;
    background: rgba(227, 27, 109, 0.5);
    padding: 0.5rem 1.5rem;
    color: white;
  }
`;
