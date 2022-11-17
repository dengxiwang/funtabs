import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock';
import './index.css';
import LinkList from './linkList';
import reportWebVitals from './reportWebVitals';
import SearchTools from './searchTools';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <FunTabs /> */}
    <div className='background'>
      <div className='maskBackground' />
    </div>
    <div className='content'>
      <Clock />
      <SearchTools />
      <LinkList />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
