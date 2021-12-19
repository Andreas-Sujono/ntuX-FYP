import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { TopBox } from './Styles';
import {
  ProfileBox,
  TopTutor,
  TutorListBox,
  RequestHistory,
  OfferHistory,
} from './components';

export default function StudentTutoring() {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const onClickRewardDetails = (data: any) => {
    setModalData(data);
    setOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      {/* <RewardDetailsModal open={open} setOpen={setOpen} data={modalData} /> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TopBox>
            <Grid container>
              <Grid item xs={10} md={8}>
                <ProfileBox />
              </Grid>
              <Grid item xs={12} md={4} className="grid-item-2">
                <Button variant="contained">Request to be a tutor</Button>
              </Grid>
            </Grid>
          </TopBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <TopTutor />
        </Grid>
        <Grid item xs={12}>
          <TutorListBox />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RequestHistory />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OfferHistory />
        </Grid>
      </Grid>
    </Container>
  );
}
