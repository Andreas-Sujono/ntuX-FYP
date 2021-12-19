import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';

export default function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Paper component="form" noValidate onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid
        container
        spacing={{
          xs: 2,
          md: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography component="h3" variant="h6">
            Basic Details
          </Typography>
          <Divider sx={{ mb: 2, mt: 0.5 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="file"
            type="file"
            name="file"
            value=""
            label="Banner Image"
            // variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="file"
            type="file"
            name="file"
            value=""
            label="Profile Image"
            // variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name (as shown in NRIC/ FIN/ Passport)"
            autoFocus
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="Contact"
            label="Contact Number"
            name="Contact"
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="aboutMe"
            label="About Me"
            type="textarea"
            name="aboutMe"
            rows={10}
            multiline
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography component="h3" variant="h6">
            Resume
          </Typography>
          <Divider sx={{ mb: 2, mt: 0.5 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="file"
            type="file"
            name="file"
            value=""
            label="Banner Image"
            // variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
