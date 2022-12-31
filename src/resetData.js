import { WarningFilled } from '@ant-design/icons'
import { message, Modal } from 'antd'
import React, { useState } from 'react'

export default function ResetData() {
    const [opened, setOpened] = useState(false)

    const cancelModal = () => {
        setOpened(false)
    }

    const openModal = () => {
        setOpened(true)
    }

    function confirm() {
        if (window.localStorage.getItem('password') && window.localStorage.getItem('userName')) {
            const password = window.localStorage.getItem('password')
            const userName = window.localStorage.getItem('userName')
            window.localStorage.clear()
            window.localStorage.setItem('userName', userName)
            window.localStorage.setItem('password', password)
            message.success('本地初始化成功！即将自动刷新页面～')
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
        } else {
            window.localStorage.clear()
            message.success('本地初始化成功！即将自动刷新页面～')
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
        }
    }

    return (
        <>
            {/* eslint-disable-next-line */}
            <a onClick={openModal}><WarningFilled style={{ marginRight: '8px' }} />重置数据</a>
            <Modal
                title='重置数据'
                okText='确定'
                cancelText='取消'
                onCancel={cancelModal}
                onOk={confirm}
                destroyOnClose
                open={opened}
            >
                您确定恢复到我们的初始数据吗？
            </Modal>
        </>
    )
}
