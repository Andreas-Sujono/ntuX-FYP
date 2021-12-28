import { User } from 'Models/Auth';
import { RootState } from '../../Store';

export const selectAuthGeneralState = (state: RootState) => state.auth.general;

export const selectUser = (state: RootState) =>
  selectAuthGeneralState(state).user as User;
export const selectUserRole = (state: RootState) =>
  selectAuthGeneralState(state).role;
export const selectUserId = (state: RootState) =>
  selectAuthGeneralState(state).user?.id || null;
