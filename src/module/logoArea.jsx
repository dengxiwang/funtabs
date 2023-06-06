import { Image } from 'antd';
import React, { useEffect, useState } from 'react';

function LogoArea() {

  const [width, setWidth] = useState(document.body.clientWidth);
  const logoUrl = window.localStorage.getItem('logoUrl') ? window.localStorage.getItem('logoUrl') : '/logo_white.svg'

  useEffect(() => {
    function handleResize() {
      setWidth(document.body.clientWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getHeight() {
    if (width < 650) {
      return '156px';
    } else {
      return '245px';
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Image
        src={logoUrl}
        style={{
          height: getHeight(),
          padding: '40px 0px',
          width: 'auto',
        }}
        preview={false}
      />
    </div>
  );
}

export default LogoArea;
