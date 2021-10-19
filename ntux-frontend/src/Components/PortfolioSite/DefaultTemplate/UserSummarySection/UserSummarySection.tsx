import React, { memo } from 'react';
import SocialMediaShare from '../../../../common/Components/SocialMediaShare';
import { UserSummary } from '../../../../Models/PortfolioSite';
import {
  Container,
  BackgroundImage,
  Content,
  TopContentRow,
  TopContentLeftSection,
  TopContentRightSection,
  BottomContent,
} from './Styles';

interface Props {
  data: UserSummary;
}

const UserSummarySection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <BackgroundImage src={data.backgroundImage} />

      <Content>
        <TopContentRow>
          <TopContentLeftSection>
            <img className="profile-image" src={data.profileImage} />
            <div className="name">{data.fullName}</div>
            <div className="role">{data.role}</div>
            <div className="contact">
              {data.email} | {data.phoneNumber}
            </div>
          </TopContentLeftSection>
          <TopContentRightSection>
            <SocialMediaShare />
          </TopContentRightSection>
        </TopContentRow>
        <BottomContent>{data.description}</BottomContent>
      </Content>
    </Container>
  );
};

export default memo(UserSummarySection);
