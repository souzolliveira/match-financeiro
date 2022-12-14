// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// i18n (internationalization)
import './i18n/i18n';

// Main styles
import './styles/index.css';

// Views
import App from './views/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
