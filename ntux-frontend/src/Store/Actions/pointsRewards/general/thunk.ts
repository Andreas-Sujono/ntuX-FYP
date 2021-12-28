import axios from 'axios';
import GeneralService from '../../../Services/pointsRewards/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { Id, User } from 'Models/Auth';
import { selectUserId } from 'Store/Selector/auth';
import { selectIsActivityAdded } from 'Store/Selector/pointsRewards';

const { CancelToken } = axios;
const source = CancelToken.source();
// const canceler = source.cancel;

const service = new GeneralService({
  baseUrl: '/ntux-server/api/v1',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  return; //TODO: send error component
};

export const getGoalTask =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getGoalTask();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          goalTask: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getRewards =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllRewards();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          rewards: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getRewardsRedeemed =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = selectUserId(getState());
      const res = await service.getRewardsRedeemed(userId);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          rewardsRedeemed: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAvatars =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = selectUserId(getState());
      const res = await service.getAvatars();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          avatars: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const addWebsiteVisitActivity =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prev = selectIsActivityAdded(getState());
      const userId = selectUserId(getState());

      if (prev && !bypass) return { result: true };

      const res = await service.addWebsiteActivity({
        visitWithoutLogin: !userId ? 1 : 0,
        visitWithLogin: userId ? 1 : 0,
      });
      dispatch(
        loadSuccess({
          isActivityAdded: true,
        }),
      );
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  };
