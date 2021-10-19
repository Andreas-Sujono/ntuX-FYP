import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Switch, HashRouter } from 'react-router-dom';
import store, { history, persistor } from '../Store/Store';
import { BaseRoutes } from '../Components/Routes';
import ThemeProvider from './ThemeProvider';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <HashRouter>
            <ThemeProvider>
              <Switch>
                <BaseRoutes />
              </Switch>
            </ThemeProvider>
          </HashRouter>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default memo(App);
