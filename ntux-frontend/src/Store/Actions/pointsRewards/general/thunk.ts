import { getLevelAndBadges } from 'common/utils';
import { getMyAccount } from 'Store/Actions/auth';
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import GeneralService, {
  TaskType,
} from '../../../Services/pointsRewards/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { Id, User } from 'Models/Auth';
import { selectUser, selectUserId } from 'Store/Selector/auth';
import { selectIsActivityAdded } from 'Store/Selector/pointsRewards';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';

const { CancelToken } = axios;
const source = CancelToken.source();
// const canceler = source.cancel;

const service = new GeneralService({
  baseUrl: '/ntux-server/api/v1',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 1) => {
  if (errorCode === 0 || errorCode === 401) return;
  toast.error(errorMessage);
  return; //TODO: send error component
};

export const getGoalTask =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getGoalTask();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
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

export const getMyAchievements =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getMyAchievements();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          myAchievements: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getNotifications =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getMyNotifications();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          notifications: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const viewNotifications =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.viewNotifications();
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getNotifications()(dispatch, getState);
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
        sendErrorNotification(res.message, res.errorCode);
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
        sendErrorNotification(res.message, res.errorCode);
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
        sendErrorNotification(res.message, res.errorCode);
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
        date: new Date().toLocaleString(),
        visitWithoutLogin: !userId ? 1 : 0,
        visitWithLogin: userId ? 1 : 0,
        user: userId || null,
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

export const buyAvatar =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.buyAvatar(data);
      dispatch(loadSuccess({}));
      getMyAccount()(dispatch, getState);
      checkGetPoint(TaskType.REWARD_BUY_AVATAR, true)(dispatch, getState);
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  };
export const useAvatar =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.useAvatar(data);
      dispatch(loadSuccess({}));
      getMyAccount()(dispatch, getState);
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  };
export const redeemReward =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.redeemReward(data);
      dispatch(loadSuccess({}));
      getRewardsRedeemed()(dispatch, getState);
      getMyAccount()(dispatch, getState);
      checkGetPoint(TaskType.REWARD_REDEEM, true)(dispatch, getState);
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  };

/**
   * 
   * @param taskType 
   * @param bypass 
   * @returns 
   * task
    getPoints
    getExps
   */
export const checkGetPoint =
  (taskType: TaskType, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const user = selectUser(getState());
      if (!user) return { result: false };
      const res = await service.checkGetPoint(taskType);

      // if (res && res?.task && !bypass) {
      //   const { level: prevLevel } = getLevelAndBadges(user.totalExps);
      //   const { level: currentLevel } = getLevelAndBadges(
      //     user.totalExps + res.task?.exps || 0,
      //   );
      //   if (prevLevel !== currentLevel) {
      //     swal.fire({
      //       icon: 'success',
      //       title: 'Congrats! you have leveled up',
      //       text: 'keep it up!',
      //     });
      //   }
      // }

      if (res && res?.task) {
        toast.success(`Achievement unlocked: ${res.task?.name}`);
        getMyAchievements()(dispatch, getState);
      }
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  };
