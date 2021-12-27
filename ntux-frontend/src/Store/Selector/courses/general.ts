import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) => state.courses.general;

export const selectPublicCourses = (state: RootState) =>
  selectGeneralState(state).publicCourses;
export const selectAllCourses = (state: RootState) =>
  selectGeneralState(state).allCourses;
export const selectMyCourses = (state: RootState) =>
  selectGeneralState(state).myCourses;
