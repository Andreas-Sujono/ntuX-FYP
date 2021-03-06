import { TaskType } from './../../../Services/pointsRewards/general';
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
import { checkGetPoint } from 'Store/Actions/pointsRewards';

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
  (tagId?: Id, search?: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prev = selectQuestionsByTagId(getState());
      const res = await service.getAllQuestions(tagId, search || '');
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
  (query?: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getUnansweredQuestions(query || '');
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
  (search?: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllUsers(search || '');
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
    if (!id) return;
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
      console.log('get one question: ', id, ': ', res);
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
      checkGetPoint(TaskType.FORUM_ASK_QUESTION)(dispatch, getState);
      getMyAccount()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateQuestion =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateQuestion(data);
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
      getOneQuestion(data.id)(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const deleteQuestion =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.deleteQuestion(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification('Failed delete question', res.errorCode);
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
      checkGetPoint(TaskType.FORUM_ANSWER_QUESTION)(dispatch, getState);
      getMyAccount()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateAnswer =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateAnswer(data);
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

export const deleteAnswer =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.deleteAnswer(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification('Failed delete answer', res.errorCode);
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
