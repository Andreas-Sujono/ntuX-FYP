import styled from 'styled-components';

export const Container = styled.div`
  padding: 36px;
  width: 100%;
  .title {
    font-weight: bold;
    font-size: 24px;
  }
  .subtitle {
    font-size: 18px;
    color: #888686;
    margin-top: 6px;
  }
`;

export const FeaturedMajorBox = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #ae1b1b;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 32px;
  max-height: 200px;
  max-width: 1100px;
  cursor: pointer;

  .details {
    padding: 12px 24px;
    width: 70%;
    color: #888686;
    font-size: 16px;
  }
  .name {
    font-weight: bold;
    font-size: 24px;
    color: #000000;
  }
  .course {
    margin-top: 8px;
  }
  ul {
    display: flex;
    flex-flow: column wrap; /* flex-direction: column */
    height: 110px;
    margin: 0;
    font-size: 15px;
    li {
      margin-top: 2px;
    }
  }
  img {
    width: 30%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const MajorRow = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  margin-top: 40px;
  max-width: 1100px;
`;

export const MajorBox = styled.div`
  background: #3a0851;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  height: 220px;
  cursor: pointer;

  .name {
    font-weight: bold;
    font-size: 24px;
  }
  .coming-soon {
    font-size: 24px;
    color: #888686;
    margin-top: 100px;
  }
`;
