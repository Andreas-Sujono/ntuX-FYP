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
  const [formData, setFormData] = useState<any>(
    initializeJSON(portfolio.workExperiencesJSON),
  );

  const dispatch = useThunkDispatch();

  const data = formData.data || [
    {
      title: '',
      companyName: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ];

  const addData = () => {
    setFormData({
      ...formData,
      data: [
        ...data,
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

  const removeData = (index: number) => {
    setFormData({
      ...formData,
      data: data.filter((_, i) => i !== index),
    });
  };

  const updateData = (index: number, _data: any) => {
    setFormData({
      ...formData,
      data: data.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          ..._data,
        };
      }),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(
      updatePortfolio({
        workExperiencesJSON: formData,
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
            Work Experience
          </Typography>
          <Button variant="contained" type="submit">
            Update
          </Button>
          {/* <Button>Cancel</Button> */}
        </Grid>
        {data.map((item, index) => (
          <>
            <Grid item xs={12} sm={12}>
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Typography
                component="h3"
                variant="h6"
                sx={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                Work Experience {index + 1}
              </Typography>
              {data.length > 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    removeData(index);
                  }}
                  sx={{ ml: 2, color: 'lightgrey', verticalAlign: 'middle' }}
                >
                  Remove Work Experience
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                size="medium"
                defaultValue={item.title}
                value={item.title}
                onChange={(e) => {
                  updateData(index, {
                    ...item,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="companyName"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                size="medium"
                defaultValue={item.companyName}
                value={item.companyName}
                onChange={(e) => {
                  updateData(index, {
                    ...item,
                    companyName: e.target.value,
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
                  updateData(index, {
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
                  updateData(index, {
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
                  updateData(index, {
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
          if (data[data.length - 1].school === '') return;
          addData();
        }}
        sx={{ mt: 2 }}
      >
        Add New Work Experience
      </Button>
    </Paper>
  );
}
