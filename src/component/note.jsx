import { StyleProvider } from "@ant-design/cssinjs";
import { TagFilled } from "@ant-design/icons";
import { Card, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import "../common/funtabs.css";
import pointerEventsControl from "../common/pointerEventsControl";
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";

//定义便签小组件
const Note = (props) => {
	const {
		heightNum,
		num,
		id,
		item,
		linkList,
		setLinkList,
		cardStyle,
		edit,
		radius,
		setDisabled,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;
	const [noteValue, setNoteValue] = useState(
		localStorage.getItem(`note${item.id}`)
	);

	function changeLocal(e) {
		if (e.key === `note${item.id}`) {
			setNoteValue(e.newValue);
		}
	}

	useEffect(() => {
		window.addEventListener("setItemEvent", (e) => changeLocal(e));
		return window.removeEventListener("setItemEvent", (e) => changeLocal(e));
		// eslint-disable-next-line
	}, []);

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
		ref: doubleClickRef,
		latency: 230,
	});

	const showSettings = () => {
		if (edit === "") {
			return (
				<>
					<DeleteCard
						linkList={linkList}
						id={id}
						item={item}
						num={num}
						setLinkList={setLinkList}
					/>
				</>
			);
		} else {
			return;
		}
	};

	return (
		<>
			<StyleProvider hashPriority="high">
				<Card
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
					title={
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<TagFilled style={{ marginRight: "8px" }} />
							<p>便捷记事本</p>
						</div>
					}
					bordered={false}
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "#ffffff",
						borderRadius: showRadius(radius),
						cursor: cursorControl(edit),
						boxShadow: showBoxShadow(),
					}}
					bodyStyle={{
						height: 2.5 * heightNum,
						overflowY: "scroll",
						padding: "12px",
					}}
					headStyle={{
						textAlign: "center",
						background: "#ffa500",
						color: "#ffffff",
						minHeight: "50px",
						borderTopLeftRadius: showRadius(radius),
						borderTopRightRadius: showRadius(radius),
						filter:
							"progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffa500', endColorstr='#f9e443',GradientType=0 )",
					}}
				>
					{showSettings()}
					<TextArea
						bordered={false}
						autoSize={{
							minRows: 5,
						}}
						disabled={edit === "none" ? false : true}
						style={{
							pointerEvents: pointerEventsControl(edit),
						}}
						onFocus={() => {
							if (setDisabled) {
								setDisabled(true);
							}
						}}
						onBlur={() => {
							if (setDisabled) {
								setDisabled(false);
							}
						}}
						placeholder="在此便捷输入您要记录的文本信息"
						allowClear
						value={noteValue}
						onChange={(e) => {
							if (setDisabled) {
								setDisabled(false);
							}
							localStorage.setItem(`note${item.id}`, e.target.value);
							setNoteValue(e.target.value);
						}}
					/>
				</Card>
			</StyleProvider>
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
};

export default Note;
