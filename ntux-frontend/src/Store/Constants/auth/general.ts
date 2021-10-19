import { errorCodeToMessage as commonErrorCodeToMessage } from '../../../common/utils/general.constant';

export const GAPI_CLIENT_ID =
  '722344220520-fjfpbromdkj1vanobds3a18rfc8ndsqj.apps.googleusercontent.com';

// error message for Login and Signup component
export const ERROR_MESSAGE = {
  EMAIL_DOES_NOT_EXIST: 'We have never seen this email before',
  PASSWORD_INCORRECT:
    "Incorrect password. Don't worry you can reset your password anytime",
  EMAIL_HAS_BEEN_USED: 'Email address has been used. Try logging in instead',
};

// translate errorCode from backend
export const errorCodeToMessage = (code: number) => {
  switch (code) {
    case 1:
      return {
        errorMessage: ERROR_MESSAGE.EMAIL_DOES_NOT_EXIST,
        errorComponent: 'email',
      };
    case 1000:
      return {
        errorMessage: ERROR_MESSAGE.EMAIL_DOES_NOT_EXIST,
        errorComponent: 'email',
      };
    case 1001:
      return {
        errorMessage: ERROR_MESSAGE.PASSWORD_INCORRECT,
        errorComponent: 'password',
      };
    case 1003:
      return {
        errorMessage: ERROR_MESSAGE.EMAIL_HAS_BEEN_USED,
        errorComponent: 'email',
      };
    default:
      return commonErrorCodeToMessage(code);
  }
};

export const ACCOUNT_TYPE = {
  NORMAL: 1,
  GOOGLE: 2,
};
