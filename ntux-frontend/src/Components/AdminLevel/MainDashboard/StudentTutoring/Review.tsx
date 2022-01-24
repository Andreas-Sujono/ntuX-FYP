import React, { useState } from 'react';
import {
  Typography,
  Box,
  Modal,
  Avatar,
  CardHeader,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Pagination,
  Rating,
  Divider,
  TablePagination,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useThunkDispatch } from 'common/hooks';
import { createReview } from 'Store/Actions/tutoring';
import { toast } from 'react-toastify';

export function GiveReviewModal({ open, setOpen, data }: any) {
  const [formData, setFormData] = useState<any>({
    rating: 2.5,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useThunkDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onUpdateFormData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.review || !formData.rating) {
      return toast.error('Please fill out all fields');
    }
    setLoading(true);

    const res = await dispatch(
      createReview({
        tutorRequest: data.id,
        review: formData.review,
        rating: parseInt(formData.rating),
        tutor: data.tutor?.id,
      }),
    );
    if (res.result) {
      toast.success('Review submitted successfully');
      handleClose();
    }

    setLoading(false);
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
          width: '90%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          border: '0',
          boxShadow: 24,
          p: 3,
        }}
        component="form"
        onSubmit={onSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" component="div">
              Give Review
            </Typography>
            <Divider sx={{ mb: 1, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Rating
              name="rating"
              defaultValue={2.5}
              precision={0.5}
              value={formData.rating || 2.5}
              onChange={onUpdateFormData}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="review"
              required
              fullWidth
              id="review"
              label="Review"
              placeholder="write your review here..."
              value={formData.review || ''}
              onChange={onUpdateFormData}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
