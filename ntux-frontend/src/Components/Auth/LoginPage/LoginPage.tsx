import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useThunkDispatch } from 'common/hooks';
import { login } from 'Store/Actions/auth';
import { Redirect, useHistory, Link as RouterLink } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { Role } from 'Models/Auth';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from 'Store/Selector/auth';

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright &copy;&nbsp;
      <Link color="inherit" href=".">
        NTUX
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignInSide() {
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const formData = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    if (!formData.email || !formData.password)
      return toast.error('Please fill all the required field', {
        position: 'top-right',
      });

    setLoading(true);
    const res: any = await dispatch(login(formData));
    setLoading(false);

    if (res.result) {
      console.log(res);
      if (res.user.role === Role.STUDENT)
        return history.push(routes.ADMIN.BASE);
      return history.push(routes.STAFF.DASHBOARD);
    }
  };

  if (userId) {
    if (userRole === Role.ADMIN || userRole === Role.LECTURER)
      return <Redirect to={routes.STAFF.BASE} />;
    return <Redirect to={routes.ADMIN.BASE} />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('https://c0.wallpaperflare.com/preview/669/547/646/building-architecture-dome-plant.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <RouterLink
                  to={routes.FORGOT_PASSWORD_PAGE}
                  style={{ color: 'darkred' }}
                >
                  Forgot Password
                </RouterLink>
              </Grid>
            </Grid> */}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
