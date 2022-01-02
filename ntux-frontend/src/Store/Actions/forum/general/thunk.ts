import { selectQuestionsByTagId } from './../../../Selector/forum/general';
import { getMyAccount } from 'Store/Actions/auth';
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import GeneralService from '../../../Services/forum/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { Id, User } from 'Models/Auth';
import { selectUserId } from 'Store/Selector/auth';
import { toast } from 'react-toastify';
import { selectQuestionDetailById } from 'Store/Selector/forum';

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

export const getAllQuestions =
  (tagId?: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prev = selectQuestionsByTagId(getState());
      const res = await service.getAllQuestions(tagId);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      let obj = {};
      if (tagId) {
        obj = {
          questionsByTagId: {
            ...prev,
            [tagId]: res,
          },
        };
      } else {
        obj = {
          allQuestions: res,
        };
      }
      dispatch(loadSuccess(obj));
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getMyQuestions =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = selectUserId(getState());
      if (!userId) return { result: false };
      const res = await service.getMyQuestions();
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
          myQuestions: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getUnansweredQuestions =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getUnansweredQuestions();
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
          unansweredQuestions: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllTags =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllTags();
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
          allTags: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllUsers =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllUsers();
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
          allUsers: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getTopUsers =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getTopUsers();
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
          topUsers: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getActiveUsers =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getActiveUsers();
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
          activeUsers: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getOneQuestion =
  (id: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prev = selectQuestionDetailById(getState());
      const res = await service.getOneQuestion(id);
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
          questionDetailById: {
            ...prev,
            [id]: res,
          },
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createQuestion =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createQuestion(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllQuestions()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createAnswer =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createAnswer(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getOneQuestion(data.question)(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
