import React, { memo } from 'react';
import { User } from 'Models/Auth';
import {
  Container,
  ImageContainer,
  ProfileDetails,
  FollowersText,
} from './Styles';

interface Props {
  user: User;
}

const ProfileWidget: React.FC<Props> = ({ user }: Props) => {
  return (
    <Container>
      <ImageContainer>
        <img src={user.profileImage} alt="" />
      </ImageContainer>
      <ProfileDetails>
        <div className="name">{user.fullName}</div>
        <div className="role">{user.role}</div>
        <div className="details">
          {user.email} | {user.phoneNumber}
        </div>
      </ProfileDetails>
      <FollowersText>
        Followers: <span>{user.followersCount || 0}</span>
      </FollowersText>
      <FollowersText>
        Followings: <span>{user.followingsCount || 0}</span>
      </FollowersText>
    </Container>
  );
};

export default memo(ProfileWidget);
