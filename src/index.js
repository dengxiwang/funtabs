import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Router, RouterBeforeEach } from './myRouters';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <RouterBeforeEach />
    <Router />
  </BrowserRouter>
);