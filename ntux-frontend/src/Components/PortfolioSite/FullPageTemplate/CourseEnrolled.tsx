import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Divider, TextField, Button } from '@mui/material';
import { CourseCard } from 'Components/AdminLevel/MainDashboard/MyCourses/MyCourses';

export default function CourseEnrolled({ data, sx }: any) {
  sx = sx || {};
  return (
    <Paper sx={{ mt: 3, p: 2, ...sx }}>
      <Typography component="h3" variant="h6">
        Courses Enrolled
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.2 }} />
      <Grid container spacing={3}>
        {data.map((item: any) => (
          <Grid
            item
            xs={12}
            md={6}
            sx={{ marginLeft: 0 }}
            key={item.id}
            onClick={(e) => e.stopPropagation()}
          >
            <CourseCard
              course={item.course}
              courseBatch={item.courseBatch}
              notGo
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
