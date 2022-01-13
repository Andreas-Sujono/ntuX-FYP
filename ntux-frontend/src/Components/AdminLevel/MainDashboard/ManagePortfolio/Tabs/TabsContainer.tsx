import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BasicDetailsForm from './BasicDetailsForm';
import EducationForm from './EducationForm';
import WorkExperienceForm from './WorkExperienceForm';
import { useThunkDispatch } from 'common/hooks';
import { logout } from 'Store/Actions/auth';

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
    <Box sx={{ background: 'transparent', minHeight: '100px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Basic Details" {...a11yProps(0)} />
          <Tab label="Education" {...a11yProps(1)} />
          <Tab label="Work Experience" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicDetailsForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EducationForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WorkExperienceForm />
      </TabPanel>
    </Box>
  );
}
