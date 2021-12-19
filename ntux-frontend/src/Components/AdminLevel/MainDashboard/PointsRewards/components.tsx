import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Modal,
} from '@mui/material';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FeatureBox } from '../Dashboard/Styles';

const HowToGetPointsData = [
  'Finish online course',
  'Ask answer question in forum discussion',
  'Answer question in forum discussion',
  'create your portfolio site',
  'tutor student',
];

const rows = [
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
];

export default function PointHistoryTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="left">Points received</TableCell>
            <TableCell align="left">Time</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function RewardHistoryTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reward Redeemed</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Date Redeemed</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const HowToGetPoints = () => {
  return (
    <FeatureBox sx={{ padding: '1rem' }}>
      <Typography component="h5" variant="h6">
        Today Goals
      </Typography>

      <List dense={false}>
        {HowToGetPointsData.map((item) => (
          <ListItem key={item} divider sx={{ p: 0.5 }}>
            <ListItemText
              primary={item}
              sx={{ fontSize: '18px' }}
              color="text.secondary"
            />
            <Typography
              variant="body2"
              color="text.tertiary"
              sx={{ fontSize: '0.8rem' }}
            >
              50 pts, 100 exp
            </Typography>
          </ListItem>
        ))}
      </List>
    </FeatureBox>
  );
};

export const RewardsGallery = ({ onClickRewardDetails }: any) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box mt={0} mb={3}>
      <Typography component="h5" variant="h6" mb={2} mt={1}>
        Rewards Available
      </Typography>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: { pl: 3, pr: 3 },
          [theme.breakpoints.down('md')]: { pl: 1, pr: 2 },
        })}
      >
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              sx={(theme) => ({
                [theme.breakpoints.up('md')]: { mr: 0, maxWidth: '94%' },
                [theme.breakpoints.down('md')]: { mr: 0 },
              })}
              key={item}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://previews.123rf.com/images/ganpanjaneedesign/ganpanjaneedesign1604/ganpanjaneedesign160400045/56067507-red-gift-voucher-coupon-design-ticket-banner-cards-polygon-background.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Voucher 20$
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Cost: 10 pts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: -2 }}>
                <Button size="small">Reedem</Button>
                <Button size="small" onClick={() => onClickRewardDetails({})}>
                  See details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export const RewardDetailsModal = ({ open, setOpen, data }: any) => {
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
