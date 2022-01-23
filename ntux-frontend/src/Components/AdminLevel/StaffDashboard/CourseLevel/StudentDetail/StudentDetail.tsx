import React, { useEffect } from 'react';
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
import { useHistory, useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { getLevelAndBadges, makePath } from 'common/utils';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WebsiteTraffic from './WebsiteTraffic';
import { StyledContainer } from './Styles';
import { LinearProgressWithLabel } from 'Components/AdminLevel/MainDashboard/MyCourses/Styles';
import CourseEnrolled, { BasicDetails } from './Components';
import { useThunkDispatch } from 'common/hooks';
import { getStudentSummary } from 'Store/Actions/admin/general/courseLevel.thunk';
import { useSelector } from 'react-redux';
import { selectStudentSummaryByUserId } from 'Store/Selector/admin';

export default function ManageStudents({ userId: _userId, onGoBack }: any) {
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const match: any = useRouteMatch(routes.STAFF_COURSES.STUDENT_DETAIL) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const courseId = match?.params?.courseId;
  const userId = _userId || match?.params?.studentId;

  const allData = useSelector(selectStudentSummaryByUserId) || {};
  const data = allData[userId] || [];

  useEffect(() => {
    dispatch(getStudentSummary(userId));
  }, []);

  const pointData = getLevelAndBadges(data.totalExps || 0);

  return (
    <StyledContainer
      maxWidth="xl"
      sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}
    >
      <Paper sx={{ p: 2, mb: 3 }}>
        <ListItemButton
          selected={false}
          onClick={() => {
            if (onGoBack) return onGoBack();
            history.push(
              makePath(routes.STAFF_COURSES.MANAGE_STUDENTS, { courseId }),
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
                  {data?.fullName?.charAt(0)?.toUpperCase()}
                </Avatar>
              }
              title={data?.fullName}
              subheader={`Lvl ${pointData.level}, Points: ${data.totalPoints}`}
              size="large"
            />
          </Grid>
          <Grid item xs={1} sx={{ maxWidth: '50px' }}>
            <MilitaryTechIcon
              sx={{ fontSize: '3rem', color: pointData.badgeColor }}
            />
          </Grid>
          <Grid item xs={10} md={5} sx={{ ml: 2 }}>
            <Typography component="h5" variant="h6">
              Level {pointData.level} ({pointData.bagdesLabel})
            </Typography>
            <LinearProgressWithLabel
              variant="determinate"
              value={pointData.progress}
              label={`${data.totalExps} / ${pointData.nextLevelExp} Exp`}
              sx={{ mt: 0 }}
              type="string"
              minWidth={100}
            />
          </Grid>
        </Grid>
      </Paper>

      <WebsiteTraffic data={data.activitySummary || []} />
      <CourseEnrolled data={data.courses || []} />
      <BasicDetails data={data} />
    </StyledContainer>
  );
}
