import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { green, red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

const rows = [
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 2, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
];

export function ProfileBox() {
  return (
    <Box style={{ width: '100%', maxWidth: '100%' }}>
      <Card sx={{ minWidth: 275, boxShadow: 0 }}>
        <CardContent sx={{ padding: 0 }}>
          <Avatar
            alt="Andreas Sujono"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 80,
              height: 80,
              fontSize: '2.5rem',
              bgcolor: green[500],
            }}
          />
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            Andreas Sujono
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            You are qualified to be a tutor of:
            <ul>
              <li>EE4012: Approved</li>
              <li>EE4413: Pending</li>
            </ul>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}></CardActions>
      </Card>
    </Box>
  );
}

export function TopTutor() {
  return (
    <Paper style={{ width: '100%', maxWidth: '100%' }} sx={{ p: 2 }}>
      <Typography variant="h6" component="div" sx={{ mt: 1 }}>
        Top Tutors
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Andreas Sujono"
              subheader="EE4413 Tutor"
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export const TutorListBox = () => {
  return (
    <Paper style={{ width: '100%', maxWidth: '100%' }} sx={{ p: 2 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}
      >
        Find Tutors
      </Typography>
      <TextField
        fullWidth
        label="Search Tutors by Name or Course"
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
      />
      <Grid container spacing={2} mt={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} md={4} lg={3} key={item}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Andreas Sujono"
              subheader="Lv 2, EE4413 Tutor"
            />
            <Button size="small">Make Request</Button>
            <Button size="small">See Portfolio</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export const RequestHistory = () => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
        Tutor Request:
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tutor Name</TableCell>
            <TableCell align="left">status</TableCell>
            <TableCell align="left">Request Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.eventName}
              </TableCell>
              <TableCell align="left">{row.points}</TableCell>
              <TableCell align="left">
                {row.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                <Button>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const OfferHistory = () => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
        Tutor Offers:
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tutor Name</TableCell>
            <TableCell align="left">status</TableCell>
            <TableCell align="left">Request Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.eventName}
              </TableCell>
              <TableCell align="left">{row.points}</TableCell>
              <TableCell align="left">
                {row.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                <Button>Reject</Button>
                <Button>Approve</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RequestBeATutorModal = ({ open, setOpen, data }: any) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          width: 400,
          bgcolor: 'background.paper',
          border: '0',
          boxShadow: 24,
        }}
      >
        <Card sx={{ maxWidth: '400px' }}>
          <CardMedia
            component="img"
            height="140"
            image="https://previews.123rf.com/images/ganpanjaneedesign/ganpanjaneedesign1604/ganpanjaneedesign160400045/56067507-red-gift-voucher-coupon-design-ticket-banner-cards-polygon-background.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Voucher 20$
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export const CreateRequestModal = ({ open, setOpen, data }: any) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          width: 400,
          bgcolor: 'background.paper',
          border: '0',
          boxShadow: 24,
        }}
      >
        <Card sx={{ maxWidth: '400px' }}>
          <CardMedia
            component="img"
            height="140"
            image="https://previews.123rf.com/images/ganpanjaneedesign/ganpanjaneedesign1604/ganpanjaneedesign160400045/56067507-red-gift-voucher-coupon-design-ticket-banner-cards-polygon-background.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Voucher 20$
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
    </Modal>
  );
};
