import { errorCodeToMessage as commonErrorCodeToMessage } from '../../../common/utils/general.constant';

export const ERROR_MESSAGE = {};

// translate errorCode from backend
export const errorCodeToMessage = (code: number) => {
  switch (code) {
    default:
      return commonErrorCodeToMessage(code);
  }
};

export const TEMPLATE = {
  DEFAULT: 'default',
};
