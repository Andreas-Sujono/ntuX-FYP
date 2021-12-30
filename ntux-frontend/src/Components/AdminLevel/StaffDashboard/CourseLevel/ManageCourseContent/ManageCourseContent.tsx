import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider, TextField, Button } from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Editor from 'common/Components/Editor';
import { routes } from 'Components/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCourseContentsByCourseId } from 'Store/Selector/admin';
import { updateCourseContent } from 'Store/Actions/admin/general';

export default function ManageCourseContent() {
  const location = useLocation();
  const { pageId: queryPageId } = queryString.parse(location.search);
  const dispatch = useDispatch();

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allData = useSelector(selectAllCourseContentsByCourseId) || {};
  const data = allData[match?.params?.courseId] || [];

  const chosenData = data.find((item: any) => item.pageId === queryPageId);

  const [pageName, setPageName] = useState(chosenData?.pageName);

  useEffect(() => {
    setPageName(chosenData?.pageName);
  }, [chosenData]);

  const updatePageName = () => {
    dispatch(
      updateCourseContent({
        course: match?.params?.courseId,
        pageId: queryPageId,
        pageName: pageName,
      }),
    );
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
      <Grid container sx={{ pr: 2, mb: 3 }} spacing={3}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', columnGap: '0.5rem' }}>
          <TextField
            name="pageName"
            required
            fullWidth
            id="pageName"
            label="Page Name"
            sx={{ background: 'white', minWidth: '100px' }}
            value={pageName}
            defaultValue={chosenData?.pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          <Button onClick={updatePageName}>Update</Button>
          {data.length > 1 && <Button>Delete</Button>}
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Editor
          blocks={chosenData?.metadata || []}
          courseId={match?.params?.courseId}
        />
      </Paper>
    </Container>
  );
}
