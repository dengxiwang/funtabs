import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2023.01.10)';
    const version = '20220110'
    const content = <>
        1、新增【快捷翻译器】小组件，网站logo换新；
        <br />
        2、云端数据同步方式为用户手动拉取、上传；
        <br />
        3、网站域名更新为：https://funtabs.cn；
        <br />
        4、原域名会默认跳转到新域名；
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