import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) =>
  state.forum?.general || {};

export const selectAllQuestions = (state: RootState) =>
  selectGeneralState(state).allQuestions;
export const selectMyQuestions = (state: RootState) =>
  selectGeneralState(state).myQuestions;
export const selectUnansweredQuestions = (state: RootState) =>
  selectGeneralState(state).unansweredQuestions;
export const selectAllTags = (state: RootState) =>
  selectGeneralState(state).allTags;
export const selectTopUsers = (state: RootState) =>
  selectGeneralState(state).topUsers;
export const selectActiveUsers = (state: RootState) =>
  selectGeneralState(state).activeUsers;
export const selectAllUsers = (state: RootState) =>
  selectGeneralState(state).allUsers;
export const selectQuestionDetailById = (state: RootState) =>
  selectGeneralState(state).questionDetailById;
export const selectQuestionsByTagId = (state: RootState) =>
  selectGeneralState(state).questionsByTagId;

export const selectTagById = (state: RootState) => {
  const alltags = selectGeneralState(state).allTags || [];
  return (id) => {
    return alltags.find((tag) => String(tag.id) === String(id)) || {};
  };
};
