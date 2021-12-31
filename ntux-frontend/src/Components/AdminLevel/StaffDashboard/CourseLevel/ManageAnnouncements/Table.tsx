import React, { useState, useEffect } from 'react';
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
  createCourseAnnouncement,
  updateCourseAnnouncement,
} from 'Store/Actions/admin/general/courseLevel.thunk';
import { selectAllCourseBatchesByCourseId } from 'Store/Selector/admin';
import { useSelector } from 'react-redux';

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
            <TableCell>Announcement Title</TableCell>
            <TableCell align="left">Batch Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Released At</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                {row.metadata?.title}
              </TableCell>
              <TableCell align="left">
                {row.courseBatch?.name || 'All batches'}
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
                {moment(row.createdAt).format('DD-MM-YYYY')}
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
  const allBatches =
    useSelector(selectAllCourseBatchesByCourseId)[courseId] || [];

  const dispatch = useThunkDispatch();
  const isEditMode = !!data && Object.keys(data || {}).length > 0;

  useEffect(() => {
    data = data || {};
    data.metadata = data.metadata || {};
    data.title = data.metadata.title || '';
    data.description = data.metadata.description || '';
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

    if (!finalData.title || !finalData.description) {
      toast.error('Please fill all the fields');
      return;
    }

    finalData.status = finalData.status || 'DRAFT';
    finalData.courseBatch =
      finalData.courseBatch === 'ALL'
        ? null
        : Number(finalData.courseBatch) || null;
    finalData.id = data?.id || undefined;
    finalData.course = courseId;
    finalData.metadata = {
      title: finalData.title,
      description: finalData.description,
    };
    delete finalData.title;
    delete finalData.description;

    setLoading(true);
    let res;
    if (!isEditMode) {
      res = await dispatch(createCourseAnnouncement(finalData));
    } else {
      res = await dispatch(updateCourseAnnouncement(finalData));
    }
    setData(null);
    if (res.result) {
      toast.success(
        `Announcement is ${isEditMode ? 'updated' : 'created'} succesfully`,
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
                {isEditMode ? 'Edit' : 'Create'} New Announcement
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                value={finalData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                value={finalData.description}
                onChange={handleChange}
                multiline
                rows={10}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    finalData.courseBatch?.id || finalData.courseBatch || 'ALL'
                  }
                  label="courseBatch"
                  name="courseBatch"
                  onChange={handleChange}
                >
                  <MenuItem value={'ALL'}>All Batch</MenuItem>
                  {allBatches.map((batch) => (
                    <MenuItem value={batch.id} key={batch.id}>
                      {batch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            {isEditMode ? 'Edit' : 'Create'} new Announcement
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
