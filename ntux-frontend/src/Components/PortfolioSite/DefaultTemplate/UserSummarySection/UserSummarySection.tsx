import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { memo } from 'react';
import Grid from '@mui/material/Grid';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Typography } from '@mui/material';
import {
  Container,
  BackgroundImage,
  Content,
  TopContentRow,
  TopContentLeftSection,
  TopContentRightSection,
  BottomContent,
} from './Styles';
import { LinearProgressWithLabel } from 'Components/AdminLevel/MainDashboard/MyCourses/Styles';
import { getLevelAndBadges } from 'common/utils';

interface Props {
  data: any;
}

const backgroundImages = [
  'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg',
  'https://www.komando.com/wp-content/uploads/2018/11/dreamstime_m_87808373.jpg',
  'https://wallpaperaccess.com/full/2040033.jpg',
];

const UserSummarySection: React.FC<Props> = ({ data }: Props) => {
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  const portfolio = data.portfolio || {};

  const pointData = getLevelAndBadges(data.totalExps);

  return (
    <Container>
      <BackgroundImage src={portfolio.bannerImageUrl || randomImage} />

      <Content>
        <TopContentRow>
          <TopContentLeftSection>
            <Avatar
              alt={data?.fullName?.toUpperCase()}
              src={
                data.profileImageUrl ||
                portfolio.profileImageUrl ||
                data?.currentAvatar?.imageUrl ||
                '#'
              }
              sx={{
                width: 160,
                height: 160,
                fontSize: '5rem',
                bgcolor: green[500],
              }}
              className="profile-image"
            />

            {/* <img
              className="profile-image"
              src={data.profileImageUrl || portfolio.profileImageUrl}
            /> */}
            <div className="name">{data.fullName}</div>
            <div className="role">{data.jobRole || 'Student'}</div>
            <div className="contact">
              {data.email}
              {data.phoneNumber && `| ${data.phoneNumber}`}
            </div>
          </TopContentLeftSection>
          <TopContentRightSection>
            <Grid container sx={{ alignItems: 'center', width: '100%' }}>
              <Grid item xs={1} sx={{ maxWidth: '50px' }}>
                <MilitaryTechIcon
                  sx={{ fontSize: '3rem', color: pointData.badgeColor }}
                />
              </Grid>
              <Grid item xs={10} md={10} sx={{ ml: 2 }}>
                <Typography component="h5" variant="h6">
                  Level {pointData.level} ({pointData.bagdesLabel})
                </Typography>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={pointData.progress}
                  label={`${data.totalExps} / ${pointData.nextLevelExp} Exp`}
                  sx={{ mt: 0 }}
                  type="string"
                  minWidth={100}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} className="grid-item-2">
                <Typography
                  component="h3"
                  variant="h5"
                  sx={{ mt: 1, color: '#C63044' }}
                >
                  Your Points:&nbsp;
                  <strong>
                    {data.totalPoints} <small>pts</small>
                  </strong>
                </Typography>
                <Typography component="h5" variant="body1" sx={{ mt: 0 }}>
                  Keep contributing to the community to earn more points
                </Typography>
              </Grid> */}
            </Grid>
          </TopContentRightSection>
        </TopContentRow>
        <BottomContent>
          {portfolio.description || 'No Description'}
        </BottomContent>
      </Content>
    </Container>
  );
};

export default memo(UserSummarySection);
