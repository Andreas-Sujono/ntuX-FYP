import styled from 'styled-components';

export const Container = styled.div`
  background: #f3f1f1;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.09);
  border-radius: 8px;
  max-width: 530px;
`;

export const ImageContainer = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ProfileDetails = styled.div`
  .name {
    font-weight: bold;
    font-size: 24px;
  }
  .role {
    margin-top: 0.3em;
  }
  .details {
    font-size: 14px;
    line-height: 17px;
    color: #6f6f6f;
    margin-top: 0.2em;
  }
  margin-bottom: 40px;
`;

export const FollowersText = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #6f6f6f;

  span {
    color: black;
  }
`;
