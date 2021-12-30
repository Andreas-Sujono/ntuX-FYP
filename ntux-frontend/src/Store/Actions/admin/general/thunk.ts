/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import GeneralService from '../../../Services/admin/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { selectUserId } from 'Store/Selector/auth';
import { logout } from 'Store/Actions/auth';
import { Id } from 'Models/Auth';
import {
  selectAllCourseBatchesByCourseId,
  selectAllCourseAnnouncementsByCourseId,
  selectAllStudentsByCourseId,
  selectAllCourseContentsByCourseId,
  selectAllCourseDetailByCourseId,
} from 'Store/Selector/admin';
import { toast } from 'react-toastify';

const { CancelToken } = axios;
const source = CancelToken.source();
// const canceler = source.cancel;

const service = new GeneralService({
  baseUrl: '/ntux-server/api/v1',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  toast.error(errorMessage);
  return; //TODO: send error component
};
export const uploadFile =
  (file: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await service.uploadFile(data);

      return { result: true, res, url: res.url };
    } catch (err) {
      return { result: false };
    }
  };

export const getSummary =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getSummary();
      if (res.errorCode === 401) {
        logout()(dispatch, getState);
      }
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
          summary: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getWebsiteActivity =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getWebsiteActivity();
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
          websiteActivities: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllCourses =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllCourses();
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
          allCourses: res,
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
        sendErrorNotification(res.message);
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

export const getAllRewards =
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
          allRewards: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllQuestions =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllQuestions();
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
          allQuestions: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
export const getAllLecturers =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllLecturers();
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
          allLecturers: res,
        }),
      );
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getAllStudentRegistrations =
  (courseId: string, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevStudents = selectAllStudentsByCourseId(getState());
      const res = await service.getAllStudentRegistrations(courseId);
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
          allStudentsByCourseId: {
            ...prevStudents,
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

export const createCourse =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createCourse(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllCourses()(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateCourse =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateCourse(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllCourses()(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const deleteCourse =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.deleteCourse(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllCourses()(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createCourseContent =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createCourseContent(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateCourseContent =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevContents = selectAllCourseContentsByCourseId(getState());
      const res = await service.updateCourseContent(data);
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
          allCourseContentsByCourseId: {
            ...prevContents,
            [data.course]: prevContents[data.course].map((item) => {
              if (item.pageId === data.pageId) {
                return res;
              }
              return item;
            }),
          },
        }),
      );
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const deleteCourseContent =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevContents = selectAllCourseContentsByCourseId(getState());
      const res = await service.deleteCourse(data);
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
          allCourseContentsByCourseId: {
            ...prevContents,
            [data.course]: prevContents[data.course].filter((item) => {
              if (item.pageId === data.pageId) {
                return false;
              }
              return true;
            }),
          },
        }),
      );
      getAllCourses()(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const adminGetOneCourse =
  (courseId: Id, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const rootState = getState();
      const prevBatches = selectAllCourseBatchesByCourseId(rootState);
      const prevAnnouncements =
        selectAllCourseAnnouncementsByCourseId(rootState);
      const prevStudents = selectAllStudentsByCourseId(rootState);
      const prevContents = selectAllCourseContentsByCourseId(rootState);
      const prevDetails = selectAllCourseDetailByCourseId(rootState);

      const res = await service.getOneCourse(courseId);
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
          allCourseBatchesByCourseId: {
            ...prevBatches,
            [courseId]: res.courseBatches,
          },
          allCourseAnnouncementsByCourseId: {
            ...prevAnnouncements,
            [courseId]: res.courseAnnouncements,
          },
          // allStudentsByCourseId: {
          //   ...prevStudents,
          //   [courseId]: res.studentRegistrations,
          // },
          allCourseDetailByCourseId: {
            ...prevDetails,
            [courseId]: res,
          },
          allCourseContentsByCourseId: {
            ...prevContents,
            [courseId]: res.courseContents,
          },
        }),
      );
      getAllCourses()(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
