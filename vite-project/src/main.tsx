import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider for Redux
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n'; // Import your i18n configuration
import AppRouter from './routes'; // Import the main router
import store from './store'; // Import Redux store
import './index.css'; // Global CSS

// Remove React.StrictMode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Redux Provider */}
    <I18nextProvider i18n={i18n}> {/* i18next Provider for internationalization */}
      <BrowserRouter> {/* Wrap the entire app in one BrowserRouter */}
        <AppRouter />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
