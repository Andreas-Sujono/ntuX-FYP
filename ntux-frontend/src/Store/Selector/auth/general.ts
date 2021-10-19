import { RootState } from '../../Store';

export const selectAuthGeneralState = (state: RootState) => state.auth.general;

export const selectAccountType = (state: RootState) =>
  selectAuthGeneralState(state).accountType;
export const selectIsAuthenticated = (state: RootState) =>
  selectAuthGeneralState(state).isAuthenticated; // check if user has logged in
