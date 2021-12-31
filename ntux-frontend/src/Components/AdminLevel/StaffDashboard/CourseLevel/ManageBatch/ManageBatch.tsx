import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from './Table';
import { useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { selectAllCourseBatchesByCourseId } from 'Store/Selector/admin';
import { useSelector } from 'react-redux';
import { CreateModal } from './Table';
import { useThunkDispatch } from 'common/hooks';
import { deleteCourseBatch } from 'Store/Actions/admin/general/courseLevel.thunk';
import { toast } from 'react-toastify';
import { searchFromListOfObject } from 'common/utils';

export default function ManageBatch() {
  const [openModal, setOpenModal] = useState(false);
  const [chosenData, setChosenData] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const dispatch = useThunkDispatch();
  const ref = useRef<any>(null);

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allData = useSelector(selectAllCourseBatchesByCourseId) || {};
  const data = allData[match?.params?.courseId] || [];

  const onClickEdit = (_data: any) => {
    setChosenData(_data);
    setOpenModal(true);
  };

  const onClickDelete = async (id: any) => {
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (!confirm) return;
    const res = await dispatch(
      deleteCourseBatch({ id, courseId: match?.params?.courseId }),
    );
    if (!res.result) toast.success('Course batch is deleted successfully');
  };

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(data, ['name', 'status'], value);
      setSearchResult(result);
      ref.current = null;
    }, 100);
  };

  const final = searchInput ? searchResult : data;

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}>
      <CreateModal
        open={openModal}
        setOpen={setOpenModal}
        courseId={match?.params?.courseId}
        data={chosenData}
        setData={setChosenData}
      />
      <Paper sx={{ p: 2, minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Batch by Name"
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
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              onClick={() => setOpenModal(true)}
            >
              Create New Batch
            </Button>
          </Grid>
        </Grid>

        <Table
          data={final}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </Paper>
    </Container>
  );
}
