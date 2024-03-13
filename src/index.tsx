import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Use type assertion to handle the missing createRoot type
const root = (ReactDOM as any).createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);