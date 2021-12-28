import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) => state.courses.general;

export const selectPublicCourses = (state: RootState) =>
  selectGeneralState(state).publicCourses;
export const selectAllCourses = (state: RootState) =>
  selectGeneralState(state).allCourses;
export const selectMyCourses = (state: RootState) =>
  selectGeneralState(state).myCourses;

export const selectCourseContentById = (state: RootState) =>
  selectGeneralState(state).courseContentById;

export const selectCourseAnnouncementsById = (state: RootState) =>
  selectGeneralState(state).courseAnnouncementsById;

export const selectCourseRegisteredById = (state: RootState) =>
  selectGeneralState(state).courseRegisteredById;

export const selectCourseStudentsById = (state: RootState) =>
  selectGeneralState(state).courseStudentsById;

export const selectCourseBatchesById = (state: RootState) =>
  selectGeneralState(state).courseBatchesById;
export const selectRecommendationCourses = (state: RootState) =>
  selectGeneralState(state).recommendationCourses.slice(0, 3);
