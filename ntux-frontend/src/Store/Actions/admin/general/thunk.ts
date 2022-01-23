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

const sendErrorNotification = (errorMessage = '', errorCode = 1) => {
  if (errorCode === 0 || errorCode === 401) return;
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

      return { result: true, res, url: res.url || res.Location };
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
        dispatch(loadFailed());
        return {
          result: false,
        };
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
export const getAllStudents =
  (bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.getAllStudents();
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
          allStudents: res,
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

export const deleteStudentRegistration =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevStudents = selectAllStudentsByCourseId(getState());
      const res = await service.deleteStudentRegistration(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllStudentRegistrations(data.courseId)(dispatch, getState);
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
      res.courseContents.sort((a, b) => a.pageOrder - b.pageOrder);
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

export const createReward =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createReward(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllRewards()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
export const updateReward =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateReward(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllRewards()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
export const deleteRewards =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.deleteReward(data.id);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllRewards()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const createUser =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.createUser(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllUsers()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
export const updateUser =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.updateUser(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllUsers()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
export const deleteUser =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await service.deleteUser(data.id);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification(res.message);
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllUsers()(dispatch, getState);
      return { result: true };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };
