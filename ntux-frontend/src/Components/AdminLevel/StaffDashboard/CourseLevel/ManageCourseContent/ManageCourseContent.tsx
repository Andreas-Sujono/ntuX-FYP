import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Editor from 'common/Components/Editor';
import { routes } from 'Components/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCourseContentsByCourseId } from 'Store/Selector/admin';
import { toast } from 'react-toastify';
import { updateCourseContent } from 'Store/Actions/admin/general/courseContent.thunk';

export default function ManageCourseContent() {
  const location = useLocation();
  const { pageId: queryPageId } = queryString.parse(location.search);
  const dispatch = useDispatch();

  const match: any = useRouteMatch(routes.STAFF_COURSES.BASE) || {};
  if (match?.params?.courseId === ':courseId')
    match.params = { courseId: null };

  const allData = useSelector(selectAllCourseContentsByCourseId) || {};
  const data = allData[match?.params?.courseId] || [];

  const [chosenContentId, setChosenContentId] = useState(queryPageId);
  const [pageName, setPageName] = useState('');
  const [chosenData, setChosenData] = useState(
    data.find((item: any) => String(item.id) === String(chosenContentId)),
  );

  useEffect(() => {
    setPageName(chosenData?.pageName);
  }, [chosenData?.pageName]);

  useEffect(() => {
    const { pageId: _queryPageId } = queryString.parse(location.search);
    setChosenContentId(_queryPageId);
    setChosenData(
      data.find((item: any) => String(item.id) === String(_queryPageId)),
    );
  }, [location.search]);

  const updatePageName = () => {
    dispatch(
      updateCourseContent({
        id: chosenData?.id,
        course: match?.params?.courseId,
        pageName: pageName,
      }),
    );
    toast.success('Page name updated successfully');
  };

  const updatePageContent = (blockData: any, id: any) => {
    console.log('updatePageContent by editor');
    dispatch(
      updateCourseContent({
        id: id || chosenData?.id,
        course: match?.params?.courseId,
        metadata: blockData,
      }),
    );
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
      <Grid
        container
        sx={{
          pr: 2,
          mb: 3,
          maxWidth: '1070px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
        spacing={3}
      >
        <Grid item xs={12} sm={6} sx={{ display: 'flex', columnGap: '0.5rem' }}>
          <TextField
            name="pageName"
            required
            fullWidth
            id="pageName"
            label="Page Name"
            sx={{ background: 'white', minWidth: '100px' }}
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          <Button onClick={updatePageName}>Update</Button>
          {data.length > 1 && <Button>Delete</Button>}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          sx={(theme) => ({
            p: 3,
            maxWidth: '1020px',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
              p: 1,
              pt: 2,
            },
          })}
        >
          <Editor
            pid={chosenData?.id}
            blocks={chosenData?.metadata || []}
            courseId={match?.params?.courseId}
            handleUpdate={updatePageContent}
          />
        </Paper>
      </Box>
    </Container>
  );
}
