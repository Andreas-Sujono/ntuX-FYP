import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider } from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';
import { selectCourseContentById } from 'Store/Selector/courses';
import { CourseContent } from 'Models/Courses';
import EditorShower from 'common/Components/EditorShower';

export default function CourseContentPage() {
  const location = useLocation();
  const match: any = useRouteMatch(routes.COURSES.BASE) || {};
  const [finalBlocks, setFinalBlocks] = useState([]);

  if (match?.params?.courseId === ':courseId' || !match?.params?.courseId)
    match.params = { courseId: null };

  const { pageId: queryPageId } = queryString.parse(location.search);

  const allCourseContentsById = useSelector(selectCourseContentById) || {};
  const courseContents: CourseContent[] =
    allCourseContentsById[match?.params?.courseId] || [];

  useEffect(() => {
    const chosenCourseContent = courseContents.find(
      (item) => item.pageId === queryPageId,
    );

    if (chosenCourseContent) {
      setFinalBlocks(chosenCourseContent?.metadata || []);
    }
  }, [allCourseContentsById]);

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 2, mb: 6, ml: 1, mr: 1 }}>
      <EditorShower blocks={finalBlocks} />
      {/* <Grid container sx={{ pr: 2 }}>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">Lesson {queryPageId}</Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Modern industrial processes are large, complex and have high
              degree of interaction with many variables. This makes problem
              solving difficult and leads to “disappearing problem” syndrome.
              Problem often disappear without solving will reappear again. This
              course aims to provide an elementary approach of combining cause
              and effect problem solving thinking with formulation of
              theoretically correct hypothesis to provide quick and effective
              problem-solving techniques for the process industries. The initial
              part of the course aims to provide basic problem solving approach
              applicable to any industrial problems and the second part aims to
              provide basics of some common process equipment and utilization of
              chemical engineering fundamentals to develop technically correct
              hypothesis that is the key to the successful problem solving. This
              course includes both sample problems and working sessions to allow
              participants to develop confidence approach.
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
    </Container>
  );
}
