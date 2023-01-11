import React from 'react';
import Clock from './clock';
import './index.css';
import { LinkList } from './linkList';
import SearchTools from './searchTools';

export default function Home() {
  return (
      <div className='content'>
          <Clock />
          <SearchTools />
          <LinkList />
      </div>
  )
}
