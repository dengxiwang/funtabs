//建立图标资源库
const source = {
    'baidu.com': ['百度', '#346efd', 'baidu.svg'],
    'baidu.cn': ['百度', '#346efd', 'baidu.svg'],
    'google.com': ['Google', '#ffffff', 'google.svg'],
    'google.com.hk': ['Google', '#ffffff', 'google.svg'],
    'douyin.com': ['抖音', '#000', 'douyin.svg'],
    'bilibili.com': ['哔哩哔哩', '#1296db', 'bilibili.svg'],
    'iqiyi.com': ['爱奇艺', '#00b739', 'iqiyi.svg'],
    'weibo.com': ['微博', '#ffffff', 'weibo.svg'],
}
export function IconSource(domain) {
    for (let i = 0; i < Object.keys(source).length; i++) {
        if (Object.keys(source)[i] === domain) {
            return Object.values(source)[i]
        }
    }
}