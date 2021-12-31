import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table, { CreateModal } from './Table';
import { selectAllUsers } from 'Store/Selector/admin';
import { useSelector } from 'react-redux';
import { searchFromListOfObject } from 'common/utils';
import { useThunkDispatch } from 'common/hooks';
import { deleteUser } from 'Store/Actions/admin';
import { toast } from 'react-toastify';

export default function ManageUsers() {
  const allUsers = useSelector(selectAllUsers);

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [chosenData, setChosenData] = useState(false);

  const ref = useRef<any>(null);
  const dispatch = useThunkDispatch();

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(
        allUsers,
        ['fullName', 'role', 'email'],
        value,
      );
      setSearchResult(result);
      ref.current = null;
    }, 100);
  };

  const onClickEdit = (_data: any) => {
    setChosenData(_data);
    setOpenModal(true);
  };

  const onClickDelete = async (id: any) => {
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (!confirm) return;
    const res = await dispatch(deleteUser({ id }));
    if (res.result) toast.success('User is deleted successfully');
  };

  const final = searchInput ? searchResult : allUsers;

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 8, ml: 0, mr: 1 }}>
      <CreateModal
        open={openModal}
        setOpen={setOpenModal}
        data={chosenData}
        setData={setChosenData}
      />
      <Paper sx={{ p: 2, minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Users by name, email, or role"
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
              Create New User
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
