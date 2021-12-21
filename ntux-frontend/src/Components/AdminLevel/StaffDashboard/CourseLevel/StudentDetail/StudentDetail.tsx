import React from 'react';
import {
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CardHeader,
  Avatar,
  Typography,
} from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { makePath } from 'common/utils';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WebsiteTraffic from './WebsiteTraffic';
import { StyledContainer } from './Styles';
import { LinearProgressWithLabel } from 'Components/AdminLevel/MainDashboard/MyCourses/Styles';
import CourseEnrolled, { BasicDetails } from './Components';

export default function ManageStudents() {
  const history = useHistory();
  return (
    <StyledContainer
      maxWidth="xl"
      sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}
    >
      <Paper sx={{ p: 2, mb: 3 }}>
        <ListItemButton
          selected={false}
          onClick={() => {
            history.push(
              makePath(routes.STAFF_COURSES.MANAGE_STUDENTS, { courseId: 1 }),
            );
          }}
        >
          <ListItemIcon>
            <ArrowIcon sx={{ fontSize: '1rem', color: '#47A1F4' }} />
          </ListItemIcon>
          <ListItemText
            primary={'Go Back to Manage Students'}
            sx={{ fontSize: '0.5rem !important', color: '#47A1F4', ml: -2 }}
          />
        </ListItemButton>

        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={6} className="grid-item-2">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  A
                </Avatar>
              }
              title="Andreas Sujono"
              subheader="Lvl 20, Points: 150"
              size="large"
            />
          </Grid>
          <Grid item xs={1} sx={{ maxWidth: '50px' }}>
            <MilitaryTechIcon sx={{ fontSize: '3rem', color: 'gold' }} />
          </Grid>
          <Grid item xs={9} md={5} sx={{ ml: 2 }}>
            <Typography component="h5" variant="h6">
              Level 3 (Gold)
            </Typography>
            <LinearProgressWithLabel
              variant="determinate"
              value={50}
              label="680 / 1000 exp"
              sx={{ mt: 0 }}
              type="string"
              minWidth={100}
            />
          </Grid>
        </Grid>
      </Paper>

      <WebsiteTraffic />
      <CourseEnrolled />
      <BasicDetails />
    </StyledContainer>
  );
}
