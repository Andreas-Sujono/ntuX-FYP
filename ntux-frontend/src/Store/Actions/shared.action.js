import axios from 'axios';
import {
  errorMessage,
  errorCodeToMessage,
} from 'admin_desktop/constants/shared.constant';
import BasicService from 'admin_desktop/services/shared.service';
import pushNotification, {
  NotificationTypes,
  NotificationComponents,
} from 'common/components/shared/Notifications';

const { CancelToken } = axios;
const source = CancelToken.source();

const basicService = new BasicService({
  baseUrl: '/bc-b2b-api/api',
  cancelToken: source.token,
});

const sendErrorNotification = (_errorMessage = '', errorCode = 0) => {
  if (errorCode === 0) return;
  pushNotification({
    message: _errorMessage || errorCodeToMessage(errorCode),
    type: NotificationTypes.ERROR,
    component: NotificationComponents.TOAST,
  });
};

export const uploadImage = ({ image }) => async () => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const res = await basicService.uploadImage(formData);

    if (res.errorCode !== 0) {
      sendErrorNotification(errorMessage.UPLOAD_IMAGE_ERROR, res.errorCode);
      return { result: false };
    }

    return { result: true, imageUrl: res.imageUrl };
  } catch (err) {
    sendErrorNotification('', err?.response?.status);
    return { result: false };
  }
};
