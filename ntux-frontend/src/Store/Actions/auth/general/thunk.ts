import axios from 'axios';
import AuthService from '../../../Services/auth/general';
import { errorCodeToMessage } from '../../../Constants/auth/general';
import { selectAuthGeneralState } from '../../../Selector/auth/general';
import { SignupRequest, LoginRequest } from './../../../../Models/Auth/index';
import { AppDispatch, RootState } from '../../../Store';
import {
  loadRequest,
  loadSuccess,
  loadFailed,
  reset as resetAuthGeneralState,
  setAccountType,
} from './general';

const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const service = new AuthService({
  baseUrl: '/bc-b2b-api/api',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  return; //TODO: send error component
};

export const signup =
  (data: SignupRequest, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const rootState = getState();
    const generalState = selectAuthGeneralState(rootState);

    if (generalState.canceler && !bypass) {
      generalState.canceler();
      return { result: false };
    }

    dispatch(loadRequest(bypass ? null : canceler));

    try {
      dispatch(setAccountType(data.accountType));
      const res = await service.signup(data);

      if (res.errorCode !== 0) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: errorCodeToMessage(res.errorCode).errorMessage,
          errorComponent: errorCodeToMessage(res.errorCode).errorComponent,
        };
      }

      // dispatch(
      //   loadUser.success({
      //     fullName: res.account.firstName,
      //     email: res.account.email,
      //     profileImage: '',
      //     id: res.account.id,
      //     phoneNumber: '',
      //   }),
      // );

      dispatch(
        loadSuccess({
          accountType: data.accountType,
          isAuthenticated: true,
        }),
      );

      return { result: true };
    } catch (err) {
      // sendErrorNotification('', err?.response?.status);
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const login =
  (data: LoginRequest, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const rootState = getState();
    const generalState = selectAuthGeneralState(rootState);

    if (generalState.canceler && !bypass) {
      generalState.canceler();
      return { result: false };
    }

    dispatch(loadRequest(bypass ? null : canceler));

    try {
      dispatch(setAccountType(data.accountType));
      const res = await service.login(data);

      if (res.errorCode !== 0) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: errorCodeToMessage(res.errorCode).errorMessage,
          errorComponent: errorCodeToMessage(res.errorCode).errorComponent,
        };
      }

      // dispatch(
      //   loadUser.success({
      //     fullName: res.account.firstName,
      //     email: res.account.email,
      //     profileImage: '',
      //     id: res.account.id,
      //     phoneNumber: '',
      //   }),
      // );

      dispatch(
        loadSuccess({
          accountType: data.accountType,
          isAuthenticated: true,
        }),
      );

      return { result: true };
    } catch (err) {
      // sendErrorNotification('', err?.response?.status);
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
    const rootState = getState();
    const generalState = selectAuthGeneralState(rootState);

    if (generalState.canceler && !bypass) {
      generalState.canceler();
      return { result: false };
    }

    dispatch(loadRequest(bypass ? null : canceler));

    try {
      const res = await service.logout();

      if (res.errorCode !== 0) {
        dispatch(loadFailed());
        sendErrorNotification(res.errorMessage, res.errorCode);
        return {
          result: false,
        };
      }

      resetAllState(dispatch);

      dispatch(
        loadSuccess({
          accountType: null,
          isAuthenticated: false,
        }),
      );

      return { result: true };
    } catch (err) {
      sendErrorNotification('', err?.response?.status);
      dispatch(loadFailed());
      resetAllState(dispatch);

      return { result: false };
    }
  };
