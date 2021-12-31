import React from 'react';
import {
  Box,
  Modal,
  Grid,
  Typography,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
import { useThunkDispatch } from 'common/hooks';
import { updateAccount } from 'Store/Actions/auth';
import DoneIcon from '@mui/icons-material/Done';
import { green } from '@mui/material/colors';
import { useAvatar } from 'Store/Actions/pointsRewards';
// import { StyledBox, StyledForm, BackgroundContainer } from './Styles';

export default function ChooseAvatarModal({ open, setOpen }: any) {
  const user = useSelector(selectUser);
  const dispatch = useThunkDispatch();
  const [loading, setLoading] = React.useState(false);

  const myAvatars: any = user.avatars || [];

  const handleClose = () => {
    setOpen(false);
  };

  const onUseAvatar = async (data: any) => {
    setLoading(true);
    await dispatch(useAvatar(data));
    setLoading(false);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '96%',
          maxWidth: '800px',
          bgcolor: 'background.paper',
          border: '0',
          boxShadow: 24,
          minHeight: '400px',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={{
              xs: 2,
              md: 2,
            }}
          >
            <Grid item xs={12}>
              <Typography component="h3" variant="h6">
                Choose my Avatar
              </Typography>
              <Divider sx={{ mb: 1, mt: 0.5 }} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              sx={{
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={user.fullName.toUpperCase()}
                src="#"
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '2.5rem',
                  bgcolor: green[500],
                }}
              />
              <div>
                <Typography
                  component="div"
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                  }}
                >
                  Default
                </Typography>
                <div
                  style={{
                    fontSize: '1rem',
                    color: 'red',
                    marginTop: '-4px',
                  }}
                >
                  0 pts
                </div>
                {!user.currentAvatar?.id ? (
                  <DoneIcon sx={{ color: 'green' }} />
                ) : (
                  <Button
                    onClick={() => onUseAvatar({ id: -1 })}
                    sx={{ marginLeft: '-7px' }}
                  >
                    Select
                  </Button>
                )}
              </div>
            </Grid>
            {myAvatars.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={item.id}
                sx={{
                  display: 'flex',
                  columnGap: '1rem',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={item.name}
                  src={item.imageUrl}
                  sx={{ width: 80, height: 80 }}
                />
                <div>
                  <Typography
                    component="div"
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      fontSize: '1rem',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <div
                    style={{
                      fontSize: '1rem',
                      color: 'red',
                      marginTop: '-4px',
                    }}
                  >
                    {item.pointsRequired} pts
                  </div>
                  {user.currentAvatar?.id === item?.id ? (
                    <DoneIcon sx={{ color: 'green' }} />
                  ) : (
                    <Button
                      onClick={() => onUseAvatar(item)}
                      sx={{ marginLeft: '-7px' }}
                    >
                      Select
                    </Button>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
