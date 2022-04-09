import React from 'react';
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { useSelector } from 'react-redux';
import { selectNotifications } from 'Store/Selector/pointsRewards';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { viewNotifications } from 'Store/Actions/pointsRewards';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { selectUser } from 'Store/Selector/auth';
import { Role } from 'Models/Auth';
import { routes } from 'Components/Routes';
import { makePath } from 'common/utils';
import { useHistory } from 'react-router-dom';

export default function Notification() {
  const dispatch = useThunkDispatch();
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const notifications = useSelector(selectNotifications);
  const user = useSelector(selectUser);
  const id = anchorEl ? 'simple-popover' : undefined;

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (event.currentTarget) {
      dispatch(viewNotifications());
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLink = (notif: any) => {
    const { pageRedirect: type } = notif;
    if (user.role === Role.STUDENT) {
      if (type === 'STUDENT_REWARD') return routes.ADMIN.POINTS_REWARDS;
      if (type === 'STUDENT_TUTOR') return routes.ADMIN.STUDENT_TUTORING;
      if (type === 'STUDENT_ANNOUNCEMENT')
        return makePath(routes.COURSES.ANNOUNCEMENTS, {
          courseId: notif?.metadata?.course?.id,
        });
      return '/dashboard';
    }

    if (type === 'STUDENT_REWARD' || type === 'ADMIN_REWARD')
      return routes.STAFF.MANAGE_REWARDS;
    if (type === 'ADMIN_REGISTRATION' || type === 'ADMIN_REGISTRATION')
      return makePath(routes.STAFF_COURSES.MANAGE_STUDENTS, {
        courseId: notif?.metadata?.course,
      });

    return '/admin/dashboard';
  };

  return (
    <>
      <div>
        <IconButton sx={{ mr: 2 }} onClick={handleClick} aria-describedby={id}>
          <Badge
            color="primary"
            badgeContent={notifications.filter((item) => !item.isViewed).length}
            max={49}
          >
            <MailIcon />
          </Badge>
        </IconButton>
      </div>
      <Popover
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ maxWidth: '320px', maxHeight: '350px', overflow: 'auto' }}>
          {notifications.map((item) => (
            <ListItem disablePadding key={item.id}>
              <ListItemButton
                onClick={() => {
                  history.push(getLink(item));
                  handleClose();
                }}
              >
                <ListItemIcon>
                  {item.pageRedirect === 'STUDENT_TUTOR' ? (
                    <PeopleIcon />
                  ) : item.pageRedirect === 'STUDENT_ANNOUNCEMENT' ||
                    item.pageRedirect === 'ADMIN_REGISTRATION' ? (
                    <SchoolIcon />
                  ) : item.pageRedirect === 'STUDENT_REWARD' ||
                    item.pageRedirect === 'ADMIN_REWARD' ? (
                    <LoyaltyIcon />
                  ) : (
                    <InboxIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {notifications.length === 0 && (
            <ListItem>
              <Typography variant="body1" color="text.secondary">
                No Notifications
              </Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
}
