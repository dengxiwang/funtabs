
// 统一的请求函数
const request = async (url, config, token) => {
  try {
    // 添加 Authorization 请求头，携带 token
    config.headers = {
      ...config.headers,
      'token': `${token}`
    };

    const res = await fetch(url, config);
    // 处理HTTP状态码不为200的情况
    if (!res.ok) {
      return null;
    }

    const contentType = res.headers.get('content-type');

    // 如果返回数据不是JSON格式或者不是二进制流，则返回原始文本
    if (contentType.indexOf('application/json') === -1 && contentType.indexOf('application/octet-stream') === -1) {
      return await res.text();
    }

    // 如果返回的是JSON格式，则对其进行解析
    if (contentType.indexOf('application/json') !== -1) {
      const result = await res.json();

      // 处理返回的错误信息
      if (result.hasOwnProperty('code') && result.code !== 200) {
        return null;
      }

      return result.data;
    }

    // 如果返回的是二进制流，则直接返回Blob对象
    const blob = await res.blob();
    return blob;

  } catch (error) {
    console.log('同步服务出错，请注意备份数据');
    return null
  }
};

const debounce = (func, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
};

//GET请求函数
export const getClear = (url, params, token) => {
  let queryString = '';
  if (params) {
    queryString = Object.entries(params).map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
  }

  return request(`${url}${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    mode: 'cors',
  }, token);
};

//POST请求函数
export const postClear = debounce((url, data, token) => {
  if (data instanceof FormData) { // 如果是FormData类型，则不需要手动设置content-type
    return request(url, {
      body: data,
      method: 'POST'
    }, token);
  } else { // 否则，默认使用JSON格式，并手动设置content-type
    return request(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }, token);
  }
}, 500);