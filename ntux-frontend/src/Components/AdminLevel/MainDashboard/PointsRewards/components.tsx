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
  Grid,
  Avatar,
} from '@mui/material';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import { FeatureBox } from '../Dashboard/Styles';
import { useSelector } from 'react-redux';
import {
  selectAvatars,
  selectGoalTask,
  selectRewards,
  selectRewardsRedeemed,
} from 'Store/Selector/pointsRewards';
import { Reward } from 'Models/pointsRewards';

// const HowToGetPointsData = [
//   'Finish online course',
//   'Ask answer question in forum discussion',
//   'Answer question in forum discussion',
//   'create your portfolio site',
//   'tutor student',
// ];

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
  const rewardsRedeemed = useSelector(selectRewardsRedeemed);

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
          {!rewardsRedeemed.length && (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant="body1"
                  component="h5"
                  color="text.tertiary"
                  sx={{
                    width: '100%',
                    height: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  No Data
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {rewardsRedeemed.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.reward.name}
              </TableCell>
              <TableCell align="left">{item.reward.description}</TableCell>
              <TableCell align="left">
                {moment(item.createdAt).format('DD MMMM YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const HowToGetPoints = ({ limit = null }: any) => {
  let goalTask = useSelector(selectGoalTask);
  if (limit) goalTask = goalTask.slice(0, limit);
  return (
    <FeatureBox sx={{ padding: '1rem' }}>
      <Typography component="h5" variant="h6">
        Today Goals
      </Typography>

      <List dense={false}>
        {goalTask.map((item) => (
          <ListItem key={item.id} divider sx={{ p: 0.5 }}>
            <ListItemText
              primary={item.taskName}
              sx={{ fontSize: '18px' }}
              color="text.secondary"
            />
            <Typography
              variant="body2"
              color="text.tertiary"
              sx={{ fontSize: '0.8rem' }}
            >
              {item.points} pts, {item.exps} exp
            </Typography>
          </ListItem>
        ))}
      </List>
    </FeatureBox>
  );
};

// const defaultRewards: Reward[] = [
//   {
//     id: -1,
//     name: 'Premium Portfolio Setting - 1 Month',
//     description:
//       'You can customize the theme of your portfolio and hide the navigation bar and footer',
//     totalPointsRequired: 250,
//     totalExpsRequired: 0,
//     isPublished: true,
//     imageUrl: 'https://img.idesign.vn/2021/01/heroimg.png',
//   },
//   {
//     id: -2,
//     name: 'Premium Portfolio Setting - 3 Month',
//     description:
//       'You can customize the theme of your portfolio and hide the navigation bar and footer',
//     totalPointsRequired: 700,
//     totalExpsRequired: 0,
//     isPublished: true,
//     imageUrl: 'https://img.idesign.vn/2021/01/heroimg.png',
//   },
//   {
//     id: -2,
//     name: 'Points and Exps Multiplier - 1.5x',
//     description:
//       'For every points or exps you earn, you will earn 1.5x of the points or exps you earn',
//     totalPointsRequired: 400,
//     totalExpsRequired: 0,
//     isPublished: true,
//     imageUrl:
//       'https://image.freepik.com/free-vector/loyalty-program-getting-gift-reward-flat-illustration_169533-11.jpg',
//   },
// ];
export const RewardsGallery = ({ onClickRewardDetails }: any) => {
  const rewards = useSelector(selectRewards);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(rewards.length, 4),
    slidesToScroll: 1,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: Math.min(rewards.length, 4),
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(rewards.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
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
          {rewards.map((item: Reward) => (
            <Card
              sx={(theme) => ({
                [theme.breakpoints.up('md')]: { mr: 0, maxWidth: '94%' },
                [theme.breakpoints.down('md')]: { mr: 0 },
                cursor: 'pointer',
              })}
              key={item.id}
              onClick={() => onClickRewardDetails(item)}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="primary"
                >
                  Cost: {item.totalPointsRequired} pts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: -2 }}>
                <Button size="small">Reedem</Button>
                <Button size="small" onClick={() => onClickRewardDetails(item)}>
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
  data = data || {};
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
        <Card sx={{ maxWidth: '800px', minWidth: '350px' }}>
          <CardMedia
            component="img"
            height="240"
            image={data.imageUrl}
            alt={data.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Reedem</Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export const AvatarShop = () => {
  const avatars = useSelector(selectAvatars);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography component="h5" variant="h6">
        Avatar Shop
      </Typography>
      <Typography component="div" variant="body1" color="text.secondary">
        You can buy avatar with your points. Choose your avatar in the profile
        settings
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {avatars.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            key={item.id}
            sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}
          >
            <Avatar
              alt={item.name}
              src={item.imageUrl}
              sx={{ width: 80, height: 80 }}
            />
            <div>
              <Typography component="div" variant="h6" color="text.secondary">
                {item.name}
              </Typography>
              <div
                style={{ fontSize: '1rem', color: 'red', marginTop: '-4px' }}
              >
                Cost: {item.pointsRequired} pts
              </div>
              <Button>Buy</Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
