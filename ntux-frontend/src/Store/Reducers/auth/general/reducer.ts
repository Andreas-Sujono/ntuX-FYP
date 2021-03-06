import { Role } from 'Models/Auth';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from 'common/utils/redux';
import { AnyAction } from 'redux';
import { ActionTypes } from '../../../Actions/auth/general';

const initialState = initEntityState({
  isAuthenticated: false,
  user: null,
  role: Role.STUDENT,
  portfolio: {
    user: {},
    studentSummary: {},
    registeredCourses: [],
  },
});

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.SET: {
      const updatedState = {
        ...state,
        [action.payload.key]: action.payload.value,
      };
      return updatedState;
    }

    case ActionTypes.LOAD_REQUEST: {
      return entityLoadingStarted(state, action.payload);
    }
    case ActionTypes.LOAD_SUCCESS: {
      return entityLoadingSucceeded(state, action.payload);
    }
    case ActionTypes.LOAD_FAILED: {
      return entityLoadingFailed(state);
    }

    case ActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
