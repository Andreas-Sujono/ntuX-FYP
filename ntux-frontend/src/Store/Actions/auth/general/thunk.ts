import { Id } from './../../../../Models/Auth/index';
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import AuthService from '../../../Services/auth/general';
import { AppDispatch, RootState } from '../../../Store';
import {
  loadRequest,
  loadSuccess,
  loadFailed,
  reset as resetAuthGeneralState,
} from './general';
import { LoginRequest, User } from 'Models/Auth';
import { toast } from 'react-toastify';
import { selectUser, selectUserId } from 'Store/Selector/auth';

const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const service = new AuthService({
  baseUrl: '/ntux-server/api/v1',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  return; //TODO: send error component
};

export const getMyAccount =
  (id?: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = id || selectUserId(getState());
      const res = await service.getAccount(userId);
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          user: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const signup =
  (data: User, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.signup(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const login =
  (data: LoginRequest, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.login(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          isAuthenticated: true,
          user: res.user,
          role: res.user.role,
          token: res.access_token || res.accessToken,
        }),
      );
      localStorage.setItem('token', res.access_token || res.accessToken);
      return { result: true, user: res.user };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const resetAllState = async (dispatch: AppDispatch) => {
  dispatch(resetAuthGeneralState());
};

export const logout =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.logout();
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
        };
      }
      resetAllState(dispatch);
      dispatch(
        loadSuccess({
          user: null,
          role: null,
        }),
      );
      localStorage.removeItem('token');

      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      resetAllState(dispatch);
      return { result: false };
    }
  };

export const forgotPassword =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.forgotPassword(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const resetPassword =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.confirmForgotPassword(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const confirmEmail =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.confirmEmail(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const confirmForgotPassword =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.confirmForgotPassword(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateAccount =
  (data: Partial<User>, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = selectUserId(getState());
      const user = selectUser(getState());
      const res = await service.updateAccount(data, userId);
      if (res.errorCode) {
        dispatch(loadFailed());
        toast.error(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          user: {
            ...user,
            ...data,
          },
        }),
      );
      toast.success('profile is updated');
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
