import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import auth from './reducers/auth';

const isDevelopment = process.env.NODE_ENV === 'development';
const middlewares = [thunk];
const history = createBrowserHistory();

// sasve to cache
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
  transforms: [createWhitelistFilter('auth', ['general', 'account'])],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares, routerMiddleware(history)),
);

if (isDevelopment && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middlewares, routerMiddleware(history)),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
}

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export { history, persistor };
