import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
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
} from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import {
  createCourseBatch,
  updateCourseBatch,
} from 'Store/Actions/admin/general/courseLevel.thunk';

export default function TableComponent({
  data,
  onClickEdit,
  onClickDelete,
}: any) {
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
            <TableCell>Batch Name</TableCell>
            <TableCell align="left">Course Start Period</TableCell>
            <TableCell align="left">Registration Period</TableCell>
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
              <TableCell
                component="th"
                scope="row"
                sx={{ fontSize: '1rem', fontWeight: '500' }}
              >
                {row.name}
              </TableCell>
              <TableCell align="left">
                {moment(row.startDate).format('DD/MM/YYYY')} -{' '}
                {moment(row.endDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">
                {moment(row.registrationStartsAt).format('DD/MM/YYYY')} -{' '}
                {moment(row.registrationEndsAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  color: row.status === 'DRAFT' ? 'lightgrey' : 'green',
                }}
              >
                {row.status}
              </TableCell>
              <TableCell align="left">
                <Button onClick={() => onClickEdit(row)}>Edit</Button>
                <Button onClick={() => onClickDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const CreateModal = ({
  open,
  setOpen,
  data,
  setData,
  courseId,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState(data || {});

  const dispatch = useThunkDispatch();
  const isEditMode = !!data && Object.keys(data || {}).length > 0;

  useEffect(() => {
    if (data) {
      data.registrationStartsAt = moment(data.registrationStartsAt).format(
        'YYYY-MM-DD',
      );
      data.registrationEndsAt = moment(data.registrationEndsAt).format(
        'YYYY-MM-DD',
      );
      data.startDate = moment(data.startDate).format('YYYY-MM-DD');
      data.endDate = moment(data.endDate).format('YYYY-MM-DD');
    }

    setFinalData(data || {});
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  const handleChange = (event: any) => {
    setFinalData({
      ...finalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !finalData.registrationStartsAt ||
      !finalData.registrationEndsAt ||
      !finalData.startDate ||
      !finalData.endDate
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    finalData.status = finalData.status || 'DRAFT';
    finalData.course = courseId;
    finalData.id = data?.id || undefined;

    setLoading(true);
    let res;
    if (!isEditMode) {
      res = await dispatch(createCourseBatch(finalData));
    } else {
      res = await dispatch(updateCourseBatch(finalData));
    }
    setData(null);
    if (res.result) {
      toast.success(
        `batch is ${isEditMode ? 'updated' : 'created'} succesfully`,
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
                {isEditMode ? 'Edit' : 'Create'} New Batch
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="batch Name"
                value={finalData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="registrationStartsAt"
                required
                fullWidth
                id="registrationStartsAt"
                label="Registration Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={finalData.registrationStartsAt}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="registrationEndsAt"
                required
                fullWidth
                id="registrationEndsAt"
                label="Registration End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={finalData.registrationEndsAt}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                required
                fullWidth
                id="startDate"
                label="Course Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={finalData.startDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="endDate"
                required
                fullWidth
                id="endDate"
                label="Course End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={finalData.endDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={finalData.status || 'DRAFT'}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value={'DRAFT'}>DRAFT</MenuItem>
                  <MenuItem value={'PUBLISHED'}>PUBLISHED</MenuItem>
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
            {isEditMode ? 'Edit' : 'Create'} new batch
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
