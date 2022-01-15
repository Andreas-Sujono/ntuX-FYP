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
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 45vh;

  h2 {
    font-size: 2rem;
    text-align: center;
    @include media('>=phone', '<lgphone') {
      font-size: 14px;
    }
    @include media('>=lgphone', '<tablet') {
      font-size: 16px;
    }
    @include media('>=tablet', '<desktop') {
      font-size: 16px;
    }
  }
  h1 {
    font-size: 3rem;
    text-align: center;
    @include media('>=phone', '<lgphone') {
      font-size: 1.5rem;
      line-height: 10px;
    }
    @include media('>=lgphone', '<tablet') {
      font-size: 1.5rem;
      line-height: 10px;
    }
    @include media('>=tablet', '<desktop') {
      font-size: 2.5rem;
    }
  }

  p {
    width: 50%;
    text-align: center;
    overflow: hidden;
    @include media('>=phone', '<lgphone') {
      font-size: 12px;
      width: 100%;
    }
    @include media('>=lgphone', '<tablet') {
      font-size: 12px;
      width: 100%;
    }
    @include media('>=tablet', '<desktop') {
      font-size: 14px;
      width: 100%;
    }
  }
  .primary-btn {
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

  h2 {
    font-size: 1rem;
    text-align: center;
    @include media('>=phone', '<lgphone') {
      font-size: 14px;
    }
    @include media('>=lgphone', '<tablet') {
      font-size: 16px;
    }
    @include media('>=tablet', '<desktop') {
      font-size: 16px;
    }
  }
  .heading-wrapper {
    h1 {
      font-size: 4rem;
      text-align: center;
      line-height: 20px;
      @include media('>=phone', '<lgphone') {
        font-size: 1.5rem;
        line-height: 10px;
      }
      @include media('>=lgphone', '<tablet') {
        font-size: 1.5rem;
        line-height: 10px;
      }
      @include media('>=tablet', '<desktop') {
        font-size: 2.5rem;
      }
    }
  }
  p {
    overflow: hidden;
    @include media('>=phone', '<lgphone') {
      font-size: 12px;
      width: 100%;
    }
    @include media('>=lgphone', '<tablet') {
      font-size: 12px;
      width: 100%;
    }
    @include media('>=tablet', '<desktop') {
      font-size: 14px;
      width: 100%;
    }
  }
  @media Screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;
