import { getMyAccount } from 'Store/Actions/auth';
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import GeneralService from '../../../Services/tutoring/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { toast } from 'react-toastify';

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

export const getSelfTutor =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.checkSelfTutor();
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
          selfTutorDetails: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllTutors =
  (query?: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllTutor(query);
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
          allTutors: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getMyRequests =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getMyRequests();
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
          myRequests: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getMyOffers =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getMyOffers();
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
          myOffers: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createRequest =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createRequest(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getMyRequests()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateRequest =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateRequest(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getMyRequests()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateOffer =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateOffer(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getMyOffers()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateSelfTutor =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateSelfTutor(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
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

export const getAllReviews =
  (tutorId: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllReviews(tutorId);
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
          reviews: res,
        }),
      );
      return { result: true, data: res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createReview =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createReview(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
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

export const getAllChats =
  (tutorRequestId: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllChats(tutorRequestId);
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
          messages: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createChat =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createChat(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
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
