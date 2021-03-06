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
import { useThunkDispatch } from 'common/hooks';
import { updateAccount } from 'Store/Actions/auth';
import { toast } from 'react-toastify';
import { uploadFile } from 'Store/Actions/admin';
// import { StyledBox, StyledForm, BackgroundContainer } from './Styles';

export default function ProfileTab() {
  const user = useSelector(selectUser);
  const dispatch = useThunkDispatch();
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData: any = {
      // profileImage: data.get('profileImage') as string,
      fullName: data.get('fullName') as string,
      familyName: data.get('familyName') as string,
      givenName: data.get('givenName') as string,
      nationality: data.get('nationality') as string,
    };

    //basic validation
    if (
      !formData.fullName ||
      !formData.familyName ||
      !formData.givenName ||
      !formData.nationality
    ) {
      return toast.error('Please fill all the field');
    }

    if (file) {
      const { url } = await dispatch(uploadFile(file));
      formData.profileImageUrl = url;
    }

    setLoading(true);
    await dispatch(updateAccount(formData));
    setLoading(false);
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
          {/* <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="file"
              type="file"
              name="file"
              label="Profile Image"
              // variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="imageUrl"
              type="file"
              name="imageUrl"
              label="Change Profile Image"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: any) =>
                e.target.files[0] && setFile(e.target.files[0])
              }
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
          disabled={loading}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  );
}
