import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Divider, TextField, Button } from '@mui/material';
import { CourseCard } from 'Components/AdminLevel/MainDashboard/MyCourses/MyCourses';

export default function CourseEnrolled({ data }: any) {
  console.log('data in CourseEnrolled', data);
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography component="h3" variant="h6">
        Courses Enrolled
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.2 }} />
      <Grid container spacing={3}>
        {data.map((item: any) => (
          <Grid
            item
            xs={12}
            md={6}
            sx={{ marginLeft: 0 }}
            key={item.id}
            onClick={(e) => e.stopPropagation()}
          >
            <CourseCard
              course={item.course}
              courseBatch={item.courseBatch}
              notGo
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export function BasicDetails({ data }: any) {
  const [formData, setFormData] = useState(data || {});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
  };

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  return (
    <Paper sx={{ mt: 3, p: 2, maxWidth: '1080px' }}>
      <Typography component="h3" variant="h6">
        Student Basic Details
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.2 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name (as shown in NRIC/ FIN/ Passport)"
            value={formData.fullName}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="familyName"
            label="Family Name"
            name="familyName"
            value={formData.familyName}
            onChange={onUpdate}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="givenName"
            label="Given Name"
            name="givenName"
            value={formData.givenName}
            onChange={onUpdate}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="citizenship"
            label="Citizenship"
            name="citizenship"
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="nationality"
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={onUpdate}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={onUpdate}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Button variant="contained">Update</Button>
          <Button>Cancel</Button>
        </Grid> */}
      </Grid>
    </Paper>
  );
}
