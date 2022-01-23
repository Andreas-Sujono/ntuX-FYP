import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) => state.tutoring.general;

export const selectSelfTutorDetails = (state: RootState) =>
  selectGeneralState(state).selfTutorDetails;
export const selectAllTutors = (state: RootState) =>
  selectGeneralState(state).allTutors;
export const selectMyRequests = (state: RootState) =>
  selectGeneralState(state).myRequests;
export const selectMyOffers = (state: RootState) =>
  selectGeneralState(state).myOffers;

export const selectReviews = (state: RootState) =>
  selectGeneralState(state).reviews;
export const selectMessages = (state: RootState) =>
  selectGeneralState(state).messages;
