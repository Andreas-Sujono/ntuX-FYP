import React, { memo } from 'react';
import { mockPost, mockPost2, mockPost3, mockUser } from 'Models/mockData';
import ProfileWidget from './Widgets/ProfileWidget';
import {
  BackgroundContainer,
  Container,
  LeftSection,
  CenterSection,
  RightSection,
} from './Styles';
import { OpenForAds } from 'common/Components/AdsCard';
import BasicPostWidget from './Widgets/BasicPostWidget';

const MainPage: React.FC = () => {
  return (
    <BackgroundContainer>
      <Container>
        <LeftSection>
          <ProfileWidget user={mockUser} />
        </LeftSection>
        <CenterSection>
          <BasicPostWidget post={mockPost} />
          <BasicPostWidget post={mockPost2} />
          <BasicPostWidget post={mockPost3} />
          <BasicPostWidget post={mockPost} />
        </CenterSection>
        <RightSection>
          <OpenForAds sizeRatio={0.9} />
        </RightSection>
      </Container>
    </BackgroundContainer>
  );
};

export default memo(MainPage);
