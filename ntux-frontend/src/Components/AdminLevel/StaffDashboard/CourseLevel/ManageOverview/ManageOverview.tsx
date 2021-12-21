import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  Typography,
  Paper,
  Divider,
  TextField,
  Box,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ManageOverview() {
  const [personName, setPersonName] = React.useState([]);
  const theme = useTheme();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{ margin: 0, mt: 4, mb: 15, ml: 'auto', mr: 'auto' }}
    >
      <Paper component="form" noValidate onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container sx={{ pr: 2 }} spacing={3}>
          <Grid item xs={12}>
            <Typography component="h3" variant="h6">
              Basic Details
            </Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="file"
              type="file"
              name="file"
              value=""
              label="Course Banner Image"
              // variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="CourseCode"
              required
              fullWidth
              id="CourseCode"
              label="Course Code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="courseName"
              required
              fullWidth
              id="courseName"
              label="Course Name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="demo-multiple-chip-label">Lecturers</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Lecturers" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="aboutCourse"
              label="About Course"
              type="textarea"
              name="aboutCourse"
              rows={6}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="courseObjectives"
              label="Course Objectives"
              type="textarea"
              name="courseObjectives"
              rows={6}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="courseOutlines"
              label="Course Outlines"
              type="textarea"
              name="courseOutlines"
              rows={6}
              multiline
            />
          </Grid>
        </Grid>
      </Paper>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ top: 'auto', bottom: 0, background: 'white' }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: 'fles',
              justifyContent: 'flex-end',
              columnGap: '1rem',
            }}
          >
            <Button variant="contained" sx={{ mr: 1 }}>
              Update
            </Button>
            <Button sx={{ mr: 1 }}>Cancel</Button>
            <Button>Delete Course</Button>
          </Container>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
