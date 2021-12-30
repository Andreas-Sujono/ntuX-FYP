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
import { createReward, uploadFile } from 'Store/Actions/admin';

export default function RewardTable({ data }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reward Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Redeemed Count</TableCell>
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
                sx={{ fontSize: '1rem', width: '20%' }}
              >
                {row.name}
              </TableCell>
              <TableCell align="left" sx={{ maxHeight: '100px', width: '40%' }}>
                <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
                  {row.description}
                </div>
              </TableCell>
              <TableCell align="left" sx={{ width: '10%' }}>
                {row.isPublished ? 'Active' : 'Inactive'}
              </TableCell>
              <TableCell align="left" sx={{ width: '10%' }}>
                10
              </TableCell>
              <TableCell align="left" sx={{ width: '20%' }}>
                <Button disabled={row.isDefault}>Edit</Button>
                <Button disabled={row.isDefault}>Delete</Button>
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
  const [status, setStatus] = useState('DRAFT');
  const [file, setFile] = useState<any>(null);

  const dispatch = useThunkDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const finalData: any = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      totalLimit: Number(formData.get('totalLimit') as string),
      totalPointsRequired: Number(
        formData.get('totalPointsRequired') as string,
      ),
      isPublished: status === 'PUBLISHED',
    };

    if (
      !finalData.name ||
      !finalData.description ||
      !finalData.totalLimit ||
      !finalData.totalPointsRequired
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    if (file) {
      const { url } = await dispatch(uploadFile(file));
      finalData.imageUrl = url;
      console.log(finalData);
    }

    await dispatch(createReward(finalData));
    toast.success('Reward is created succesfully');
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
                Create New Reward
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="file"
                type="file"
                name="file"
                label="Reward Banner Image"
                // variant="filled"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: any) =>
                  e.target.files[0] && setFile(e.target.files[0])
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Reward Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Create new reward
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
