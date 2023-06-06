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
        const { password, userName } = window.localStorage;
        const clearLocalStorage = () => {
            window.localStorage.clear();
            window.sessionStorage.clear();
        };
        const reloadPage = () => {
            message.success('本地初始化成功！即将自动刷新页面～');
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        };

        if (password && userName) {
            clearLocalStorage();
            window.localStorage.setItem('userName', userName);
            window.localStorage.setItem('password', password);
            reloadPage();
        } else {
            clearLocalStorage();
            setOpened(false)
            reloadPage();
        }
    }

    return (
        <>
            {/* eslint-disable-next-line */}
            <a onClick={openModal}>重置数据</a>
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
