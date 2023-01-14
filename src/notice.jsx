import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2023.01.14)';
    const version = '20220114'
    const content = <>
        1、Chrome、edge浏览器插件上架扩展商店；
        <br />
        2、优化众多操作细节，更换网站默认壁纸；
        <br />
        3、网站域名更新为：https://funtabs.cn；
        <br />
        4、原https://daohang.217fun.com域名会默认跳转到新域名；
        <br />
        5、如有问题欢迎大家加入我们的QQ交流群：727809499；
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