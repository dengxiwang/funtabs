import { Space } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock';
import './index.css';
import { LinkList } from './linkList';
import reportWebVitals from './reportWebVitals';
import SearchTools from './searchTools';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <div className='content'>
      <Clock />
      <SearchTools />
      <LinkList />
    </div>
    <div style={{ zIndex: 10, bottom: '0px', position: 'fixed', display: 'flex', width: '100%', justifyContent: 'center', backgroundColor: 'rgb(0 0 0 / 60%)' }}>
      <Space wrap style={{ justifyContent: 'center' }}>
        <a target="_blank" rel="noopener noreferrer" href='https://beian.miit.gov.cn/#/Integrated/index' style={{ color: '#fff' }} >备案号：豫ICP备2022020856号-1</a>
        <a target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41072402000315" className='beian-div-a'><img src='http://www.beian.gov.cn/img/new/gongan.png' style={{ height: '15px', width: '15px' }} alt='' />豫公网安备 41072402000315号</a>
      </Space>
    </div>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
