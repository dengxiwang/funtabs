import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2023.01.11)';
    const version = '20220111'
    const content = <>
        1、优化快捷翻译组件，【更多】菜单中新增隐私权政策说明页面；
        <br />
        2、云端数据同步方式为用户手动拉取、上传；
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