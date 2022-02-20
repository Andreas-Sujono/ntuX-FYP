import React, { useRef, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { CourseCard as LPCourseCard } from '../../../LandingPage/Homepage/ExploreCourses/Styles';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { routes } from '../../../Routes';
import {
  getCourseStatus,
  makePath,
  searchFromListOfObject,
} from 'common/utils';
import { useSelector } from 'react-redux';
import { selectAllCourses, selectAllLecturers } from 'Store/Selector/admin';
import { toast } from 'react-toastify';
import { useThunkDispatch } from 'common/hooks';
import { createCourse, getAllCourses, uploadFile } from 'Store/Actions/admin';
import { selectUser } from 'Store/Selector/auth';
import { Role } from 'Models/Auth';
import { selectMyCourses } from 'Store/Selector/courses';
import { getMyCourses } from 'Store/Actions/courses';

export const CourseCard = ({ data }: any) => {
  const history = useHistory();
  const cousePath = makePath(routes.STAFF_COURSES.BASE, { courseId: data.id });
  return (
    <LPCourseCard
      onClick={() => history.push(cousePath)}
      style={{ maxWidth: '320px' }}
    >
      <img src={data.imageUrl} style={{ maxHeight: '140px' }} />
      <div className="details" style={{ padding: '1.1rem' }}>
        <div
          className="name"
          style={{
            height: '54px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1.3rem',
          }}
        >
          {data.code}: {data.name}
        </div>
        <div className="hours">{data.totalHours} Hours</div>
        <div
          className="batch"
          style={{
            color: data.status === 'DRAFT' ? 'lightgrey' : 'green',
            fontSize: '1rem',
          }}
        >
          {data.status}
        </div>
      </div>
    </LPCourseCard>
  );
};

export default function ManageCourses() {
  const allCourses = useSelector(selectMyCourses);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useThunkDispatch();

  const user = useSelector(selectUser);

  const ref = useRef<any>(null);

  const onChange = (e: any) => {
    const value = e.target.value;
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(
        allCourses,
        ['name', 'code'],
        value,
      );
      setSearchResult(result);
      ref.current = null;
    }, 100);
  };

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getMyCourses());
  });

  const final = searchInput ? searchResult : allCourses;

  return (
    <Container maxWidth="lg" sx={{ margin: 0, mt: 6, mb: 8, ml: 1, pr: 1 }}>
      <CreateCourseModal open={openModal} setOpen={setOpenModal} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            label="Search Courses"
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
            value={searchInput}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            onClick={() => setOpenModal(true)}
            disabled={user?.role !== Role.ADMIN}
          >
            Create New Course
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              // justifyContent: 'space-between',
              columnGap: '1rem',
              rowGap: '1rem',
            }}
          >
            {final.map((item) => (
              <CourseCard key={item.id} data={item} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(id, personName, theme) {
  return {
    fontWeight:
      personName.indexOf((item) => item.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const SelectLecturers = ({ data, setData }: any) => {
  const allLecturers = useSelector(selectAllLecturers);
  const theme = useTheme();
  const [dataMapped, setDataMapped] = useState<any>([]);

  useEffect(() => {
    const idsSet = new Set(data.map((item) => item.id));
    const mapped = allLecturers.filter((item) => idsSet.has(item.id));
    setDataMapped(mapped);
  }, [data]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // const idSet = new Set<any>([]);
    // const values: any = [];

    // value.forEach((item: any) => {
    //   if (!idSet.has(item.id)) {
    //     values.push(item);
    //     idSet.add(item.id);
    //   }
    // });
    setData(value);
    // console.log(values);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-chip-label">Lecturers</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={dataMapped}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Lecturers" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((item) => (
              <Chip key={item.id} label={item.fullName} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {allLecturers.map((item) => (
          <MenuItem
            key={item.id}
            value={item}
            style={getStyles(item.id, data, theme)}
          >
            {item.fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const CreateCourseModal = ({ open, setOpen, data }: any) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('DRAFT');
  const [lecturers, setLecturers] = useState<any>([]);
  const [file, setFile] = useState<any>(null);

  const dispatch = useThunkDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const courseData: any = {
      name: formData.get('name') as string,
      code: formData.get('code') as string,
      totalHours: Number(formData.get('totalHours') as string),
      lecturers: lecturers.map((item) => ({ id: item.id })),
      status,
    };

    if (
      !courseData.name ||
      !courseData.code ||
      !courseData.totalHours ||
      !courseData.lecturers.length
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    if (file) {
      const { url } = await dispatch(uploadFile(file));
      courseData.imageUrl = url;
      console.log(courseData);
    }

    await dispatch(createCourse(courseData));
    toast.success('Couse is created succesfully');
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
                Create New Course
              </Typography>
              <Divider sx={{ mb: 2, mt: 0.5 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="file"
                type="file"
                name="file"
                label="Course Banner Image"
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
                label="Course Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="code"
                label="Course Code"
                name="code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="totalHours"
                required
                fullWidth
                id="totalHours"
                label="Total Hours"
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
            <Grid item xs={12} sm={12}>
              <SelectLecturers data={lecturers} setData={setLecturers} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Create new course
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
