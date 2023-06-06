import { Divider, Drawer, notification, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const [opened, setOpened] = useState(false);
    const text = 'v1.2.4.3版本更新内容(2023.05.17)';
    const version = '20230517'
    const content = <>
        1、更换服务器，升级账号个人中心；<br />
        2、升级数据自动同步服务，登陆时选择本地将把本地上传至云端，选择云端则是将云端数据拉到本地；<br />
        3、已注册用户密码将被重置为111111，可在个人中心修改；<br />
        <Divider style={{ margin: '12px 0px' }} />
        ❗️请您注意，官方域名为：https://funtabs.cn；<br />
        ❤️如您不弃，欢迎分享网站给朋友使用，另外我们的Chrome、edge浏览器插件已上架到扩展插件商店； <br />
        😄欢迎大家加入我们的QQ交流群：727809499；
    </>;
    const updateList = [
        {
            children: <>
                2023-05-17（ v1.2.4.3 ）<br />
                1、更换服务器，升级账号个人中心；<br />
                2、升级数据自动同步服务，登陆时选择本地将把本地上传至云端，选择云端则是将云端数据拉到本地；<br />
                3、已注册用户密码将被重置为111111，可在个人中心修改；<br />
            </>
        }, {
            children: <>
                2023-05-05（ v1.2.4.2 ）<br />
                1、新增节假日提醒小组件；<br />
                2、壁纸其它设置中新增可将时钟替换为固定图片；<br />
            </>
        }, {
            children: <>
                2023-04-23（ v1.2.4.1 ）<br />
                1、右上角更多设置中新增支持设置展示区域距离顶部高度；<br />
                2、“关于”菜单下备份数据支持导出浏览器书签格式（.html），导出书签支持导入到主流浏览器中；<br />
                3、优化书签导入功能，将按照书签内容自动创建分类及去重链接；<br />
            </>
        }, {
            children: <>
                2023-04-12（ v1.2.4 ）<br />
                1、壁纸设置中新增动态壁纸及纯色壁纸；<br />
                2、壁纸设置中新增推荐壁纸；<br />
                3、壁纸设置中新增支持更改字体颜色以及卡片阴影;<br />
                4、卡片样式新增文字经典版;<br />
            </>
        },
        {
            children: <>
                2023-03-30（ v1.2.3 ）<br />
                1、新增文件夹小组件，可将同类链接卡片集中放置；<br />
                2、新增支持卡片在全屏自由摆放与列表摆放之间快捷切换；<br />
                3、更新默认壁纸;<br />
                4、优化部分代码逻辑；<br />
                5、修复全屏热点无法点击的问题；<br />
            </>
        },
        {
            children: <>
                2023-03-17（ v1.2.2 ）<br />
                1、新增右键菜单项，可便捷定制页面；<br />
                2、新增长按图标进入编辑模式；<br />
                3、全屏卡片可自由拖拽，取消只有在编辑模式才可以拖拽的限制；<br />
                4、优化退出编辑的代码逻辑，避免重新刷新页面；<br />
            </>
        },
        {
            children: <>
                2023-03-11（ v1.2.1 ）<br />
                1、新增自定义搜索引擎功能，可在搜索引擎下拉菜单中设置；<br />
            </>
        },
        {
            children: <>
                2023-03-09（ v1.2.0 ）<br />
                1、新增壁纸设置模糊度与亮度；<br />
                2、更多设置中新增自定义链接打开方式：当前页面或新页面；<br />
            </>
        },
        {
            children: <>
                2023-03-03（ v1.1.9 ）<br />
                1、右上角【更多应用】处新增网站标题自定义；<br />
                2、更新网站代码依赖包至最新版本；
            </>
        },
        {
            children: <>
                2023-03-01（ v1.1.8 ）<br />
                1、用户名下拉框新增可设置云端保存方式，在个性编辑完成后自动自动同步，拉取操作还需手动；<br />
                2、修复火狐浏览器的样式展示问题；
            </>
        },
        {
            children: <>
                2023-02-13（ v1.1.5 ）<br />
                1、右上角页面样式更改，新增支持修改时钟与搜索框是否显示；
            </>
        },
        {
            children: <>
                2023-02-11（ v1.1.2 ）<br />
                1、新增卡片时支持添加全屏自由摆放；<br />
                2、新增用户反馈渠道以及网站更新记录；
            </>
        },
        {
            children: <>
                2023-02-07（ v1.1.0 ）<br />
                1、新增实时天气、热搜榜单小组件；<br />
                2、新增页面总宽自定义以及浏览器书签的导入功能，可实现抓取html文件中的链接;
            </>,
        },
    ]

    const [open] = useState(
        window.localStorage.getItem('noticeOpen') === version ?
            window.localStorage.getItem('noticeOpen') :
            0
    );
    const openNotification = () => {
        api.open({
            message: text,
            duration: null,
            description: content,
            onClose: () => {
                window.localStorage.setItem('noticeOpen', version)
            },
        });
    };

    const showDrawer = () => {
        setOpened(true);
    };

    const onClose = () => {
        setOpened(false);
    };

    useEffect(() => {
        if (open === 0) {
            openNotification()
        }
        // eslint-disable-next-line
    }, [])

    return (
        // eslint-disable-next-line
        <>
            {contextHolder}
            {/* eslint-disable-next-line */}
            <a onClick={showDrawer}>
                更新记录
            </a>
            <Drawer title="更新记录" placement="right" onClose={onClose} open={opened}>
                <Timeline
                    mode={'left'}
                    items={updateList}
                />
            </Drawer>
        </>
    )
}

export default Notice;