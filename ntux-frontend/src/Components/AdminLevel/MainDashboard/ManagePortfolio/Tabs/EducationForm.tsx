import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPortfolio, selectUser } from 'Store/Selector/auth';
import { useThunkDispatch } from 'common/hooks';
import { updatePortfolio } from 'Store/Actions/auth';
import { toast } from 'react-toastify';

export const initializeJSON = (json: any) => {
  if (!json) return {};
  try {
    if (typeof json === 'string') {
      return JSON.parse(json);
    }
    return json;
  } catch (e) {
    return {};
  }
};

export default function BasicDetailsForm() {
  const user = useSelector(selectUser);
  const userPortfolio = useSelector(selectPortfolio);
  const portfolio = userPortfolio?.user?.portfolio || {};
  const [educations, setEducations] = useState<any>(
    initializeJSON(portfolio.educationsJSON),
  );

  const dispatch = useThunkDispatch();

  const educationData = educations.data || [
    {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ];

  const addEducation = () => {
    setEducations({
      ...educations,
      data: [
        ...educationData,
        {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    setEducations({
      ...educations,
      data: educationData.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, data: any) => {
    setEducations({
      ...educations,
      data: educationData.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          ...data,
        };
      }),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dispatch(
      updatePortfolio({
        educationsJSON: educations,
      }),
    );
    toast.success('Portfolio is updated');
  };

  return (
    <Paper component="form" noValidate onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid
        container
        spacing={{
          xs: 2,
          md: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h6"
            sx={{ display: 'inline-block', width: 'calc(100% - 120px)' }}
          >
            Education
          </Typography>
          <Button variant="contained" type="submit">
            Update
          </Button>
          {/* <Button>Cancel</Button> */}
        </Grid>
        {educationData.map((item, index) => (
          <>
            <Grid item xs={12} sm={12}>
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Typography
                component="h3"
                variant="h6"
                sx={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                Education {index + 1}
              </Typography>
              {educationData.length > 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    removeEducation(index);
                  }}
                  sx={{ ml: 2, color: 'lightgrey', verticalAlign: 'middle' }}
                >
                  Remove Education
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="schoolName"
                required
                fullWidth
                id="schoolName"
                label="School Name"
                size="medium"
                defaultValue={item.school}
                value={item.school}
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    school: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="degree"
                required
                fullWidth
                id="degree"
                label="Degree"
                size="medium"
                defaultValue={item.degree}
                value={item.degree}
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    degree: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fieldOfStudy"
                required
                fullWidth
                id="fieldOfStudy"
                label="Field of Study"
                size="medium"
                defaultValue={item.fieldOfStudy}
                value={item.fieldOfStudy}
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    fieldOfStudy: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                required
                fullWidth
                id="startDate"
                label="Start Date"
                size="medium"
                type="date"
                defaultValue={item.startDate}
                value={item.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    startDate: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="endDate"
                required
                fullWidth
                id="endDate"
                label="End Date"
                size="medium"
                type="date"
                defaultValue={item.endDate}
                value={item.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    endDate: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                size="medium"
                defaultValue={item.description}
                value={item.description}
                rows={5}
                multiline
                onChange={(e) => {
                  updateEducation(index, {
                    ...item,
                    description: e.target.value,
                  });
                }}
              />
            </Grid>
          </>
        ))}
      </Grid>
      <Button
        type="button"
        onClick={() => {
          if (educationData[educationData.length - 1].school === '') return;
          addEducation();
        }}
        sx={{ mt: 2 }}
      >
        Add New Education
      </Button>
    </Paper>
  );
}
