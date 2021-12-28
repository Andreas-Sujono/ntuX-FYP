import React from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { CourseCard } from '../../ManageCourses/ManageCourses';

function PopularCourses({ data }: any) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
        Latest Courses <Button>See More</Button>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          // justifyContent: 'space-between',
          columnGap: '1rem',
          rowGap: '1rem',
          mt: 4,
        }}
      >
        {data.map((item) => (
          <CourseCard key={item.id} data={item} />
        ))}
      </Box>
    </Paper>
  );
}

export default PopularCourses;
