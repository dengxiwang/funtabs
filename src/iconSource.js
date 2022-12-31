//建立资源分类
const sourceClass = [
    { value: 'tuijian', key: 'tuijian', label: '推荐' },
    { value: 'sousuo', key: 'sousuo', label: '搜索' },
    { value: 'xinwen', key: 'xinwen', label: '新闻' },
    { value: 'yingyin', key: 'yingyin', label: '影音' },
    { value: 'yule', key: 'yule', label: '娱乐' },
    { value: 'gongjv', key: 'gongjv', label: '工具' },
    { value: 'luntan', key: 'luntan', label: '论坛' },
    { value: 'daima', key: 'daima', label: '代码' },
    { value: 'falv', key: 'falv', label: '法律' },
    { value: 'keji', key: 'keji', label: '科技' },
    { value: 'tupian', key: 'tupian', label: '图片' },
    { value: 'xiaolv', key: 'xiaolv', label: '效率' },
    { value: 'xuexi', key: 'xuexi', label: '学习' },
    { value: 'youxi', key: 'youxi', label: '游戏' },
    { value: 'gouwu', key: 'gouwu', label: '购物' },
    { value: 'shejiao', key: 'shejiao', label: '社交' },
    { value: 'yuedu', key: 'yuedu', label: '阅读' },
    { value: 'chuxing', key: 'chuxing', label: '出行' },
    { value: 'qita', key: 'qita', label: '其他' },
]

//建立图标资源库
const source = [
    { link: '217fun.com', sourceClass: 'tuijian', label: '217fun爱一起玩', color: '#2D85F0', icon: 'logo.png', describe: '爱就一起来，好玩趁现在' },
    { link: 'baidu.com', sourceClass: 'sousuo', label: '百度', color: '#346efd', icon: 'baidu.svg', describe: '国内最大的搜索引擎' },
    { link: 'google.com', sourceClass: 'sousuo', label: 'Google', color: '#ffffff', icon: 'google.svg', describe: '全球最大的搜索引擎' },
    { link: 'douyin.com', sourceClass: 'yule', label: '抖音', color: '#000', icon: 'douyin.svg', describe: '' },
    { link: 'bilibili.com', sourceClass: 'yingyin', label: '哔哩哔哩', color: '#1296db', icon: 'bilibili.svg', describe: '' },
    { link: 'iqiyi.com', sourceClass: 'yingyin', label: '爱奇艺', color: '#00b739', icon: 'iqiyi.svg', describe: '' },
    { link: 'weibo.com', sourceClass: 'yule', label: '微博', color: '#ffffff', icon: 'weibo.svg', describe: '' },
    { link: 'tongji.baidu.com', sourceClass: 'gongjv', label: '百度统计', color: '#ffffff', icon: 'tongji.svg', describe: '' },
    { link: '52pojie.cn', sourceClass: 'luntan', label: '吾爱破解', color: '#ffffff', icon: 'pojie.svg', describe: '' },
    { link: 'v.qq.com', sourceClass: 'yingyin', label: '腾讯视频', color: '#ffffff', icon: 'qqvideo.svg', describe: '' },
    { link: 'aliyun.com', sourceClass: 'keji', label: '阿里云', color: '#FF6A00', icon: 'aliyun.svg', describe: '' },
    { link: 'oschina.net', sourceClass: 'daima', label: '开源中国', color: '#239B4B', icon: 'oschina.svg', describe: '' },
    { link: 'segmentfault.com', sourceClass: 'daima', label: '思否', color: '#019A61', icon: 'segmentfault.svg', describe: '' },
    { link: 'gitlab.com', sourceClass: 'daima', label: 'GitLab', color: '#ffffff', icon: 'gitlab.svg', describe: '' },
    { link: 'juejin.cn', sourceClass: 'daima', label: '掘金', color: '#2080FF', icon: 'juejin.svg', describe: '' },
    { link: 'wenshu.court.gov.cn', sourceClass: 'falv', label: '中国裁判文书网', color: '#ffffff', icon: 'chineseWenshu.png', describe: '' },
    { link: 'itslaw.com', sourceClass: 'falv', label: '无讼案例', color: '#2D82F7', icon: 'wusonganli.png', describe: '' },
]

function IconSource(domain) {
    for (let i = 0; i < source.length; i++) {
        if (source[i].link === domain) {
            return source[i]
        }
    }
}

export { IconSource, source, sourceClass };
