import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Container from '@mui/material/Container';
import { Paper, Box } from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { routes } from 'Components/Routes';
import { useSelector } from 'react-redux';
import { selectCourseContentById } from 'Store/Selector/courses';
import { CourseContent } from 'Models/Courses';
import EditorShower from 'common/Components/EditorShower';

export default function CourseContentPage() {
  const location = useLocation();
  const match: any = useRouteMatch(routes.COURSES.BASE) || {};
  const [chosenData, setChosenData] = useState<any>({});

  if (match?.params?.courseId === ':courseId' || !match?.params?.courseId)
    match.params = { courseId: null };

  const allCourseContentsById = useSelector(selectCourseContentById) || {};
  const courseContents: CourseContent[] =
    allCourseContentsById[match?.params?.courseId] || [];

  useEffect(() => {
    const { pageId: queryPageId } = queryString.parse(location.search);
    const chosenCourseContent = courseContents.find(
      (item) =>
        String(item.id) === String(queryPageId) || item.pageId === queryPageId,
    );
    setChosenData(chosenCourseContent);
  }, [location.search]);

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
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
          <EditorShower
            pid={chosenData?.id}
            blocks={chosenData.metadata || []}
            courseId={match?.params?.courseId}
            handleUpdate={() => null}
            isDisabled
          />
        </Paper>
      </Box>
    </Container>
  );
}
