import { RewardRedeemed } from 'Models/pointsRewards';
import { RootState } from '../../Store';

export const selectGeneralState = (state: RootState) =>
  state.pointsRewards.general;

export const selectRewards = (state: RootState) =>
  selectGeneralState(state).rewards;
export const selectGoalTask = (state: RootState) =>
  selectGeneralState(state).goalTask;
export const selectGoalFinished = (state: RootState) =>
  selectGeneralState(state).goalFinished;

export const selectRewardsRedeemed = (state: RootState) =>
  selectGeneralState(state).rewardsRedeemed as RewardRedeemed[];
export const selectAvatars = (state: RootState) =>
  selectGeneralState(state).avatars;