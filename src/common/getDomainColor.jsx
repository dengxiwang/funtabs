export default function getDomainColor(imgUrl) {
  return new Promise((resolve, reject) => {
    // 创建一个image元素
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // 设置跨域请求图片
    img.onload = function () {
      resolve(getDominantColor(this));
    };
    img.onerror = reject; // 图片加载失败时reject
    img.src = imgUrl;
  });
}

function getDominantColor(img) {
  // 创建一个canvas元素
  const canvas = document.createElement('canvas');
  // 将图片绘制到canvas上
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // 存储RGB值的频率
  const colorFreq = {};
  let maxFreq = 0; // 最大出现频率
  let dominantColor = 'rgb(0,0,0)';

  // 遍历像素数据，计算RGB分量的频率
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const color = `rgb(${r},${g},${b})`;
    if (!colorFreq[color]) {
      colorFreq[color] = 0;
    }
    colorFreq[color]++;
    // 更新最大出现频率和对应的颜色
    if (colorFreq[color] > maxFreq) {
      maxFreq = colorFreq[color];
      dominantColor = color;
    }
  }

  return dominantColor;
}
