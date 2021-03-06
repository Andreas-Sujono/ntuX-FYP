/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { StyledBox, StyledForm, BackgroundContainer } from './Styles';
import { Course } from 'Models/Courses';
import { useHistory, useParams } from 'react-router-dom';
import { getOnePublicCourse, registerCourse } from 'Store/Actions/courses';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';

export default function RegisterCoursePage() {
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const param: any = useParams();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = useSelector(selectUser);

  if (courseData?.courseBatches)
    courseData?.courseBatches?.sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.endDate).getTime();
    });
  const chosenCourseBatch = courseData?.courseBatches?.[0];
  console.log('chosenCourseBatch: ', chosenCourseBatch);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const checked = data.get('checked');
    const confirmEmail = data.get('confirmEmail') as string;

    const formData: any = {
      user: {
        fullName: data.get('fullName') as string,
        familyName: data.get('familyName') as string,
        givenName: data.get('givenName') as string,
        citizenship: data.get('citizenship') as string,
        nationality: data.get('nationality') as string,
        email: data.get('email') as string,
        hashedPassword: data.get('password') as string,
      },
      courseId: courseData?.id,
      course: courseData?.id,
      courseBatchId: chosenCourseBatch?.id,
      courseBatch: chosenCourseBatch?.id,
    };
    if (user) {
      formData.user = user;
      formData.user.hashedPassword = data.get('password') as string;
    }
    console.log(formData, confirmEmail);

    if (
      !formData.user.familyName ||
      !formData.user.givenName ||
      !formData.user.fullName ||
      !formData.user.email ||
      (!confirmEmail && !user)
    )
      return toast.error('Please fill all the required field');

    if (!user && formData.user.email !== confirmEmail)
      return toast.error('Email and confirm email are not the same');

    if (!user && data.get('password') !== data.get('confirmPassword'))
      return toast.error('Password and confirm password are not the same');

    if (!checked)
      return toast.error(
        'Please agree to the accurate information declaration',
      );

    setLoading(true);
    const res: any = await dispatch(registerCourse(formData));
    setLoading(false);
    if (res.result) {
      toast.success('Successfully registered');
      history.push(`/courses/${formData.courseId}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { result, data } = await dispatch(
      getOnePublicCourse(param?.courseId),
    );
    setCourseData(data || {});
  };

  return (
    <Container component="main" maxWidth="md">
      <BackgroundContainer />
      <StyledBox>
        <Typography component="h1" variant="h5" className="title">
          Online Application Form:
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          align="center"
          sx={{ color: '#C63044' }}
          className="subtitle"
        >
          {courseData?.name} - {chosenCourseBatch?.name}
        </Typography>
        <StyledForm component="form" noValidate onSubmit={handleSubmit}>
          <Grid
            container
            spacing={{
              xs: 2,
              md: 2,
            }}
          >
            <Grid item xs={12}>
              <Typography component="h3" variant="h6">
                Participant Details
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name (as shown in NRIC/ FIN/ Passport)"
                autoFocus
                defaultValue={user?.fullName}
                disabled={!!user}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="familyName"
                label="Family Name"
                name="familyName"
                defaultValue={user?.familyName}
                disabled={!!user}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="givenName"
                label="Given Name"
                name="givenName"
                defaultValue={user?.givenName}
                disabled={!!user}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="citizenship"
                label="Citizenship"
                name="citizenship"
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="nationality"
                label="Nationality"
                name="nationality"
                defaultValue={user?.nationality}
                disabled={!!user}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h3" variant="h6">
                {!user ? 'New/Existing Account Details' : 'Please Login Again!'}
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="Email"
                type="email"
                label="Email Address"
                name="email"
                defaultValue={user?.email}
                disabled={!!user}
              />
            </Grid>
            {!user && (
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmEmail"
                  type="email"
                  label="Confirm Email Address"
                  name="confirmEmail"
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                name="password"
                // disabled={!!user}
              />
            </Grid>
            {!user && (
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  // disabled={!!user}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography
                component="h5"
                variant="body2"
                sx={{ color: 'text.tertiary' }}
              >
                *Admin need to approve your course registration before you can
                access it
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h3" variant="h6">
                Declaration
              </Typography>
              <Divider sx={{ mb: 1, mt: 0.5 }} />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="true" color="primary" />}
                label="I declare that the above information submitted is accurate."
                name="checked"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h5"
                variant="body2"
                sx={{ color: 'text.tertiary', mt: -2 }}
              >
                By Clicking on the Submit Button, I acknowledge that I have read
                and understood the Full Data Protection and Privacy Statement
                (Click Here) and declare that I am authorised to make this
                submission on behalf of the Company/Organisation. The
                Company/Organisation (a) agrees that the personal data of the
                individual(s) may be collected, used and disclosed by NTU for
                the Purposes stated in the Statement, and (b) warrants that it
                is validly acting on behalf of the individual(s).
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Submit
          </Button>
        </StyledForm>
      </StyledBox>
    </Container>
  );
}
