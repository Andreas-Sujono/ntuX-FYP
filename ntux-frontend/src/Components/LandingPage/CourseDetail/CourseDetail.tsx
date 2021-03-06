/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect } from 'react';
import { PageContentContainer } from 'Components/shared/Shared.styles';
import {
  FullWidthContainer,
  BackgroundContainer,
  TopSummary,
  Status,
  AvailabilityBox,
  NavBar,
  Content,
} from './Styles';
import { HashLink } from 'react-router-hash-link';
import { Avatar, Button, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import { getCourseStatus, makePath } from 'common/utils';
import { routes } from 'Components/Routes';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { useThunkDispatch } from 'common/hooks';
import { getOnePublicCourse } from 'Store/Actions/courses';
import { LoadingBar } from 'common/Components/LoadingBar/FullPageLoadingBar';
import { Course } from 'Models/Courses';
import { useSelector } from 'react-redux';
import { selectMyCourses } from 'Store/Selector/courses';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';

function CourseDetail(): React.ReactElement {
  const history = useHistory();
  const dispatch = useThunkDispatch();
  const param: any = useParams();
  const [courseData, setCourseData] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState<any>(true);
  const myCourses = useSelector(selectMyCourses);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const { result, data } = await dispatch(
      getOnePublicCourse(param?.courseId),
    );
    setCourseData(data || {});
    setLoading(false);
  };

  const getDateString = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return `${moment(startDate).format('DD MMMM YYYY')} - ${moment(
      endDate,
    ).format('DD MMMM YYYY')}`;
  };

  const onClickRegister = (id) => {
    id = Number(id);
    const myCourseIds = new Set(myCourses.map((item) => item.course.id));
    if (myCourseIds.has(id))
      return toast.error('You already register this course');
    history.push(makePath(routes.REGISTER_COURSE, { courseId: '1' }));
  };

  if (courseData?.courseBatches)
    courseData.courseBatches =
      courseData?.courseBatches?.filter(
        (item) => new Date(item.endDate) > new Date(),
      ) || [];
  const courseStatus = getCourseStatus(courseData?.courseBatches || []);
  const isOpenRegistration = courseStatus === 'Open Registration';

  if (loading) {
    return (
      <FullWidthContainer>
        <BackgroundContainer />
        <PageContentContainer>
          <LoadingBar height="70vh" />
        </PageContentContainer>
      </FullWidthContainer>
    );
  }

  return (
    <FullWidthContainer>
      <BackgroundContainer />
      <PageContentContainer>
        <TopSummary>
          <div className="left-content">
            <img src={courseData?.imageUrl} />
          </div>
          <div className="right-content">
            <h1>{courseData?.name}</h1>
            <Status
              style={{
                color:
                  courseStatus !== 'Open Registration'
                    ? 'lightgrey'
                    : '#46b712',
              }}
            >
              {courseStatus}
            </Status>
            <AvailabilityBox>
              Course Availability:
              <ul>
                {courseData?.courseBatches?.map((batch) => (
                  <li key={batch.id}>
                    {getDateString(batch.startDate, batch.endDate)}
                  </li>
                ))}
              </ul>
              Registration Availability:
              <ul>
                {courseData?.courseBatches?.map((batch) => (
                  <li key={batch.id}>
                    {getDateString(
                      batch.registrationStartsAt,
                      batch.registrationEndsAt,
                    )}
                  </li>
                ))}
              </ul>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
                onClick={() => {
                  onClickRegister(courseData?.id);
                }}
                disabled={!isOpenRegistration}
              >
                Register
              </Button>
            </AvailabilityBox>
          </div>
        </TopSummary>

        <NavBar>
          <HashLink smooth to="#about">
            About
          </HashLink>
          <HashLink smooth to="#objectives">
            Objectives
          </HashLink>
          <HashLink smooth to="#outline">
            Outline
          </HashLink>
          <HashLink smooth to="#lecturers">
            Lecturers
          </HashLink>
        </NavBar>

        <Content>
          <div className="title" id="about">
            About
          </div>
          <div className="content">{courseData?.description}</div>
          <hr />
          <div className="title" id="objectives">
            Objectives
          </div>
          <div className="content">{courseData?.objectives}</div>
          <hr />
          <div className="title" id="outline">
            Outline
          </div>
          <div className="content">{courseData?.outline}</div>
          <hr />
          <div className="title" id="lecturers">
            Lecturers
          </div>
          <div className="content" style={{ fontSize: '30px' }}>
            {courseData?.lecturers?.map((lecturer: any) => (
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {lecturer.fullName.slice(0, 1).toUpperCase()}
                  </Avatar>
                }
                title={lecturer.fullName}
                subheader="Lecturer"
                size="large"
                key={lecturer.id}
              />
            ))}
          </div>
        </Content>
      </PageContentContainer>
    </FullWidthContainer>
  );
}

export default memo(CourseDetail);
