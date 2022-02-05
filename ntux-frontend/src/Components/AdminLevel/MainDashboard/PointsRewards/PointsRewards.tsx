import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Typography } from '@mui/material';
import { TopBox } from './Styles';
import {
  HowToGetPoints,
  RewardsGallery,
  RewardHistoryTable,
  RewardDetailsModal,
  AvatarShop,
} from './components';
import { LinearProgressWithLabel } from '../MyCourses/Styles';
import { getLevelAndBadges } from 'common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
import {
  getAvatars,
  getRewards,
  getRewardsRedeemed,
} from 'Store/Actions/pointsRewards';
import { getMyAccount } from 'Store/Actions/auth';

export default function PointsRewards() {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onClickRewardDetails = (data: any) => {
    setModalData(data);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getRewards());
    dispatch(getRewardsRedeemed());
    dispatch(getAvatars());
    dispatch(getMyAccount());
  }, []);

  const data = getLevelAndBadges(user.totalExps);

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 8, ml: 1, pr: 1 }}>
      <RewardDetailsModal open={open} setOpen={setOpen} data={modalData} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBox>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item sx={{ maxWidth: '50px' }}>
                <MilitaryTechIcon
                  sx={{ fontSize: '3rem', color: data.badgeColor }}
                />
              </Grid>
              <Grid item xs={10} md={5} sx={{ ml: 2 }}>
                <Typography component="h5" variant="h6">
                  Level {data.level} ({data.bagdesLabel})
                </Typography>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={data.progress}
                  label={`${user.totalExps} / ${data.nextLevelExp} Exp`}
                  sx={{ mt: 0 }}
                  type="string"
                  minWidth={100}
                />
              </Grid>
              <Grid item xs={12} md={5} className="grid-item-2">
                <Typography
                  component="h3"
                  variant="h5"
                  sx={{ mt: 1, color: '#C63044' }}
                >
                  Your Points:&nbsp;
                  <strong>
                    {user.totalPoints} <small>pts</small>
                  </strong>
                </Typography>
                <Typography component="h5" variant="body1" sx={{ mt: 0 }}>
                  Keep contributing to the community to earn more points
                </Typography>
              </Grid>
            </Grid>
          </TopBox>
        </Grid>
        <Grid item xs={12}>
          <RewardsGallery onClickRewardDetails={onClickRewardDetails} />
        </Grid>

        <Grid item xs={12} lg={12}>
          <AvatarShop />
        </Grid>
        <Grid item xs={12} lg={8}>
          <RewardHistoryTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <HowToGetPoints />
        </Grid>
      </Grid>
    </Container>
  );
}
