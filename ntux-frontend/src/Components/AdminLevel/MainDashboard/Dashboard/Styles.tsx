import styled from 'styled-components';

export const Container = styled.div`
  padding: 36px;
  width: 100%;
  max-width: 1280px;
`;

export const TopBox = styled.div`
  width: 100%;
  background: radial-gradient(
    49.21% 1381.48% at 50.79% 50.26%,
    #919191 0%,
    rgba(0, 0, 0, 0.83) 100%
  );
  border-radius: 16px;
  padding: 36px;
  box-sizing: border-box;

  .title {
    font-size: 28px;
    color: #ffffff;
  }
  .subtitle {
    font-size: 18px;
    color: #cab9b9;
    margin-top: 4px;
  }
`;

export const Content = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template: auto / 65% 30%;
  align-items: flex-start;
  justify-content: flex-start;
  grid-column-gap: 40px;
`;

export const FeatureBox = styled.div`
  padding: 16px 24px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  > *:first-child {
    margin-right: 16px;
  }

  img {
    width: 150px;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    background: -webkit-linear-gradient(#6699ff, #ff3366);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    font-size: 18px;
    color: #525252;
    margin-top: 4px;
  }
`;

export const ChecklistContainer = styled.div`
  padding: 16px 24px;
  border: 1px solid #d7d7d7;
  border-radius: 16px;
  /* color: #888686; */
  .name {
    color: black;
    font-weight: bold;
    font-size: 18px;
  }
  ol {
    padding: 0;
    padding-left: 16px;
    li {
      margin-bottom: 8px;
    }
  }
  a {
    font-weight: bold;
    color: #6298e9;
  }
`;
