import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Router, RouterBeforeEach } from './myRouters';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <BrowserRouter>
      <RouterBeforeEach />
      <Router />
    </BrowserRouter>
  </>
);