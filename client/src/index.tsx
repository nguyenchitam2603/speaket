import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { RouterComponent } from './components';
import { store } from './store';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(RouterComponent);

declare var process;
console.log(`Current directory: ${process.cwd()}`);

if (module.hot) {
  module.hot.accept('./components', () => {
    const NextComponent = require('./components').RouterComponent;
    render(NextComponent);
  });
}
