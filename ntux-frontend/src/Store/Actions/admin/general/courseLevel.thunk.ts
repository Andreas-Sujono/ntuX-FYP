import { selectStudentSummaryByUserId } from './../../../Selector/admin/general';
import { getAllStudentRegistrations } from 'Store/Actions/admin';
import {
  selectAllCourseBatchesByCourseId,
  selectAllCourseAnnouncementsByCourseId,
} from 'Store/Selector/admin';
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import GeneralService from '../../../Services/admin/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadSuccess, loadFailed } from './general';
import { selectAllCourseContentsByCourseId } from 'Store/Selector/admin';
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

export const createCourseBatch =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseBatchesByCourseId(getState());
      const res = await service.createBatch(data);
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
            ...prevData,
            [data.course]: [...prevData[data.course], { ...data, ...res }],
          },
        }),
      );
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateCourseBatch =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseBatchesByCourseId(getState());
      const res = await service.updateBatch(data);
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
            ...prevData,
            [data.course]: prevData[data.course].map((item) => {
              if (String(item.id) === String(data.id)) {
                return { ...item, ...data, ...res };
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

export const deleteCourseBatch =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseBatchesByCourseId(getState());
      const res = await service.deleteBatch(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification("Can't delete batch");
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          allCourseBatchesByCourseId: {
            ...prevData,
            [data.courseId]: prevData[data.courseId].filter((item) => {
              if (String(item.id) == String(data.id)) {
                return false;
              }
              return true;
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

export const createCourseAnnouncement =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseAnnouncementsByCourseId(getState());
      const res = await service.createCourseAnnouncement(data);
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
          allCourseAnnouncementsByCourseId: {
            ...prevData,
            [data.course]: [...prevData[data.course], { ...data, ...res }],
          },
        }),
      );
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const updateCourseAnnouncement =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseAnnouncementsByCourseId(getState());
      const res = await service.updateBatch(data);
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
          allCourseAnnouncementsByCourseId: {
            ...prevData,
            [data.course]: prevData[data.course].map((item) => {
              if (String(item.id) === String(data.id)) {
                return { ...item, ...data, ...res };
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

export const deleteCourseAnnouncement =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseAnnouncementsByCourseId(getState());
      const res = await service.deleteBatch(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification("Can't delete announcement");
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          allCourseAnnouncementsByCourseId: {
            ...prevData,
            [data.courseId]: prevData[data.courseId].filter((item) => {
              if (String(item.id) == String(data.id)) {
                return false;
              }
              return true;
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

export const changeStudentRegistrationStatus =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectAllCourseAnnouncementsByCourseId(getState());
      const res = await service.changeStatusRegistration(data);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification("Can't change status");
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(loadSuccess({}));
      getAllStudentRegistrations(data.course)(dispatch, getState);
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };

export const getStudentSummary =
  (userId: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevData = selectStudentSummaryByUserId(getState());
      const res = await service.getStudentSummary(userId);
      if (res.errorCode) {
        dispatch(loadFailed());
        sendErrorNotification("Can't change status");
        return {
          result: false,
          errorMessage: res.message,
        };
      }
      dispatch(
        loadSuccess({
          studentSummaryByUserId: {
            ...prevData,
            [userId]: res,
          },
        }),
      );
      return { result: true, res };
    } catch (err) {
      dispatch(loadFailed());
      return { result: false };
    }
  };