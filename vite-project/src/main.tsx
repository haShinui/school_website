import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider for Redux
import AppRouter from './routes'; // Import the main router
import store from './store'; // Import Redux store
import './index.css'; // Global CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux Provider */}
      <BrowserRouter> {/* Wrap the entire app in one BrowserRouter */}
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
