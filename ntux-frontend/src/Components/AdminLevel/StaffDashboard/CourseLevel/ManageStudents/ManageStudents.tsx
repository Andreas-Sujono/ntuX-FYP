import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from './Table';
import { useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllStudentsByCourseId } from 'Store/Selector/admin';
import {
  deleteStudentRegistration,
  getAllStudentRegistrations,
} from 'Store/Actions/admin';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { searchFromListOfObject } from 'common/utils';

export default function ManageStudents() {
  const dispatch = useThunkDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const ref = useRef<any>(null);

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allData = useSelector(selectAllStudentsByCourseId) || {};
  const data = allData[match?.params?.courseId] || [];

  useEffect(() => {
    dispatch(getAllStudentRegistrations(match?.params?.courseId));
  }, []);

  const onClickDelete = async (id: any) => {
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (!confirm) return;
    const res = await dispatch(
      deleteStudentRegistration({ id, courseId: match?.params?.courseId }),
    );
    if (res.result)
      toast.success('Student Registration is deleted successfully');
  };

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(
        data,
        ['user.fullName', 'user.email', 'courseBatch.name', 'status'],
        value,
      );
      setSearchResult(result);
      ref.current = null;
    }, 100);
  };

  const final = searchInput ? searchResult : data;

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}>
      <Paper sx={{ p: 2, minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Students by name or batch name"
              id="fullWidth"
              sx={{ backgroundColor: 'white' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="Search" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={searchInput}
              onChange={onChange}
            />
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <Button variant="contained" sx={{ mt: 1 }} fullWidth>
              Create New Registration
            </Button>
          </Grid> */}
        </Grid>

        <Table
          data={final}
          courseId={match?.params?.courseId}
          onClickDelete={onClickDelete}
        />
      </Paper>
    </Container>
  );
}
