import { Input, Space, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import useDoubleClick from "use-double-click";
import { get } from "../common/fetch";
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import variable from "../common/variable";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";

export default function Translate(props) {
	const { TextArea } = Input;
	const {
		id,
		edit,
		num,
		linkList,
		setLinkList,
		item,
		cardStyle,
		radius,
		setDisabled,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;
	const [content, setContent] = useState("");
	const [result, setResult] = useState("");

	const getInput = useCallback(
		(e) => {
			const content = e.target.value;
			setContent(content.trim().replace(/[\r\n]+$/, ""));
			if (content === "") {
				setResult("");
			}
		},
		[setContent, setResult]
	);

	const getResult = useCallback(() => {
		if (setDisabled) {
			setDisabled(false);
		}
		if (content !== "") {
			get(`${variable.fanyi}?text=${content}`).then((res) => {
				setResult(`翻译结果：${res}`);
			});
		}
	}, [content, setDisabled]);

	const showSettings = useCallback(() => {
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
				</>
			);
		}
	}, [edit, id, item, num, linkList, setLinkList]);

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
			navigator.clipboard
				.writeText(result)
				.then(() => {
					message.success("已成功复制到剪贴板");
				})
				.catch((err) => {
					message.error("复制失败:", err);
				});
		},
		ref: doubleClickRef,
		latency: 230,
	});

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				borderRadius: showRadius(radius),
				boxShadow: showBoxShadow(),
				backgroundColor: "#fff",
				cursor: "pointer",
			}}
			onDoubleClick={(e) => {
				const x = e.clientX;
				const width = window.innerWidth;
				if (x <= width / 2) {
					changeTabs("left");
				} else {
					changeTabs("right");
				}
			}}
		>
			<div style={{ padding: "14px", height: "calc(100% - 28px)" }}>
				{/* 标题展示区 */}
				<Space style={{ marginBottom: "10px" }}>
					<img
						src="/images/translatePre.svg"
						style={{
							width: "20px",
							height: "20px",
							marginTop: "2px",
							marginLeft: "10px",
						}}
						alt=""
					/>
					<p style={{ fontWeight: "bold", fontSize: "16px", color: "#1490ff" }}>
						快捷翻译器
					</p>
				</Space>
				<div
					style={{
						height: "calc(100% - 42px)",
						overflow: "hidden",
						borderRadius: "6px",
						overflowY: "scroll",
					}}
				>
					<TextArea
						placeholder="在此输入您要翻译的内容"
						onChange={getInput}
						value={content}
						allowClear
						onBlur={getResult}
						autoSize={{ minRows: 2.5, maxRows: 2.5 }}
						onFocus={() => {
							if (setDisabled) {
								setDisabled(false);
							}
						}}
						bordered={false}
						onPressEnter={getResult}
					/>
					<p
						ref={doubleClickRef}
						style={{
							margin: "10px 10px 0px 10px",
							fontWeight: "bold",
						}}
					>
						{result}
					</p>
				</div>
			</div>
			{showSettings()}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</div>
	);
}
