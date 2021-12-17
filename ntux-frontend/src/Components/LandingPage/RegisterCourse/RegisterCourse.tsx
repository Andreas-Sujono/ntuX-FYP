import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { StyledBox, StyledForm, BackgroundContainer } from './Styles';

export default function RegisterCoursePage() {
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
    <Container component="main" maxWidth="md">
      <BackgroundContainer />
      <StyledBox>
        <Typography component="h1" variant="h5" className="title">
          Online Application Form:
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          align="center"
          sx={{ color: '#C63044' }}
          className="subtitle"
        >
          EE0117: Computer Networking I (20 Oct 2021 - 27 Oct 2021)
        </Typography>
        <StyledForm component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h3" variant="h6">
                Participant Details
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
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

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h3" variant="h6">
                Account Details
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="Email"
                type="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="confirmEmail"
                type="email"
                label="Confirm Email Address"
                name="confirmEmail"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h5"
                variant="body2"
                sx={{ color: 'text.tertiary' }}
              >
                *Email Address will be used as the login credentials, a
                temporary password will be given upon successfull registration.
                You need to wait 2-3 working days
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h3" variant="h6">
                Declaration
              </Typography>
              <Divider sx={{ mb: 1, mt: 0.5 }} />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I declare that the above information submitted is accurate."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h5"
                variant="body2"
                sx={{ color: 'text.tertiary', mt: -2 }}
              >
                By Clicking on the Submit Button, I acknowledge that I have read
                and understood the Full Data Protection and Privacy Statement
                (Click Here) and declare that I am authorised to make this
                submission on behalf of the Company/Organisation. The
                Company/Organisation (a) agrees that the personal data of the
                individual(s) may be collected, used and disclosed by NTU for
                the Purposes stated in the Statement, and (b) warrants that it
                is validly acting on behalf of the individual(s).
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </StyledForm>
      </StyledBox>
    </Container>
  );
}
