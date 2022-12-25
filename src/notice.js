import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2022.12.25)';
    const version = '20221225'
    const content = <>
        1、新增支持设置卡片背景颜色；
        <br />
        2、新增卡片样式：手机样式；
        <br />
        3、构建图标资源库，等待逐步完善图标资源；
        <br />
        4、新增时间进度条小组件；
        <br />
        5、欢迎大家加入我们的QQ交流群：727809499；
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
            }
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
        <a onClick={openNotification}>
            {contextHolder}
            <BellFilled style={{ marginRight: '8px' }} />
            {text}
        </a>
    )
}

export default Notice;