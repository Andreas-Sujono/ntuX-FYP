import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Divider, TextField, Button } from '@mui/material';
import { CourseCard } from 'Components/AdminLevel/MainDashboard/MyCourses/MyCourses';

export default function CourseEnrolled() {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography component="h3" variant="h6">
        Courses Enrolled
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.2 }} />
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={6} sx={{ marginLeft: 0 }}>
          <CourseCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CourseCard />
        </Grid> */}
      </Grid>
    </Paper>
  );
}

export function BasicDetails() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Paper sx={{ mt: 3, p: 2, maxWidth: '1080px' }}>
      <Typography component="h3" variant="h6">
        Student Basic Details
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.2 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name (as shown in NRIC/ FIN/ Passport)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="familyName"
            label="Family Name"
            name="familyName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="givenName"
            label="Given Name"
            name="givenName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="citizenship"
            label="Citizenship"
            name="citizenship"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="nationality"
            label="Nationality"
            name="nationality"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained">Update</Button>
          <Button>Cancel</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
