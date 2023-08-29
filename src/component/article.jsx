import { Button, Modal, Space, Tooltip, message } from "antd";
import Title from "antd/es/typography/Title";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import DeleteCard from "../module/deleteCard";
import EditArticleCard from "../module/editArticleCard";
import ShowLabel from "../module/showLabel";

function Article(props) {
	const {
		radius,
		edit,
		id,
		num,
		item,
		linkList,
		setLinkList,
		cardStyle,
		setDisabled,
		click,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;

	const [modalOpen, setModalOpen] = useState(false);
	const doubleClickRef = useRef();

	function changeTabs(e) {
		if (linkList.length && linkList.length <= 1) {
			return;
		}
		const currentIndex = linkList.findIndex(
			(item) => item.key === tabsActiveKey
		);
		if (currentIndex === -1) {
			return;
		}
		const nextIndex = currentIndex + (e === "left" ? -1 : 1);
		const lastIndex = currentIndex - (e === "left" ? 1 : -1);
		if (linkList[lastIndex]) {
			setTabsActiveKey(linkList[lastIndex].key);
			localStorage.setItem("activeKey", linkList[lastIndex].key);
		} else if (linkList[nextIndex]) {
			setTabsActiveKey(linkList[nextIndex].key);
			localStorage.setItem("activeKey", linkList[nextIndex].key);
		} else {
			e === "left"
				? message.error("已经切换到最左侧分类")
				: message.error("已经切换到最右侧分类");
		}
	}

	useDoubleClick({
		onSingleClick: openModal,
		onDoubleClick: (e) => {
			const x = e.clientX;
			const width = window.innerWidth;
			if (x <= width / 2) {
				changeTabs("left");
			} else {
				changeTabs("right");
			}
		},
		ref: doubleClickRef,
		latency: 230,
	});

	// 自定义渲染器 renderer
	const renderer = {
		img: ({ alt, src }) => (
			<img
				alt={alt}
				src={`${src}`}
				style={{ maxWidth: "100%", textIndent: "-3.2ch" }}
				crossOrigin="anonymous"
			/>
		),
		p: ({ children, node }) => {
			const hasElement = node.children[0].type !== "text";
			return (
				<p style={{ textIndent: hasElement ? 0 : "2ch", lineHeight: 2 }}>
					{children}
				</p>
			);
		},
	};

	function openModal() {
		if (edit === "" || click === 1) {
			return;
		} else {
			setModalOpen(true);
		}
	}

	function closeModal() {
		setModalOpen(false);
	}

	function showSettings() {
		if (edit === "") {
			return (
				<>
					<DeleteCard
						id={id}
						item={item}
						num={num}
						linkList={linkList}
						setLinkList={setLinkList}
					/>
					<EditArticleCard
						id={id}
						item={item}
						num={num}
						linkList={linkList}
						setLinkList={setLinkList}
						setDisabled={setDisabled}
					/>
				</>
			);
		}
	}

	return (
		<>
			<div
				ref={doubleClickRef}
				style={{
					width: "100%",
					height: "100%",
					boxSizing: "border-box",
					borderRadius: showRadius(radius),
					boxShadow: showBoxShadow(),
					cursor: cursorControl(),
					backgroundColor: "#ffffff",
					overflow: "hidden",
					position: "relative",
					objectFit: "cover",
				}}
			>
				<img
					src={item.cover}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
					alt=""
					crossOrigin="anonymous"
					onError={(e) => {
						e.target.onerror = null; // 防止进入无限循环
						e.target.src = "/images/article.svg";
					}}
				/>
				<div
					style={{
						position: "absolute",
						bottom: "0px",
						padding: "10px",
						boxSizing: "border-box",
						backdropFilter: "blur(3px)",
						background: "#00000030",
						width: "100%",
					}}
				>
					<Tooltip title={item.label}>
						<p
							style={{
								fontWeight: "bold",
								color: "#ffffff",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap" /* 禁止文本换行 */,
								overflow: "hidden",
							}}
						>
							{item.label}
						</p>
					</Tooltip>
				</div>
			</div>
			{modalOpen ? (
				<Modal
					focusTriggerAfterClose={false}
					destroyOnClose={true}
					onCancel={closeModal}
					width={"100%"}
					title={
						<Space
							style={{
								width: "100%",
								justifyContent: "space-between",
								flexDirection: `${item.link ? "" : "row-reverse"}`,
							}}
						>
							{item.link ? (
								<Button
									onClick={() => {
										window.open(item.link);
									}}
								>
									查看原文
								</Button>
							) : null}
							<Button type="default" onClick={closeModal}>
								关闭
							</Button>
						</Space>
					}
					open={modalOpen}
					bodyStyle={{
						display: "flex",
						justifyContent: "center",
						height: "calc(100vh - 112px)",
						overflow: "scroll",
					}}
					style={{
						maxWidth: "677px",
						padding: "12px",
					}}
					centered
					footer={false}
					closable={false}
				>
					<div style={{ width: "100%", maxWidth: "677px" }}>
						<Title level={3} style={{ marginTop: "0px", textAlign: "center" }}>
							{item.label}
						</Title>
						<ReactMarkdown components={renderer}>{item.content}</ReactMarkdown>
					</div>
				</Modal>
			) : null}
			{showSettings()}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
}

export default Article;
