import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Modal,
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { createReward, updateReward, uploadFile } from 'Store/Actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllRewardsRedeemed } from 'Store/Selector/admin';
import { searchFromListOfObject } from 'common/utils';
import {
  changeStudentRegistrationStatus,
  getAllRewardsRedeemed,
  updateRewardRedeemed,
} from 'Store/Actions/admin/general/courseLevel.thunk';
import { LinkText } from 'common/Components/shared/shared';
import moment from 'moment';
import { FileInput } from 'common/Components/Input';

export default function RewardTable({ data, onClickEdit, onClickDelete }: any) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '50vh',
        overflow: 'auto',
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          width: '100%',
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Reward Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Redeemed Count</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: '20%' }}>
                {row.name}
              </TableCell>
              <TableCell align="left" sx={{ maxHeight: '100px', width: '40%' }}>
                <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
                  {row.description}
                </div>
              </TableCell>
              <TableCell align="left" sx={{ width: '10%' }}>
                10
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  width: '10%',
                  color: row.isPublished ? 'green' : 'lightgrey',
                }}
              >
                {row.isPublished ? 'Active' : 'Inactive'}
              </TableCell>

              <TableCell align="left" sx={{ width: '20%' }}>
                <Button
                  onClick={() => onClickEdit(row)}
                  disabled={row.isDefault}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onClickDelete(row.id)}
                  disabled={row.isDefault}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const CreateModal = ({ open, setOpen, data, setData }: any) => {
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState<any>(null);
  const [finalData, setFinalData] = useState(data || {});

  const dispatch = useThunkDispatch();
  const isEditMode = !!data && Object.keys(data || {}).length > 0;

  useEffect(() => {
    setFinalData(data || {});
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  const handleChange = (event: any) => {
    let isPublished = !!finalData.isPublished;
    if (event.target.name === 'status') {
      if (event.target.value === 'ACTIVE') {
        isPublished = true;
      } else isPublished = false;
    }
    setFinalData({
      ...finalData,
      isPublished,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !finalData.name ||
      !finalData.description ||
      !finalData.totalLimit ||
      !finalData.totalPointsRequired
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    finalData.totalLimit = Number(finalData.totalLimit);
    finalData.totalPointsRequired = Number(finalData.totalPointsRequired);
    finalData.role = finalData.role || 'STUDENT';
    finalData.id = data?.id || undefined;
    // finalData.isPublished = finalData.status === 'ACTIVE';

    setLoading(true);
    if (fileData?.file) {
      const { url } = await dispatch(uploadFile(fileData?.file));
      finalData.imageUrl = url;
    }
    let res;
    if (!isEditMode) {
      res = await dispatch(createReward(finalData));
    } else {
      res = await dispatch(updateReward(finalData));
    }
    setData(null);
    if (res.result) {
      toast.success(
        `Reward is ${isEditMode ? 'updated' : 'created'} succesfully`,
      );
    }
    setLoading(false);
    handleClose();
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
          maxWidth: '600px',
          bgcolor: 'background.paper',
          border: '0',
          boxShadow: 24,
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Grid
            container
            spacing={{
              xs: 2,
              md: 2,
            }}
          >
            <Grid item xs={12}>
              <Typography component="h3" variant="h6">
                {isEditMode ? 'Edit' : 'Create'} New Reward
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FileInput
                label="Reward Banner Image"
                onChange={setFileData}
                value={fileData?.url || finalData.imageUrl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Reward Name"
                value={finalData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                value={finalData.description}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="islimitedOnePerStudent"
                label="Limited to one per student"
                name="islimitedOnePerStudent"
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="totalLimit"
                required
                fullWidth
                id="totalLimit"
                label="Total limit"
                type="number"
                value={finalData.totalLimit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="totalPointsRequired"
                required
                fullWidth
                id="totalPointsRequired"
                label="Points Required"
                type="number"
                value={finalData.totalPointsRequired}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={finalData.isPublished ? 'ACTIVE' : 'INACTIVE'}
                  label="Status"
                  onChange={handleChange}
                  name="status"
                >
                  <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                  <MenuItem value={'INACTIVE'}>INACTIVE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {isEditMode ? 'Edit' : 'Create'} New Reward
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export function ManageRewardsRedeemed() {
  const dispatch = useDispatch();
  const allRewardsRedeemed = useSelector(selectAllRewardsRedeemed);

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);

  const ref = useRef<any>(null);

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(
        allRewardsRedeemed,
        ['name', 'user.email', 'user.name', 'reward.name', 'status'],
        value,
      );
      setSearchResult(result);
      ref.current = null;
    }, 100);
  };

  const final = searchInput ? searchResult : allRewardsRedeemed;

  useEffect(() => {
    dispatch(getAllRewardsRedeemed());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 0, mb: 8, ml: 0, mr: 1 }}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h3" variant="h6">
          Rewards Redeemed by Student
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Search Rewards Redeemed"
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
        </Grid>

        <RewardsRedeemedTable data={final} />
      </Paper>
    </Container>
  );
}

export const StatusSelector = ({ id, value, onChange }: any) => {
  const [status, setStatus] = React.useState(value);

  const handleChange = (_value: any) => {
    setStatus(_value);
    onChange(id, _value);
  };

  React.useEffect(() => {
    setStatus(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status || 'PENDING'}
        label="Status"
        onChange={(e: any) => handleChange(e.target.value)}
        size="small"
      >
        <MenuItem value={'PENDING'}>PENDING</MenuItem>
        <MenuItem value={'REDEEMED'}>REDEEMED</MenuItem>
        <MenuItem value={'CANCELLED'}>CANCELLED</MenuItem>
      </Select>
    </FormControl>
  );
};

export function RewardsRedeemedTable({ data }: any) {
  const dispatch = useThunkDispatch();

  const handleUpdateStatus = async (id: string, value: string) => {
    dispatch(
      updateRewardRedeemed({
        id,
        status: value,
      }),
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '70vh',
        overflow: 'auto',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="left">Student Email</TableCell>
            <TableCell align="left">Reward Name</TableCell>
            <TableCell align="left">Redeemed date</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                <LinkText>{row.user?.fullName}</LinkText>
              </TableCell>
              <TableCell align="left">{row.user?.email}</TableCell>
              <TableCell align="left">{row.reward?.name}</TableCell>
              <TableCell align="left">
                {moment(row.createdAt).format('DD/MM/YYYY, hh:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                <StatusSelector
                  id={row.id}
                  value={row.status}
                  onChange={handleUpdateStatus}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
