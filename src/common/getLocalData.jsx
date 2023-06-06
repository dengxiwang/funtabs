export default function getLocalData() {
  const data = {}

  // 获取所有 localStorage 的键名数组
  const allKeys = Object.keys(localStorage);

  // 针对需要保留下来的特定前缀使用 filter() 函数过滤
  const validKeys = allKeys.filter(key =>
    key.startsWith('time') ||
    key.startsWith('note') ||
    key.startsWith('begin') ||
    key.startsWith('end') ||
    key.startsWith('hotEvent') ||
    key === 'token' ||
    key === 'stickerData' ||
    key === 'brightness' ||
    key === 'funtabs' ||
    key === 'showClock' ||
    key === 'activeKey' ||
    key === 'wallpaperType' ||
    key === 'fontColor' ||
    key === 'linkOpen' ||
    key === 'paddingTop' ||
    key === 'boxShadow' ||
    key === 'backgroundImage' ||
    key === 'blur' ||
    key === 'model' ||
    key === 'noticeOpen' ||
    key === 'boxShadowOpen' ||
    key === 'showSearch' ||
    key === 'webTitle' ||
    key === 'searchEngine' ||
    key === 'searchEngineList' ||
    key === 'localHotEventColor' ||
    key === 'timeArea' ||
    key === 'logoUrl' ||
    key === 'saveTime'
  );

  // 遍历所有键值对，并删除非法的条目
  for (let i = 0; i < allKeys.length; i++) {
    const currentKey = allKeys[i];

    // 如果这个键名不在需要保留的有效列表中，则将该键值对从 localStorage 中删除
    if (!validKeys.includes(currentKey)) {
      localStorage.removeItem(currentKey);
    }
  }

  // 返回Promise对象
  return new Promise((resolve) => {
    setTimeout(() => {
      for (var i = 0; i < localStorage.length; i++) {
        data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
      }
      delete data['token'];
      delete data['activeKey'];
      for (const key in data) {
        if (key.startsWith('hotEvent')) {
          delete data[key];
        }
      }
      // 将数据通过resolve方法返回
      resolve(data);
    }, 0);
  });
}
