//import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider for Redux
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n'; // Import your i18n configuration
import App from './App'; // Import the main App
import store from './store'; // Import Redux store
import './index.css'; // Global CSS

// Remove React.StrictMode for smoother development without unnecessary double rendering.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Redux Provider */}
    <I18nextProvider i18n={i18n}> {/* i18next Provider for internationalization */}
      <BrowserRouter> {/* Only include BrowserRouter once here */}
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
