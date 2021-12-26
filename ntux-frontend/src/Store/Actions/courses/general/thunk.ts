import { selectPublicCourses } from './../../../Selector/courses/general';
import axios from 'axios';
import GeneralService from '../../../Services/courses/general';
import { AppDispatch, RootState } from '../../../Store';
import { loadRequest, loadSuccess, loadFailed } from './general';

const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const service = new GeneralService({
  baseUrl: '/ntux-server/api/v1',
  cancelToken: source.token,
});

const sendErrorNotification = (errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
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

      if (res.errorCode !== 0) {
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
