import { Divider, Drawer, notification, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const [opened, setOpened] = useState(false);
    const text = 'v1.2.4.3版本更新内容(2023.05.17)';
    const version = '20230517'
    const content = <>
        1、开源版本更新；<br />
        <Divider style={{ margin: '12px 0px' }} />
        ❗️请您注意，官方域名为：https://funtabs.cn；<br />
        ❤️如您不弃，欢迎分享网站给朋友使用，另外我们的Chrome、edge浏览器插件已上架到扩展插件商店； <br />
        😄欢迎大家加入我们的QQ交流群：727809499；
    </>;
    const updateList = [
        {
            children: <>
                2023-05-17（ v1.2.4.3 ）<br />
                1、开源版本更新；<br />
            </>
        }
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