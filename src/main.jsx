import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Store } from './Store';
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={Store}>
    <App />
  </Provider>,
);



