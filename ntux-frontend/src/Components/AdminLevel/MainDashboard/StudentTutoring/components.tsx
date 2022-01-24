import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { green, red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { selectUser } from 'Store/Selector/auth';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'common/hooks';
import {
  createRequest,
  getAllReviews,
  getAllTutors,
  updateOffer,
  updateRequest,
} from 'Store/Actions/tutoring';
import { selectAllTutors } from 'Store/Selector/tutoring';
import { getLevelAndBadges, makePath } from 'common/utils';
import { LinearProgressWithLabel } from '../MyCourses/Styles';
import { toast } from 'react-toastify';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';
import { GiveReviewModal } from './Review';

const rows = [
  { id: 1, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
  { id: 2, eventName: 'Finish lesson1', createdAt: new Date(), points: 10 },
];

export function ProfileBox({ selfTutor }: any) {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>(null);

  const user = useSelector(selectUser);
  return (
    <Box style={{ width: '100%', maxWidth: '100%' }}>
      <TutorDetailsModal
        open={open}
        setOpen={setOpen}
        data={{
          ...selfTutor,
          user,
        }}
        enableCreateRequest={false}
      />
      <Card sx={{ minWidth: 275, boxShadow: 0 }}>
        <CardContent sx={{ padding: 0 }}>
          <Avatar
            sx={{
              bgcolor: green[500],
              width: 80,
              height: 80,
              fontSize: '2.5rem',
            }}
            aria-label="recipe"
            src={user.currentAvatar?.imageUrl || '#'}
          >
            {user.fullName.slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            {user.fullName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {selfTutor.courses?.length ? (
              <>
                You are qualified to be a tutor of:
                <ul>
                  {selfTutor.courses.map((course) => (
                    <li key={course.id}>
                      {course.code}: {course.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>You need to finish at least 1 course to be a tutor</span>
            )}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Button onClick={() => setOpen(true)}>See My Profile</Button>
        </CardActions>
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
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState('');
  const [chosenData, setChosenData] = React.useState(null);

  const dispatch = useThunkDispatch();

  const data = useSelector(selectAllTutors);
  const user = useSelector(selectUser);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ref = React.useRef<any>(null);

  const onSearch = (value) => {
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(async () => {
      dispatch(getAllTutors(value));
      ref.current = null;
    }, 200);
  };

  return (
    <Paper style={{ width: '100%', maxWidth: '100%' }} sx={{ p: 2 }}>
      <TutorDetailsModal
        open={!!chosenData}
        setOpen={(bool) => setChosenData(null)}
        data={chosenData}
      />
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
        value={searchInput}
        onChange={(e) => onSearch(e.target.value)}
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
        {data.map((item) => {
          const coursesCode = item.courses
            .map((course) => course.code)
            .join(', ');

          const levelData = getLevelAndBadges(item.user.totalExps);
          return (
            <Grid item xs={12} md={4} lg={3} key={item.id}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: green[500],
                    }}
                    aria-label="recipe"
                    src={item.user?.currentAvatar?.imageUrl || '#'}
                  >
                    {item.user?.fullName?.slice(0, 1)?.toUpperCase()}
                  </Avatar>
                }
                title={item.user?.fullName}
                subheader={`Lv ${levelData.level}, ${coursesCode} Tutor`}
              />
              {/* <Button size="small">Make Request</Button> */}
              {user.id !== item.user.id && (
                <Button size="small" onClick={() => setChosenData(item)}>
                  See Details
                </Button>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.floor(data.length / rowsPerPage) + 1}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Paper>
  );
};

export const RequestHistory = ({ data }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>(null);

  const dispatch = useThunkDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onCancel = (id) => {
    const confirm = window.confirm(
      'Are you sure you want to cancel this request?',
    );
    if (!confirm) return;
    dispatch(
      updateRequest({
        id,
        status: 'CANCELLED',
      }),
    );
  };

  return (
    <TableContainer component={Paper}>
      <GiveReviewModal data={modalData} open={open} setOpen={setOpen} />
      <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
        Tutor Request:
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tutor Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">status</TableCell>
            <TableCell align="left">Request Date</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.tutor?.user?.fullName}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color:
                      row.status === 'PENDING'
                        ? '#ffc107'
                        : row.status === 'CANCELLED'
                        ? 'red'
                        : '#28a745',
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell align="left">
                  {moment(row.createdAt).format('DD/MMM/YYYY')}
                </TableCell>
                <TableCell align="left">
                  {/* <Button>Messages</Button> */}
                  {row.status === 'PENDING' && (
                    <Button onClick={() => onCancel(row.id)}>Cancel</Button>
                  )}
                  {row.status === 'APPROVED' && (
                    <>
                      {!row?.reviews?.length && (
                        <Button
                          onClick={() => {
                            setModalData(row);
                            setOpen(true);
                          }}
                        >
                          Give Review
                        </Button>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export const OfferHistory = ({ data }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useThunkDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onReject = (id) => {
    const confirm = window.confirm(
      'Are you sure you want to reject this offer?',
    );
    if (!confirm) return;
    dispatch(
      updateOffer({
        id,
        status: 'REJECTED',
      }),
    );
  };

  const onApprove = (id) => {
    const confirm = window.confirm(
      'Are you sure you want to approve this offer?',
    );
    if (!confirm) return;
    dispatch(
      updateOffer({
        id,
        status: 'APPROVED',
      }),
    );
  };
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
        Tutor Offers:
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">status</TableCell>
            <TableCell align="left">Request Date</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.user?.fullName}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color:
                      row.status === 'PENDING'
                        ? '#ffc107'
                        : row.status === 'REJECTED'
                        ? 'red'
                        : '#28a745',
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell align="left">
                  {moment(row.createdAt).format('DD/MMM/YYYY')}
                </TableCell>
                <TableCell align="left">
                  {/* <Button>Messages</Button> */}
                  {row.status === 'PENDING' && (
                    <>
                      <Button onClick={() => onReject(row.id)}>Reject</Button>
                      <Button onClick={() => onApprove(row.id)}>Approve</Button>
                    </>
                  )}
                  {/* {row.status === 'APPROVED' && (
                    <>
                      <Button onClick={() => onReject(row.id)}>
                        Give Review
                      </Button>
                    </>
                  )} */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export const TutorDetailsModal = ({
  open,
  setOpen,
  data,
  enableCreateRequest = true,
}: any) => {
  data = data || {};

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);

  const dispatch = useThunkDispatch();
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isAndreasServer = window.location.origin.includes('andreassujono');
  const portfolioUrl = `${window.location.origin}/${
    isAndreasServer ? '' : ''
  }#/portfolio/${data?.user?.id}`;

  const onUpdateFormData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const res = await dispatch(
      createRequest({
        description: formData.description,
        tutor: data?.id,
      }),
    );
    if (res.result) {
      toast.success('Request created successfully');
      handleClose();
    }
    setLoading(false);
    console.log('submitted');
  };

  useEffect(() => {
    if (data?.id) initializeReviews();
  }, [data?.id]);

  const initializeReviews = async () => {
    const res = await dispatch(getAllReviews(data?.id));
    setReviews(res.data || []);
  };

  if (!data) return null;

  const levelData = getLevelAndBadges(data?.user?.totalExps);
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
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '80vh',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Avatar
              sx={{
                bgcolor: green[500],
                width: 80,
                height: 80,
                fontSize: '2.5rem',
              }}
              aria-label="recipe"
              src={data?.currentAvatar?.imageUrl || '#'}
            >
              {data?.user?.fullName?.slice(0, 1)?.toUpperCase()}
            </Avatar>
            <Typography variant="h6" component="div" sx={{ mt: 1 }}>
              {data?.user?.fullName}
            </Typography>
            <Button
              sx={{ display: 'inline', ml: -1 }}
              onClick={() => window.open(portfolioUrl)}
            >
              See Portfolio
            </Button>
            <Typography sx={{ mb: 0 }} color="text.secondary">
              {!!data?.courses?.length && (
                <>
                  Tutor of:
                  <ul>
                    {data?.courses?.map((course) => (
                      <li key={course.id}>
                        {course.code}: {course.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={1} sx={{ maxWidth: '50px' }}>
                <MilitaryTechIcon
                  sx={{ fontSize: '3rem', color: levelData.badgeColor }}
                />
              </Grid>
              <Grid item xs={12} md={9} sx={{ ml: 2 }}>
                <Typography component="h5" variant="h6">
                  Level {levelData.level} ({levelData.bagdesLabel})
                </Typography>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={levelData.progress}
                  label={`${data?.user?.totalExps} / ${levelData.nextLevelExp} Exp`}
                  sx={{ mt: 0 }}
                  type="string"
                  minWidth={100}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2, mt: 2 }} />

                <span style={{ verticalAlign: 'middle' }}>
                  Overall Rating:{' '}
                </span>
                <Rating
                  name="half-rating-read"
                  defaultValue={data?.rating || 0}
                  precision={0.5}
                  readOnly
                  sx={{
                    verticalAlign: 'middle',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {enableCreateRequest && (
          <>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid
                container
                spacing={{
                  xs: 2,
                  md: 2,
                }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="description"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    placeholder="Hello, I want to ask you to help me with course EE4013"
                    value={formData.description || ''}
                    onChange={onUpdateFormData}
                    multiline
                    rows={5}
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
                Create Request
              </Button>
            </Box>
          </>
        )}

        <Divider sx={{ mb: 1, mt: 1 }} />
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 2 }}>
          Reviews ({reviews?.length || 0})
        </Typography>

        <Grid
          container
          spacing={{
            xs: 2,
            md: 2,
            mb: 3,
          }}
        >
          {reviews.map((item) => (
            <Grid item xs={12} sm={12} key={item.id}>
              <Paper sx={{ p: 1 }}>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} md={7}>
                    <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                      {item.review}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: green[500],
                            width: 30,
                            height: 30,
                            fontSize: '0.9rem',
                          }}
                          aria-label="recipe"
                        >
                          {item.user.fullName?.slice(0, 1)?.toUpperCase()}
                        </Avatar>
                      }
                      title={item.user?.fullName}
                      sx={{
                        p: 0,
                      }}
                    />

                    <Rating
                      name="half-rating-read"
                      defaultValue={item.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};
