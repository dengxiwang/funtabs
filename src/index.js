import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock';
import './index.css';
import { LinkList } from './linkList';
import SearchTools from './searchTools';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <div className='content'>
      <Clock />
      <SearchTools />
      <LinkList />
    </div>
  </>
);
