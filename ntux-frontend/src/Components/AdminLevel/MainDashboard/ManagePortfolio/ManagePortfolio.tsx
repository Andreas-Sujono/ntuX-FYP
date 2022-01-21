import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TabsContainer from './Tabs/TabsContainer';
import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { useSelector } from 'react-redux';
import { selectPortfolio, selectUserId } from 'Store/Selector/auth';
import { useThunkDispatch } from 'common/hooks';
import { updatePortfolio } from 'Store/Actions/auth';

function ManagePortfolio() {
  const [hideNav, setHideNav] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const userId = useSelector(selectUserId);
  const userPortfolio = useSelector(selectPortfolio);
  const dispatch = useThunkDispatch();

  const isPremium = !!userPortfolio?.user?.premiumSetting;
  const portfolioDetails = userPortfolio?.user?.portfolio || {};

  const isAndreasServer = window.location.origin.includes('andreassujono');
  const portfolioUrl = `${window.location.origin}/${
    isAndreasServer ? 'ntux/' : ''
  }#/portfolio/${userId}${hideNav ? '?hideNav=true&hideFooter=true' : ''}`;

  useEffect(() => {
    if (portfolioDetails.hideNav && !firstLoad) {
      setHideNav(!!portfolioDetails.hideNav);
      setFirstLoad(true);
    }
  }, [portfolioDetails.hideNav]);

  const onUpdate = (data) => {
    dispatch(updatePortfolio(data));
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          lg={8}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 3,
            },
          })}
        >
          <TabsContainer />
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 1,
            },
          })}
        >
          <Paper sx={{ p: 2 }}>
            <TextField
              label="Portfolio Url"
              value={portfolioUrl}
              fullWidth
              disabled
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton edge="end">
              //       <ContentCopyIcon />
              //     </IconButton>
              //   </InputAdornment>
              // }
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => copy(portfolioUrl)}
                  >
                    <IconButton edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />

            <Button onClick={() => window.open(portfolioUrl)}>
              Preview Portfolio
            </Button>

            <Divider sx={{ mb: 2, mt: 0.5 }} />

            <Typography variant="h6" sx={{ mt: 0 }}>
              Premium Setting
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 0, mb: 2 }}
              color="text.secondary"
            >
              Buy premium service in the points and rewards section.
              {/* With
              premium service, you can choose a portfolio template and hide the
              nav bar and footer in default */}
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  checked={hideNav}
                />
              }
              label="Hide Navbar and Footer by default"
              sx={{ display: 'block', mb: 2 }}
              value={hideNav}
              onChange={() => {
                onUpdate({
                  hideNav: !hideNav,
                });
                setHideNav(!hideNav);
              }}
              disabled={!isPremium}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend" disabled={!isPremium}>
                Portfolio Theme
              </FormLabel>
              <RadioGroup
                aria-label="theme"
                defaultValue={portfolioDetails.theme || 'DEFAULT'}
                name="radio-buttons-group"
                onChange={(e) => {
                  onUpdate({
                    theme: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value="DEFAULT"
                  control={<Radio />}
                  label="Default"
                  disabled={!isPremium}
                />
                <FormControlLabel
                  value="PERSONAL"
                  control={<Radio />}
                  label="Personal Website"
                  disabled={!isPremium}
                />
                <FormControlLabel
                  value="FULL_PAGE"
                  control={<Radio />}
                  label="Full Page"
                  disabled={!isPremium}
                />
              </RadioGroup>
            </FormControl>

            {/* <Button>Portfolio Settings</Button> */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManagePortfolio;
