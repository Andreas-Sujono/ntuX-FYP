import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProfileTab from './ProfileTab';
import ChangePasswordTab from './ChangePasswordTab';
import { Button, Divider, Grid, Typography } from '@mui/material';

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsContainer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', background: 'white', minHeight: '500px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          <Tab label="Logout" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePasswordTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h6">
            Logout
          </Typography>
          <Divider sx={{ mb: 2, mt: 0.5 }} />
        </Grid>
        <Typography variant="body1" gutterBottom>
          We&apos;ll miss you
        </Typography>
        <Button variant="contained" sx={{ mt: 1.5, mb: 2 }}>
          Logout
        </Button>
      </TabPanel>
    </Box>
  );
}
