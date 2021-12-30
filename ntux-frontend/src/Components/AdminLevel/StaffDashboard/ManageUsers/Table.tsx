import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
} from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { createUser } from 'Store/Actions/admin';

export default function TableComponent({ data }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Join Date</TableCell>
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
                {row.fullName}
              </TableCell>
              <TableCell align="left">{row.role}</TableCell>
              <TableCell align="left">
                {row.emailVerifiesAt ? 'Verified' : 'Not Verified'}
              </TableCell>
              <TableCell align="left">
                {new Date(row.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const CreateModal = ({ open, setOpen, data }: any) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('STUDENT');

  const dispatch = useThunkDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const finalData: any = {
      fullName: formData.get('fullName') as string,
      givenName: formData.get('givenName') as string,
      familyName: formData.get('familyName') as string,
      nationality: formData.get('nationality') as string,
      email: formData.get('email') as string,
      hashedPassword: formData.get('password') as string,
      role,
    };

    if (
      !finalData.fullName ||
      !finalData.givenName ||
      !finalData.familyName ||
      !finalData.nationality ||
      !finalData.email ||
      !finalData.hashedPassword
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    await dispatch(createUser(finalData));
    toast.success('User is created succesfully');
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
                Create New User
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="givenName"
                required
                fullWidth
                id="givenName"
                label="Given Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="familyName"
                required
                fullWidth
                id="familyName"
                label="Family Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nationality"
                required
                fullWidth
                id="nationality"
                label="Nationality"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Status"
                  onChange={(e: any) => setRole(e.target.value)}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
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
            Create new User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
