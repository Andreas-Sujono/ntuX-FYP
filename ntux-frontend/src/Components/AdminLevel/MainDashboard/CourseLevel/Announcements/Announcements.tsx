import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider } from '@mui/material';

export default function AnnouncementsContent() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 6, ml: 1, mr: 1 }}>
      <Grid container sx={{ pr: 2 }}>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">
              Lesson starts on 27th December 2021
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Modern industrial processes are large, complex and have high
              degree of interaction with many variables. This makes problem
              solving difficult and leads to “disappearing problem” syndrome.
              Problem often disappear without solving will reappear again.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">
              If you have any question, you can visit the forum discussion
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Visit forum discussion here
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">
              Read lesson 1 before the lesson starts
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Modern industrial processes are large, complex and have high
              degree of interaction with many variables. This makes problem
              solving difficult and leads to “disappearing problem” syndrome.
              Problem often disappear without solving will reappear again.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
