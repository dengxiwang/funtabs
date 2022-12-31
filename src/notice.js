import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2022.12.31)';
    const version = '20221231'
    const content = <>
        1、调整云端数据同步方式为用户手动拉取或上传；
        <br />
        2、新增卡片增加【FUN推荐】选项卡；
        <br />
        3、调整壁纸设置以及还原配置入口；
        <br />
        4、网站增加域名解析：https://go.217fun.com；
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