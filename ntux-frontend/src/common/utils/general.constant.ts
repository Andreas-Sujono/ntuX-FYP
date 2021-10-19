export enum NotificationComponents {
  TOAST = 'TOAST',
}

export const ERROR_CODE = {
  NO_ERROR: 0,
};

export const ERROR_MESSAGE = {
  // general error
  GENERAL_ERROR: 'Server is not responding',

  // Client error (400 - 500)
  BAD_REQUEST: 'Invalid Request', // 400
  NOT_AUTHORIZED: 'You are not authorized, please log in!', // 401
  FORBIDDEN: "You don't have access to this content", // 403
  NOT_FOUND: 'Not found', // 404

  // server error (500 - 600)
  SERVER_ERROR: 'Cannot connect to server', // 500
};

// common error code
export const errorCodeToMessage = (code: number) => {
  switch (code) {
    case 400:
      return {
        errorMessage: ERROR_MESSAGE.BAD_REQUEST,
        errorComponent: NotificationComponents.TOAST, // toast message
      };
    case 401:
      return {
        errorMessage: ERROR_MESSAGE.NOT_AUTHORIZED,
        errorComponent: NotificationComponents.TOAST, // toast message
      };
    case 403:
      return {
        errorMessage: ERROR_MESSAGE.FORBIDDEN,
        errorComponent: NotificationComponents.TOAST, // toast message
      };
    case 404:
      return {
        errorMessage: ERROR_MESSAGE.NOT_FOUND,
        errorComponent: NotificationComponents.TOAST, // toast message
      };
    default:
      return {
        errorMessage: ERROR_MESSAGE.GENERAL_ERROR,
        errorComponent: NotificationComponents.TOAST,
      };
  }
};
