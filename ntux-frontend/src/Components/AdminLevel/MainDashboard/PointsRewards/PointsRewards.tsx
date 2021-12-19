import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TopBox } from './Styles';
import { Typography } from '@mui/material';

export default function PointsRewards() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBox>
            <Typography
              component="h3"
              variant="h4"
              sx={{ mt: 1, color: '#C63044' }}
            >
              Your Points:&nbsp;
              <strong>
                0 <small>pts</small>
              </strong>
            </Typography>
            <Typography component="h5" variant="body1" sx={{ mt: 1 }}>
              Keep contributing to the community to earn more points
            </Typography>
          </TopBox>
        </Grid>
      </Grid>
    </Container>
  );
}
