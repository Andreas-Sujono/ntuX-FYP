/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  selectPublicCourses,
  selectCourseContentById,
  selectCourseAnnouncementsById,
  selectCourseRegisteredById,
} from './../../../Selector/courses/general';
import axios from 'axios';
import GeneralService from '../../../Services/courses/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { Id, User } from 'Models/Auth';
import { selectUserId } from 'Store/Selector/auth';
import { logout } from 'Store/Actions/auth';
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

export const getPublicCourses =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const rootState = getState();
    const publicCourses = selectPublicCourses(rootState);

    if (publicCourses.length) return { result: true };

    try {
      const res = await service.getPublicCourses();
      console.log('res: ', res);

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
          publicCourses: res,
        }),
      );

      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getOnePublicCourse =
  (id: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getOnePublicCourses(id);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true, data: res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getOneCourseRegistered =
  (id: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectCourseRegisteredById(getState());
      const res = await service.getOneCourseRegistered(id);
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
          courseRegisteredById: {
            ...prevData,
            [id]: {
              ...res.course,
              courseBatch: res.courseBatch,
            },
          },
        }),
      );
      return { result: true, data: res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const registerCourse =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.registerCourse(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message, res.errorCode);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true, data: res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getMyCourses =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = selectUserId(getState());
      if (!userId) return;

      const res = await service.getMyCourses();
      console.log(res);
      if (res.errorCode) {
        if (res.errorCode === 401) {
          logout()(dispatch, getState);
          return { result: true };
        }
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          myCourses: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getCourseContents =
  (courseId: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectCourseContentById(getState());
      const res = await service.getCourseContent(courseId);
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      res.sort((a, b) => a.pageOrder - b.pageOrder);
      dispatch(
        loadSuccess({
          courseContentById: {
            ...prevData,
            [courseId]: res,
          },
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getCourseAnnouncements =
  (courseId: string, batchId?: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectCourseAnnouncementsById(getState());
      const res = await service.getCourseAnnonuncement(courseId, batchId || '');
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          courseAnnouncementsById: {
            ...prevData,
            [courseId]: res,
          },
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getRecommendationCourses =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getRecommendationCourses();
      if (res.errorCode) {
        dispatch(loadFailed());
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          recommendationCourses: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
