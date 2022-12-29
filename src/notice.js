import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2022.12.29)';
    const version = '20221229'
    const content = <>
        1、新增登录注册功能，可以云端同步数据；
        <br />
        2、调整壁纸设置的入口到编辑桌面；
        <br />
        3、调整还原默认配置入口到更多菜单；
        <br />
        4、欢迎大家加入我们的QQ交流群：727809499；
    </>;
    const [open] = useState(
        () => {
            if (window.localStorage.getItem('noticeOpen') === version) {
                return window.localStorage.getItem('noticeOpen')
            } else {
                return 0
            }
        }
    )
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
            <a onClick={openNotification}>
                <BellFilled style={{ marginRight: '8px' }} />
                {text}
            </a>
        </>
    )
}

export default Notice;