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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { selectAllCourseDetailByCourseId } from 'Store/Selector/admin';
import { SelectLecturers } from '../../ManageCourses/ManageCourses';
import { FileInput } from 'common/Components/Input';
import { useThunkDispatch } from 'common/hooks';
import { deleteCourse, updateCourse, uploadFile } from 'Store/Actions/admin';
import { toast } from 'react-toastify';

export default function ManageOverview() {
  const [lecturers, setLecturers] = useState<any>([]);
  const [fileData, setFileData] = useState<any>(null);
  const [status, setStatus] = useState('DRAFT');
  const [loading, setLoading] = useState(false);

  const dispatch = useThunkDispatch();
  const history = useHistory();

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allCourseDetailById =
    useSelector(selectAllCourseDetailByCourseId) || {};
  const course = allCourseDetailById[match?.params?.courseId] || {};

  useEffect(() => {
    setStatus(course.status);
  }, [course]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const courseData: any = {
      name: formData.get('name') as string,
      code: formData.get('code') as string,
      totalHours: Number(formData.get('totalHours') as string),
      lecturers: lecturers.map((item) => ({ id: item.id })),
      description: formData.get('description') as string,
      objectives: formData.get('objectives') as string,
      outline: formData.get('outline') as string,
      status,
      course: match.params.courseId,
    };

    if (
      !courseData.name ||
      !courseData.code ||
      !courseData.totalHours ||
      !courseData.lecturers.length
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    if (fileData?.file) {
      const { url } = await dispatch(uploadFile(fileData?.file));
      courseData.imageUrl = url;
    }

    await dispatch(updateCourse(courseData));
    toast.success('Couse is updated succesfully');
    setLoading(false);
  };

  const onDeleteCourse = async () => {
    const result = window.confirm(
      'Are you sure you want to delete this course?',
    );
    if (!result) return;
    setLoading(true);
    const res = await dispatch(deleteCourse(match.params.courseId));
    setLoading(false);

    if (res.result) {
      toast.success('Couse is deleted succesfully');
      history.push(routes.STAFF.DASHBOARD);
    }
  };

  useEffect(() => {
    setLecturers(
      course?.lecturers?.map((item) => ({
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
              name="code"
              required
              fullWidth
              id="code"
              label="Course Code"
              defaultValue={course.code}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Course Name"
              defaultValue={course.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="totalHours"
              required
              fullWidth
              id="totalHours"
              label="Total Hours"
              defaultValue={course.totalHours}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e: any) => setStatus(e.target.value)}
              >
                <MenuItem value={'DRAFT'}>DRAFT</MenuItem>
                <MenuItem value={'PUBLISHED'}>PUBLISHED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <SelectLecturers data={lecturers} setData={setLecturers} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="About Course"
              type="textarea"
              name="description"
              rows={6}
              multiline
              defaultValue={course.description}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="objectives"
              label="Course Objectives"
              type="textarea"
              name="objectives"
              rows={6}
              multiline
              defaultValue={course.objectives}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="outline"
              label="Course Outlines"
              type="textarea"
              name="outline"
              rows={6}
              multiline
              defaultValue={course.outline}
            />
          </Grid>
        </Grid>

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
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                type="submit"
                disabled={loading}
              >
                Update
              </Button>
              <Button type="button" onClick={onDeleteCourse}>
                Delete Course
              </Button>
            </Container>
          </Toolbar>
        </AppBar>
      </Paper>
    </Container>
  );
}
