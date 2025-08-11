import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './pages/navigation/index';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

