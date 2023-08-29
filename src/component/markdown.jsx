import { Modal, message } from "antd";
import MarkdownIt from "markdown-it";
import React, { useRef, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import { CloseCircleFilled } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import "react-markdown-editor-lite/lib/index.css";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import showBoxShadow from "../common/showBoxShadow";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";

export default function Markdown(props) {
	const [open, setOpen] = useState(false);
	const {
		id,
		edit,
		num,
		linkList,
		setLinkList,
		cardStyle,
		item,
		radius,
		click,
		setDisabled,
		fontColor,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;
	const mdParser = new MarkdownIt(/* Markdown-it options */);

	function handleImage(file) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (data) => {
				resolve(data.target.result);
			};
			reader.readAsDataURL(file);
		});
	}

	function cancleModal() {
		setOpen(false);
		if (setDisabled) {
			setDisabled(false);
		}
	}

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
		onSingleClick: () => {
			if (edit === "none" && click === 0) {
				if (setDisabled) {
					setDisabled(true);
				}
				setOpen(true);
			}
		},
		ref: doubleClickRef,
		latency: 230,
	});

	const showSettings = () => {
		if (edit === "") {
			return (
				<>
					<DeleteCard
						id={id}
						item={item}
						num={num}
						linkList={linkList}
						setLinkList={setLinkList}
						cardStyle={cardStyle}
					/>
				</>
			);
		}
	};

	function howToShow() {
		if (cardStyle === "onlyText") {
			return (
				<div
					ref={doubleClickRef}
					onDoubleClick={(e) => {
						const x = e.clientX;
						const width = window.innerWidth;
						if (x <= width / 2) {
							changeTabs("left");
						} else {
							changeTabs("right");
						}
					}}
					rel="noreferrer"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						overflow: "hidden",
						width: `calc(100%)`,
						height: `calc(100%)`,
						cursor: cursorControl(edit),
						boxShadow: showBoxShadow(),
					}}
				>
					<Paragraph
						className="onlyTextStyle"
						ellipsis={{
							rows: 1,
						}}
						style={{
							fontWeight: "bold",
							color: fontColor,
							marginBottom: "0px",
						}}
					>
						MarkDown编辑器
					</Paragraph>
				</div>
			);
		} else {
			return (
				<img
					ref={doubleClickRef}
					onDoubleClick={(e) => {
						const x = e.clientX;
						const width = window.innerWidth;
						if (x <= width / 2) {
							changeTabs("left");
						} else {
							changeTabs("right");
						}
					}}
					src="/images/markdown.svg"
					style={{
						width: "100%",
						height: "100%",
						borderRadius: `${radius}px`,
						boxShadow: showBoxShadow(),
						zIndex: 1,
						backgroundColor: "#fff",
						cursor: cursorControl(edit),
					}}
					alt=""
				/>
			);
		}
	}

	return (
		<>
			{howToShow()}
			{open ? (
				<Modal
					focusTriggerAfterClose={false}
					className="markdown-modal"
					open={open}
					onCancel={cancleModal}
					footer={null}
					width="100%"
					centered
					title="MarkDown编辑器"
					destroyOnClose
					style={{
						maxWidth: "1200px",
						padding: "12px",
					}}
					maskClosable={false}
					closeIcon={
						<CloseCircleFilled
							style={{
								color: "#f4433c",
							}}
						/>
					}
				>
					<MdEditor
						style={{ height: "calc(100dvh - 100px)", maxHeight: "800px" }}
						renderHTML={(text) => mdParser.render(text)}
						onImageUpload={handleImage}
					/>
				</Modal>
			) : null}
			{showSettings()}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
}
