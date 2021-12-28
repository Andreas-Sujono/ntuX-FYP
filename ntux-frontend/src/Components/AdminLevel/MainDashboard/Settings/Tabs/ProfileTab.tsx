import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
// import { StyledBox, StyledForm, BackgroundContainer } from './Styles';

export default function ProfileTab() {
  const user = useSelector(selectUser);

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
    <Container component="main" maxWidth="md" style={{ padding: 0 }}>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h3" variant="h6">
              Profile Details
            </Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} sm={12}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="Email"
              type="email"
              name="email"
              value={user.email}
              disabled
              label="Email Address"
              variant="filled"
              defaultValue={user.email}
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
              defaultValue={user.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="familyName"
              label="Family Name"
              name="familyName"
              defaultValue={user.familyName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="givenName"
              label="Given Name"
              name="givenName"
              defaultValue={user.givenName}
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
              defaultValue={user.nationality}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  );
}
