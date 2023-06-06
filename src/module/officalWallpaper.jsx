import { Tabs, message } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './recommendAdd.css';
import { wallpaperSource, wallpaperSourceClass } from './wallpaperSource';

function OfficalWallpaper(props) {
  const { url: initUrl, setUrl, setCheckType, setFontColor, setPreviewImage } = props;
  const [selectValue, setSelectValue] = useState('1');
  const [filteredItems, setFileteredItems] = useState([]);

  // 网格布局样式信息
  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(120px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill,100px)',
    columnGap: '12px',
    rowGap: '12px',
    gridAutoFlow: 'dense',
  }), []);

  // 显示选中状态
  function showClick(itemUrl) {
    if (itemUrl === initUrl) {
      return (
        <div style={{
          position: 'absolute',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <img src='./images/check.svg' alt='' style={{ height: '38px', width: '38px' }} />
        </div>
      );
    }
  }

  // 选择器改变回调
  const handleTabChange = useCallback((e) => {
    setSelectValue(e);
  }, []);

  // 过滤数据
  useEffect(() => {
    // 使用 setTimeout 避免更新太频繁
    const timer = setTimeout(() => {
      setFileteredItems(wallpaperSource.filter(item => item.class === selectValue));
    }, 300);
    return () => clearTimeout(timer);
  }, [selectValue]);

  return (
    <div className='newtabs-style' style={{ height: '318px' }}>
      <Tabs
        defaultActiveKey={selectValue}
        tabPosition='top'
        type='card'
        tabBarGutter={8}
        onChange={handleTabChange}
        items={wallpaperSourceClass}
      />
      <div style={{ height: '270.5px', overflow: 'scroll' }}>
        <div style={gridStyle}>
          {filteredItems.map((item, index) => (
            <div key={index} className='recommendAdd-div-style2'>
              <img
                className='wallpaper'
                alt='funtabs｜趣标签页，给你不一样的浏览器起始页'
                src={item.pre}
                onClick={() => {
                  if (item.url === initUrl) {
                    message.warning('此壁纸已被选中，您可切换到壁纸设置中预览效果');
                  } else {
                    setUrl(item.url);
                    setPreviewImage(item.url);
                    setCheckType(item.type);
                    if (item.fontColor) {
                      setFontColor(item.fontColor);
                    }
                    message.success('选中成功，您可切换到壁纸设置中预览效果');
                  }
                }}
              />
              {showClick(item.url)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfficalWallpaper;