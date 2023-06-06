//建立资源分类
const sourceClass = [
    { value: 'tuijian', key: 'tuijian', label: '推荐' },
    { value: 'sousuo', key: 'sousuo', label: '搜索' },
    { value: 'yingyin', key: 'yingyin', label: '影音' },
    { value: 'yule', key: 'yule', label: '娱乐' },
    { value: 'gongjv', key: 'gongjv', label: '工具' },
    { value: 'luntan', key: 'luntan', label: '论坛' },
    { value: 'daima', key: 'biancheng', label: '编程' },
    { value: 'falv', key: 'falv', label: '法律' },
    { value: 'keji', key: 'keji', label: '科技' },
]

//建立图标资源库
const source = [
    { link: 'baidu.com', sourceClass: 'sousuo', label: '百度', color: '#346efd', icon: 'baidu.svg', describe: '国内最大的搜索引擎' },
    { link: 'google.com', sourceClass: 'sousuo', label: 'Google', color: '#ffffff', icon: 'google.svg', describe: '全球最大的搜索引擎' },
    { link: 'douyin.com', sourceClass: 'yule', label: '抖音', color: '#000', icon: 'douyin.svg', describe: '' },
    { link: 'bilibili.com', sourceClass: 'yingyin', label: '哔哩哔哩', color: '#1296db', icon: 'bilibili.svg', describe: '' },
    { link: 'iqiyi.com', sourceClass: 'yingyin', label: '爱奇艺', color: '#00b739', icon: 'iqiyi.svg', describe: '' },
    { link: 'weibo.com', sourceClass: 'yule', label: '微博', color: '#ffffff', icon: 'weibo.svg', describe: '' },
    { link: 'tongji.baidu.com', sourceClass: 'gongjv', label: '百度统计', color: '#ffffff', icon: 'tongji.svg', describe: '' },
    { link: '52pojie.cn', sourceClass: 'luntan', label: '吾爱破解', color: '#C90E3B', icon: 'pojie.svg', describe: '' },
    { link: 'v.qq.com', sourceClass: 'yingyin', label: '腾讯视频', color: '#ffffff', icon: 'qqvideo.svg', describe: '' },
    { link: 'aliyun.com', sourceClass: 'keji', label: '阿里云', color: '#FF6A00', icon: 'aliyun.svg', describe: '' },
    { link: 'oschina.net', sourceClass: 'biancheng', label: '开源中国', color: '#239B4B', icon: 'oschina.svg', describe: '' },
    { link: 'segmentfault.com', sourceClass: 'biancheng', label: '思否', color: '#019A61', icon: 'segmentfault.svg', describe: '' },
    { link: 'gitlab.com', sourceClass: 'biancheng', label: 'GitLab', color: '#ffffff', icon: 'gitlab.svg', describe: '' },
    { link: 'juejin.cn', sourceClass: 'biancheng', label: '掘金', color: '#2080FF', icon: 'juejin.svg', describe: '' },
    { link: 'wenshu.court.gov.cn', sourceClass: 'falv', label: '中国裁判文书网', color: '#ffffff', icon: 'chineseWenshu.png', describe: '' },
    { link: 'itslaw.com', sourceClass: 'falv', label: '无讼案例', color: '#2D82F7', icon: 'wusonganli.png', describe: '' },
    { link: 'cn.bing.com', sourceClass: 'sousuo', label: '必应', color: '#ffffff', icon: 'bing.svg', describe: '' },
    { link: 'fsoufsou.com', sourceClass: 'sousuo', label: 'F搜', color: '#ffffff', icon: 'fsou.svg', describe: '' },
    { link: 'youku.com', sourceClass: 'yingyin', label: '优酷', color: '#ffffff', icon: 'youku.svg', describe: '' },
    { link: 'github.com', sourceClass: 'biancheng', label: 'Github', color: '#ffffff', icon: 'github.svg', describe: '' },
    { link: 'ant-design.antgroup.com/index-cn', sourceClass: 'biancheng', label: 'Ant design', color: '#ffffff', icon: 'antd.svg', describe: '' },
    { link: 'mp.weixin.qq.com', sourceClass: 'gongjv', label: '微信公众平台', color: '#17CE22', icon: 'weixin.svg', describe: '' },
    { link: 'csdn.net', sourceClass: 'biancheng', label: 'CSDN', color: '#FC5734', icon: 'csdn.svg', describe: '' },
]

function IconSource(domain) {
    return source.find(item => item.link === domain);
}

export { IconSource, source, sourceClass };
