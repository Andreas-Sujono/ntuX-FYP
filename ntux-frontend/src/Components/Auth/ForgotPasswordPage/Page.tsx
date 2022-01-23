import React, { useState, useEffect } from 'react';
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
import {
  confirmEmail,
  confirmForgotPassword,
  forgotPassword,
} from 'Store/Actions/auth';
import {
  Redirect,
  useHistory,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import { routes } from 'Components/Routes';
import { Role } from 'Models/Auth';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from 'Store/Selector/auth';
import { LoadingBar } from 'common/Components/LoadingBar/FullPageLoadingBar';

const { PUBLIC_URL } = process.env;

const bgImage = PUBLIC_URL + '/assets/LP/ntuBg.jpeg';

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

export function ConfirmForgotPassword() {
  const [loading, setLoading] = useState<boolean | null>(true);
  const location = useLocation();
  const dispatch = useThunkDispatch();
  const query = queryString.parse(location.search);

  useEffect(() => {
    confirmToken();
  }, []);

  const confirmToken = async () => {
    setLoading(true);
    const res = await dispatch(confirmForgotPassword(query));
    if (res.result) {
      return setLoading(false);
    }
    return setLoading(null);
  };

  if (loading === false) {
    return (
      <Redirect
        to={{
          pathname: routes.RESET_PASSWORD_PAGE,
          state: {
            isAuthenticated: true,
            email: query.email,
            token: query.token,
          },
          search: location.search,
        }}
      />
    );
  }
  if (loading === null) {
    return <Redirect to={routes.LP_HOMEPAGE} />;
  }
  if (loading === true) return <LoadingBar height="100vh" />;
  return null;
}

export function ConfirmEmail() {
  const [loading, setLoading] = useState<boolean | null>(true);
  const location = useLocation();
  const dispatch = useThunkDispatch();
  const query = queryString.parse(location.search);

  useEffect(() => {
    confirmToken();
  }, []);

  const confirmToken = async () => {
    setLoading(true);
    const res = await dispatch(confirmEmail(query));
    if (res.result) {
      return setLoading(false);
    }
    return setLoading(null);
  };

  if (loading === false) {
    return (
      <Redirect
        to={{
          pathname: routes.LOGIN_PAGE,
          state: {
            isAuthenticated: true,
            email: query.email,
            token: query.token,
          },
          search: location.search,
        }}
      />
    );
  }
  if (loading === null) {
    return <Redirect to={routes.LP_HOMEPAGE} />;
  }
  if (loading === true) return <LoadingBar height="100vh" />;
  return null;
}

export default function ForgotPasswordPage() {
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email') as string,
    };

    if (!formData.email)
      return toast.error('Please fill all the required field', {
        position: 'top-right',
      });

    setLoading(true);
    const res: any = await dispatch(forgotPassword(formData));
    setLoading(false);

    if (res.result) {
      toast.success('Reset password link is sent to your email');
      return history.push(routes.LOGIN_PAGE);
    }
  };

  if (userId) {
    if (userRole === Role.STUDENT) return <Redirect to={routes.ADMIN.BASE} />;
    return <Redirect to={routes.STAFF.BASE} />;
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
          backgroundImage: `url('${bgImage}')`,
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
            Forgot Password
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
            <Typography variant="body2" color="textSecondary" align="center">
              We&apos;ll send you an email with a link to reset your password.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Forgot Password
            </Button>

            <Grid container>
              <Grid item xs>
                <RouterLink to={routes.LOGIN_PAGE} style={{ color: 'darkred' }}>
                  Back to Sign In?
                </RouterLink>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
