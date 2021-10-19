import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export default <T>() => useDispatch<ThunkDispatch<T, void, AnyAction>>();
