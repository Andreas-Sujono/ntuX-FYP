import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import Paper from '@mui/material/Paper';
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { createUser, updateUser } from 'Store/Actions/admin';
import { Role } from 'Models/Auth';
import TablePagination from '@mui/material/TablePagination';

export default function TableComponent({
  data,
  onClickEdit,
  onClickDelete,
  onClickStudent,
  user,
}: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
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
              <TableCell>User Name</TableCell>
              <TableCell>User email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Join Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: '1rem',
                      cursor:
                        row.role === 'STUDENT' && !!onClickStudent
                          ? 'pointer'
                          : 'default',
                      color:
                        row.role === 'STUDENT' && !!onClickStudent
                          ? '#C63044'
                          : 'inherit',
                    }}
                    onClick={() => {
                      if (row.role === 'STUDENT' && !!onClickStudent)
                        return onClickStudent(row.id);
                    }}
                  >
                    {row.fullName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: row.emailVerifiesAt ? 'green' : 'lightgrey',
                    }}
                  >
                    {row.emailVerifiesAt ? 'Verified' : 'Not Verified'}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => onClickEdit(row)}
                      disabled={user?.role !== Role.ADMIN}
                      title={
                        user?.role !== Role.ADMIN
                          ? 'You are not authorized'
                          : ''
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onClickDelete(row.id)}
                      disabled={user?.role !== Role.ADMIN}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export const CreateModal = ({ open, setOpen, data, setData }: any) => {
  const [loading, setLoading] = useState(false);
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
    if (event.target.name === 'emailVerifiesAt') {
      return setFinalData({
        ...finalData,
        [event.target.name]: !finalData.emailVerifiesAt,
      });
    }
    setFinalData({
      ...finalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !finalData.fullName ||
      !finalData.givenName ||
      !finalData.familyName ||
      !finalData.nationality ||
      !finalData.email ||
      (!finalData.hashedPassword && !isEditMode)
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    if (!isEditMode && finalData.emailVerifiesAt)
      finalData.emailVerifiesAt = new Date();
    else if (isEditMode && !data.emailVerifiesAt && finalData.emailVerifiesAt)
      finalData.emailVerifiesAt = new Date();
    else if (isEditMode && data.emailVerifiesAt)
      finalData.emailVerifiesAt = data.emailVerifiesAt;
    else finalData.emailVerifiesAt = null;

    finalData.role = finalData.role || 'STUDENT';
    finalData.id = data?.id || undefined;

    setLoading(true);
    let res;
    if (!isEditMode) {
      res = await dispatch(createUser(finalData));
    } else {
      res = await dispatch(updateUser(finalData));
    }
    setData(null);
    if (res.result) {
      toast.success(
        `User is ${isEditMode ? 'updated' : 'created'} succesfully`,
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
                {isEditMode ? 'Edit' : 'Create'} New User
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value={finalData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="givenName"
                required
                fullWidth
                id="givenName"
                label="Given Name"
                value={finalData.givenName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="familyName"
                required
                fullWidth
                id="familyName"
                label="Family Name"
                value={finalData.familyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nationality"
                required
                fullWidth
                id="nationality"
                label="Nationality"
                value={finalData.nationality}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  label="role"
                  value={finalData.role || 'STUDENT'}
                  onChange={handleChange}
                >
                  <MenuItem value={'STUDENT'}>STUDENT</MenuItem>
                  <MenuItem value={'LECTURER'}>LECTURER</MenuItem>
                  <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={finalData.email}
                onChange={handleChange}
              />
            </Grid>
            {!isEditMode && (
              <Grid item xs={12} sm={6}>
                <TextField
                  name="hashedPassword"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  value={finalData.hashedPassword}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!finalData.emailVerifiesAt} />}
                label="Email verified"
                value={!!finalData.emailVerifiesAt}
                name="emailVerifiesAt"
                onChange={handleChange}
                disabled={isEditMode && !!data.emailVerifiesAt}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {isEditMode ? 'Edit' : 'Create'} New User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
