import { message, Modal } from "antd";
import React, { useState } from "react";

export default function ResetData() {
	const [opened, setOpened] = useState(false);

	const cancelModal = () => {
		setOpened(false);
	};

	const openModal = () => {
		setOpened(true);
	};

	const clearLocalStorage = () => {
		window.localStorage.clear();
		window.sessionStorage.clear();
	};

	const reloadPage = () => {
		message.success("本地初始化成功！即将自动刷新页面～");
		setTimeout(() => {
			window.location.reload(true);
		}, 1000);
	};

	function confirm() {
		clearLocalStorage();
		setOpened(false);
		reloadPage();
	}

	return (
		<>
			{/* eslint-disable-next-line */}
			<a onClick={openModal}>重置数据</a>
			{opened ? (
				<Modal
					title="重置数据"
					okText="确定"
					cancelText="取消"
					onCancel={cancelModal}
					onOk={confirm}
					destroyOnClose
					focusTriggerAfterClose={false}
					open={opened}
				>
					您确定恢复到我们的初始数据吗？
				</Modal>
			) : null}
		</>
	);
}
