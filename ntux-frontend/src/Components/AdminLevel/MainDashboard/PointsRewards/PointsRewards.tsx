import React from 'react';
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
} from './components';
import { LinearProgressWithLabel } from '../MyCourses/Styles';

export default function PointsRewards() {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const onClickRewardDetails = (data: any) => {
    setModalData(data);
    setOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 8, ml: 1, pr: 1 }}>
      <RewardDetailsModal open={open} setOpen={setOpen} data={modalData} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBox>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={1} sx={{ maxWidth: '50px' }}>
                <MilitaryTechIcon sx={{ fontSize: '3rem', color: 'gold' }} />
              </Grid>
              <Grid item xs={10} md={5} sx={{ ml: 2 }}>
                <Typography component="h5" variant="h6">
                  Level 3 (Gold)
                </Typography>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={50}
                  label="680 / 1000 exp"
                  sx={{ mt: 0 }}
                  type="string"
                  minWidth={100}
                />
              </Grid>
              <Grid item xs={12} md={6} className="grid-item-2">
                <Typography
                  component="h3"
                  variant="h5"
                  sx={{ mt: 1, color: '#C63044' }}
                >
                  Your Points:&nbsp;
                  <strong>
                    0 <small>pts</small>
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
