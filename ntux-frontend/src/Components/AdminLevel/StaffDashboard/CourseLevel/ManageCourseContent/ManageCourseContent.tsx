import React from 'react';
import queryString from 'query-string';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Editor from 'common/Components/Editor';

export default function ManageCourseContent() {
  const location = useLocation();
  const { pageId: queryPageId } = queryString.parse(location.search);

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
      <Paper sx={{ p: 3 }}>
        <Editor />
      </Paper>
    </Container>
  );
}
