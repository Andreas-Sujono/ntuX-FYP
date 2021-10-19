import { SignupRequest, LoginRequest } from './../../../Models/Auth';
import { GAPI_CLIENT_ID, ACCOUNT_TYPE } from '../../Constants/auth/general';
import BaseService from '../base';

export default class AuthService extends BaseService {
  signup = async ({
    accountType,
    email,
    fullName,
    password,
  }: SignupRequest) => {
    let data = {};

    if (accountType === ACCOUNT_TYPE.NORMAL) {
      // if normal signup
      data = {
        accountType,
        fullName,
        email,
        password,
      };
    }
    // else if (accountType === ACCOUNT_TYPE.GOOGLE) {
    //   // if google signup
    //   const idToken = await this.getGoogleAuthToken();
    //   data = {
    //     accountType,
    //     token: idToken || '',
    //   };
    // }

    const res = await this.postRequest('/account', data);
    return res.data;
  };

  login = async ({ accountType, email, password }: LoginRequest) => {
    let data = {};
    if (accountType === ACCOUNT_TYPE.NORMAL) {
      // if normal login
      data = {
        accountType,
        email,
        password,
      };
    }
    // else if (accountType === ACCOUNT_TYPE.GOOGLE) {
    //   // if google login
    //   const idToken = await this.getGoogleAuthToken();
    //   data = {
    //     accountType,
    //     token: idToken || '',
    //   };
    // }

    const res = await this.putRequest('/account', data);

    return res.data;
  };

  // // Asynchronously get user idToken.
  // // If gapi not loaded, wait until loaded and continue.
  // // If not signed in, will wait until finished sign in and return token.
  // // If user cancel/reject sign in, returns null.

  // getGoogleAuthToken = async () => {
  //   const googleAuth = await this.gapiInitClient();
  //   if (googleAuth.isSignedIn.get()) {
  //     const googleUser = googleAuth.currentUser.get();
  //     return googleUser.getAuthResponse().id_token;
  //   }

  //   try {
  //     const googleUser = await googleAuth.signIn();
  //     return googleUser.getAuthResponse().id_token;
  //   } catch (e) {
  //     return null;
  //   }
  // };

  // // Wait until gapi loaded, run all initialisation needed
  // // and return GoogleAuth instance.

  // gapiInitClient = async () => {
  //   const gapi = await this.getGapi();

  //   const initPromise = new Promise((resolve) => {
  //     gapi.load('client:auth2', resolve);
  //   });
  //   await initPromise;

  //   await gapi.client.init({
  //     client_id: GAPI_CLIENT_ID,
  //     scope: 'profile',
  //   });

  //   return gapi.auth2.getAuthInstance();
  // };

  // // Wait until gapi loaded, else return directly.

  // getGapi = async () => {
  //   if ((window as any).gapi) return (window as any).gapi;
  //   const gapiPromise = new Promise((resolve) => {
  //     const googleLoginEl = document.getElementById('google-login');
  //     if (googleLoginEl) {
  //       googleLoginEl.onload = resolve;
  //     }
  //   });

  //   await gapiPromise;
  //   return (window as any).gapi;
  // };

  logout = async () => {
    // const googleAuth = await this.gapiInitClient();

    // if (googleAuth.isSignedIn.get()) {
    //   await googleAuth.signOut();
    // }
    // TODO: call API to logout once the api is ready, now assume always true
    return {
      errorCode: 0,
      errorMessage: '',
    };
  };
}
