import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  Typography,
  Paper,
  Divider,
  TextField,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { selectAllCourseDetailByCourseId } from 'Store/Selector/admin';
import { SelectLecturers } from '../../ManageCourses/ManageCourses';
import { FileInput } from 'common/Components/Input';

export default function ManageOverview() {
  const [personName, setPersonName] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [fileData, setFileData] = useState<any>(null);

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allCourseDetailById =
    useSelector(selectAllCourseDetailByCourseId) || {};
  const course = allCourseDetailById[match?.params?.courseId] || {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  useEffect(() => {
    setLecturers(
      course.lecturers.map((item) => ({
        id: item.id,
        fullName: item.fullName,
      })) || [],
    );
  }, [course.lecturers]);

  return (
    <Container
      maxWidth="md"
      sx={{ margin: 0, mt: 4, mb: 15, ml: 'auto', mr: 'auto' }}
    >
      <Paper component="form" noValidate onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container sx={{ pr: 2 }} spacing={3}>
          <Grid item xs={12}>
            <Typography component="h3" variant="h6">
              Basic Details
            </Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileInput
              label=""
              onChange={setFileData}
              value={fileData?.url || course.imageUrl}
            />
            {/* <TextField
              fullWidth
              id="file"
              type="file"
              name="file"
              value=""
              label="Course Banner Image"
              // variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="CourseCode"
              required
              fullWidth
              id="CourseCode"
              label="Course Code"
              defaultValue={course.code}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="courseName"
              required
              fullWidth
              id="courseName"
              label="Course Name"
              defaultValue={course.name}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <SelectLecturers data={lecturers} setData={setLecturers} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="aboutCourse"
              label="About Course"
              type="textarea"
              name="aboutCourse"
              rows={6}
              multiline
              defaultValue={course.description}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="courseObjectives"
              label="Course Objectives"
              type="textarea"
              name="courseObjectives"
              rows={6}
              multiline
              defaultValue={course.objectives}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="courseOutlines"
              label="Course Outlines"
              type="textarea"
              name="courseOutlines"
              rows={6}
              multiline
              defaultValue={course.outline}
            />
          </Grid>
        </Grid>
      </Paper>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ top: 'auto', bottom: 0, background: 'white' }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: 'fles',
              justifyContent: 'flex-end',
              columnGap: '1rem',
            }}
          >
            <Button variant="contained" sx={{ mr: 1 }}>
              Update
            </Button>
            <Button>Delete Course</Button>
          </Container>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
