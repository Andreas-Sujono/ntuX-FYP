import React, { memo } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { CourseCard } from '../../ManageCourses/ManageCourses';
import { Role } from 'Models/Auth';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';

function PopularCourses({ data, user }: any) {
  const history = useHistory();
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
        {user.role === Role.ADMIN && (
          <>
            Latest Courses{' '}
            <Button onClick={() => history.push(routes.STAFF.MANAGE_COURSES)}>
              See More
            </Button>
          </>
        )}
        {user.role !== Role.ADMIN && <>Your Courses</>}
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

export default memo(PopularCourses);
