import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) => state.admin.general;

export const selectSummary = (state: RootState) =>
  selectGeneralState(state).summary;
export const selectAllCourses = (state: RootState) =>
  selectGeneralState(state).allCourses;
export const selectAllUsers = (state: RootState) =>
  selectGeneralState(state).allUsers;
export const selectAllRewards = (state: RootState) =>
  selectGeneralState(state).allRewards;
export const selectAllQuestions = (state: RootState) =>
  selectGeneralState(state).allQuestions;
export const selectAllCourseBatchesByCourseId = (state: RootState) =>
  selectGeneralState(state).allCourseBatchesByCourseId;
export const selectAllCourseAnnouncementsByCourseId = (state: RootState) =>
  selectGeneralState(state).allCourseAnnouncementsByCourseId;
export const selectAllStudentsByCourseId = (state: RootState) =>
  selectGeneralState(state).allStudentsByCourseId;
export const selectStudentSummaryByUserId = (state: RootState) =>
  selectGeneralState(state).studentSummaryByUserId;
export const selectWebsiteActivities = (state: RootState) =>
  selectGeneralState(state).websiteActivities;
export const selectAllCourseContentsByCourseId = (state: RootState) =>
  selectGeneralState(state).allCourseContentsByCourseId;
export const selectAllCourseDetailByCourseId = (state: RootState) =>
  selectGeneralState(state).allCourseDetailByCourseId;

export const selectWebsiteActivitiesByInterval = (state: RootState) => {
  const all = selectGeneralState(state).websiteActivities;
  return (interval: 'd' | 'w' | 'm') => {
    all.sort((a, b) => a.date - b.date);

    if (interval === 'm') {
      return all.slice(0, 12);
    }
    if (interval === 'w') {
      return all.slice(0, 12);
    }

    return all.slice(0, 12);
  };
};

export const selectAllLecturers = (state: RootState) => {
  return selectGeneralState(state).allLecturers;
};
export const selectAllRewardsRedeemed = (state: RootState) => {
  return selectGeneralState(state).allRewardsRedeemed;
};
export const selectAllStudents = (state: RootState) => {
  return selectGeneralState(state).allStudents;
};
