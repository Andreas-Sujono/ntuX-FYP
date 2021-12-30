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

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  toast.error(errorMessage);
  return; //TODO: send error component
};

export const createCourseContent =
  (data: any, bypass = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const prevContents = selectAllCourseContentsByCourseId(getState());
      const res = await service.createCourseContent(data);
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
            [data.course]: [...prevContents[data.course], data],
          },
        }),
      );
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
              if (String(item.id) === String(data.id)) {
                console.log('change', item.id, data, res);
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
