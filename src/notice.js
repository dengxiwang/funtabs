import { BellFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [api, contextHolder] = notification.useNotification();
    const text = '更新内容(2022.12.23)';
    const version = '20221223'
    const content = <>
        1、新增【时间进度条】小组件；
        <br />
        2、更改数据备份恢复策略；
        <br />
        3、添加卡片拖拽排序动画；
        <br />
        4、更换默认壁纸；
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
        <a onClick={openNotification} href>
            {contextHolder}
            <BellFilled style={{ marginRight: '8px' }} />
            {text}
        </a>
    )
}

export default Notice;