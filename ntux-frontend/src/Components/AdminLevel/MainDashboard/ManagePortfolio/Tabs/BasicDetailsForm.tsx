import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPortfolio, selectUser } from 'Store/Selector/auth';
import { FileInput } from 'common/Components/Input';
import { useThunkDispatch } from 'common/hooks';
import { updateAccount, updatePortfolio } from 'Store/Actions/auth';
import { uploadFile } from 'Store/Actions/admin';

export default function BasicDetailsForm() {
  const user = useSelector(selectUser);
  const userPortfolio = useSelector(selectPortfolio);
  const portfolio = userPortfolio?.user?.portfolio || {};
  const [bannerFileData, setBannerFileData] = useState<any>(null);
  const [profileFileData, setProfileFileData] = useState<any>(null);

  const dispatch = useThunkDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      phoneNumber: data.get('phoneNumber'),
      jobRole: data.get('jobRole'),
    };
    const portfolioData: any = {
      description: data.get('description'),
    };

    if (bannerFileData?.file) {
      const { url } = await dispatch(uploadFile(bannerFileData?.file));
      portfolioData.bannerImageUrl = url;
    }
    if (profileFileData?.file) {
      const { url } = await dispatch(uploadFile(profileFileData?.file));
      portfolioData.profileImageUrl = url;
    }

    dispatch(
      updatePortfolio({
        ...portfolioData,
      }),
    );

    dispatch(
      updateAccount({
        ...userData,
      } as any),
    );
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
          <Typography
            component="h3"
            variant="h6"
            sx={{ display: 'inline-block', width: 'calc(100% - 120px)' }}
          >
            Basic Details
          </Typography>
          <Button variant="contained" type="submit">
            Update
          </Button>
          {/* <Button>Cancel</Button> */}
          <Divider sx={{ mb: 2, mt: 1.5 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileInput
            label="Banner Image"
            onChange={setBannerFileData}
            value={bannerFileData?.url || portfolio?.bannerImageUrl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileInput
            label="Profile Image"
            onChange={setProfileFileData}
            value={
              profileFileData?.url ||
              user.profileImageUrl ||
              portfolio?.profileImageUrl
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            size="medium"
            defaultValue={user.fullName}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="jobRole"
            label="Job Role"
            name="jobRole"
            size="medium"
            defaultValue={user.jobRole}
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
            defaultValue={user.email}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            size="medium"
            defaultValue={user.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="description"
            label="About Me"
            type="textarea"
            name="description"
            rows={10}
            multiline
            defaultValue={portfolio.description}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
