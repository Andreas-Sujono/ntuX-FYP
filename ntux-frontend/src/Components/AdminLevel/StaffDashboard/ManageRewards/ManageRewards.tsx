import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import {
  IconButton,
  InputAdornment,
  Paper,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table, { CreateModal, ManageRewardsRedeemed } from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRewards, getAllRewards } from 'Store/Actions/admin';
import { selectAllRewards } from 'Store/Selector/admin';
import { searchFromListOfObject } from 'common/utils';
import { toast } from 'react-toastify';
import { useThunkDispatch } from 'common/hooks';
import { selectUser } from 'Store/Selector/auth';
import { Role } from 'Models/Auth';

export default function ManageRewards() {
  const allRewards = useSelector(selectAllRewards);

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [chosenData, setChosenData] = useState(false);

  const ref = useRef<any>(null);
  const dispatch = useThunkDispatch();

  const user = useSelector(selectUser);

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(allRewards, ['name'], value);
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
    const res = await dispatch(deleteRewards({ id }));
    if (res.result) toast.success('Reward is deleted successfully');
  };

  const final = searchInput ? searchResult : allRewards;

  useEffect(() => {
    dispatch(getAllRewards());
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: 0, mt: 4, mb: 5, ml: 0, mr: 1 }}>
        <CreateModal
          open={openModal}
          setOpen={setOpenModal}
          data={chosenData}
          setData={setChosenData}
        />
        <Paper sx={{ p: 2 }}>
          <Typography component="h3" variant="h6">
            All Rewards
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Search Rewards"
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
                disabled={user?.role !== Role.ADMIN}
              >
                Create New Reward
              </Button>
            </Grid>
          </Grid>

          <Table
            data={final}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            user={user}
          />
        </Paper>
      </Container>

      <ManageRewardsRedeemed />
    </>
  );
}
