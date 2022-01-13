import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Modal,
  Grid,
  Avatar,
  TablePagination,
} from '@mui/material';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectMyAchievements } from 'Store/Selector/pointsRewards';
import { Reward } from 'Models/pointsRewards';
import { selectUser } from 'Store/Selector/auth';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { buyAvatar, redeemReward } from 'Store/Actions/pointsRewards';

export const BadgesBoard = () => {
  const myAchievements = useSelector(selectMyAchievements);

  return (
    <Box sx={{ padding: '1rem' }}>
      <List dense={false}>
        {myAchievements.nextAchievements.map((item) => (
          <ListItem key={item.id} divider sx={{ p: 0.5 }}>
            <ListItemText
              primary={item.name}
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
    </Box>
  );
};

// export const RewardDetailsModal = ({ open, setOpen, data }: any) => {
//   data = data || {};

//   const [loading, setLoading] = useState(false);

//   const dispatch = useThunkDispatch();
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const onRedeem = async () => {
//     const confirm = window.confirm(
//       'Are you sure you want to redeem this reward?',
//     );
//     if (!confirm) return;
//     setLoading(true);
//     const res = await dispatch(
//       redeemReward({
//         reward: data.id,
//       }),
//     );
//     setLoading(false);
//     handleClose();
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           border: '0',
//           boxShadow: 24,
//         }}
//       >
//         <Card sx={{ maxWidth: '800px', minWidth: '350px' }}>
//           <CardMedia
//             component="img"
//             height="240"
//             image={data.imageUrl}
//             alt={data.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h6" component="div">
//               {data.name}
//             </Typography>
//             <Typography
//               gutterBottom
//               variant="body2"
//               component="div"
//               color="primary"
//             >
//               Cost: {data.totalPointsRequired} pts
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {data.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small" onClick={onRedeem} disabled={loading}>
//               Reedem
//             </Button>
//           </CardActions>
//         </Card>
//       </Box>
//     </Modal>
//   );
// };
