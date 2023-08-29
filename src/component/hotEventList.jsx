import { SettingTwoTone } from "@ant-design/icons";
import { Col, ColorPicker, Row, Skeleton, Tabs, message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import { hexToRgb } from "../common/hexToRgb";
import pointerEventsControl from "../common/pointerEventsControl";
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import variable from "../common/variable";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";
import "./hotEventList.css";

const HotEventList = React.memo((props) => {
	const {
		id,
		edit,
		num,
		linkList,
		setLinkList,
		item,
		cardStyle,
		linkOpen,
		radius,
		setDisabled,
		type,
		tabsActiveKey,
		setTabsActiveKey,
		heightNum,
	} = props;
	const localHotType = localStorage.getItem(`hotEvent${item.id}`);
	const [load, setLoad] = useState(true);
	const timmer = useRef();
	const [hotType, setHotType] = useState(parseInt(localHotType) || 0);
	const [color, setColor] = useState(() =>
		window.localStorage.getItem("localHotEventColor")?.length > 6
			? window.localStorage.getItem("localHotEventColor")
			: "#000000"
	);
	const [hotEventData, setHotEventData] = useState([]);
	const controller = useRef(new AbortController());
	const doubleClickRef = useRef();
	const list = useRef();
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (doubleClickRef.current) {
			const containerHeight = doubleClickRef.current.offsetHeight;
			setHeight(containerHeight - 70.28);
		}
	}, [heightNum]);

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
		onSingleClick: (e) => {
			if (edit === "none") {
				var targetElement = e.target; // 这是触发事件的元素
				if (targetElement.innerHTML === "实时热榜") {
					if (list.current) {
						list.current.scrollTo({
							top: 0,
							behavior: "smooth",
						});
						return;
					}
				}
				const a = targetElement.parentNode.parentNode;
				var href = a.getAttribute("href"); // 获取链接
				if (href) {
					window.open(href, linkOpen);
				}
			}
		},
		ref: doubleClickRef,
		latency: 230,
	});

	const showColor = useCallback(
		(e) => {
			if (e === 0) {
				return "#d9363e";
			} else if (e === 1) {
				return "#ff4d4f";
			} else if (e === 2) {
				return "#faad14";
			} else {
				return hexToRgb(color);
			}
		},
		[color]
	);

	const showIcon = useCallback((e) => {
		return e + 1;
	}, []);

	const showHot = useCallback((e) => {
		const e2 = e.toString();
		const s = e2.includes("热度");
		if (s === true) {
			const e3 = e2.replace("热度", "");
			return e3;
		} else {
			return e2;
		}
	}, []);

	const getHotEventData = useCallback((type) => {
		controller.current.abort(); // 取消之前的请求
		const newController = new AbortController(); // 创建新的 AbortController 实例
		controller.current = newController; // 更新 controller 对象
		fetch(
			`${variable.hotEvent}/${
				[
					"weibo",
					"douyin",
					"bilibili",
					"toutiao",
					"tieba",
					"baidu",
					"zhihu",
					"sspai",
				][type]
			}`,
			{ signal: controller.current.signal } // 将 signal 对象作为参数传递给 fetch 方法
		)
			.then((res) => res.json())
			.then((res) => {
				setHotEventData(res.data);
				const data = localStorage.getItem("hotEventData")
					? JSON.parse(localStorage.getItem("hotEventData"))
					: {};
				data[type] = res.data;
				localStorage.setItem("hotEventData", JSON.stringify(data));
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
			}); // 处理请求被取消的情况
	}, []);

	useEffect(() => {
		setLoad(true);
		if (list.current) {
			list.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
		if (
			localStorage.getItem("hotEventData") &&
			localStorage.getItem("hotEventData").length > 0
		) {
			try {
				const data = JSON.parse(localStorage.getItem("hotEventData"));
				if (data[hotType]) {
					setHotEventData(data[hotType]);
					setLoad(false);
				}
			} catch (error) {}
		}
		setTimeout(() => {
			getHotEventData(hotType);
		}, 0);
		timmer.current = setInterval(() => {
			getHotEventData(hotType);
		}, 180000); //每3min获取一次热榜
		return () => {
			clearInterval(timmer.current);
			controller.current.abort();
		};
	}, [hotType, getHotEventData]);

	const Column = ({ index, style }) => (
		<div key={index} style={style}>
			<a
				onDragStart={(e) => e.preventDefault()}
				style={{
					color: showColor(index),
				}}
				href={hotEventData[index].url}
				target={linkOpen}
				rel="noreferrer"
				onClick={(e) => {
					e.preventDefault();
				}}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
			>
				<Row style={{ alignItems: "center", height: "22px" }}>
					<Col flex="20px" style={{ textAlign: "center", marginRight: "12px" }}>
						{showIcon(index)}
					</Col>
					<Col
						flex="calc(100% - 118px)"
						style={{
							overflow: "hidden",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
						}}
					>
						{hotEventData[index].title}
					</Col>
					<Col flex="74px" style={{ marginLeft: "12px", textAlign: "right" }}>
						{showHot(hotEventData[index].hot)}
					</Col>
				</Row>
			</a>
		</div>
	);

	const showList = useCallback(() => {
		try {
			return (
				<Skeleton active loading={load}>
					<List
						height={height}
						itemCount={hotEventData.length}
						itemSize={30}
						layout="vertical"
						width="100%"
						outerRef={list}
					>
						{Column}
					</List>
				</Skeleton>
			);
		} catch (error) {
			setHotEventData([]);
		}
		// eslint-disable-next-line
	}, [
		load,
		hotEventData,
		showColor,
		linkOpen,
		showIcon,
		showHot,
		Column,
		height,
	]);

	useEffect(() => {
		const handleStorageChange = (e) => {
			switch (e.key) {
				case "localHotEventColor":
					setColor(e.newValue);
					break;
				default:
					break;
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	useEffect(() => {
		const localHotEventColor =
			window.localStorage.getItem("localHotEventColor");
		setColor(localHotEventColor?.length > 6 ? localHotEventColor : "#000000");
	}, [edit]);

	const showSettings = useCallback(() => {
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
					<div
						onMouseEnter={() => {
							type ? setDisabled(true) : setColor(color);
						}}
						onMouseLeave={() => {
							type ? setDisabled(false) : setColor(color);
						}}
					>
						<ColorPicker
							trigger="hover"
							value={color}
							onChange={(e) => {
								setColor(e.toHexString());
								window.sessionStorage.setItem(
									`localHotEventColor`,
									e.toHexString()
								);
							}}
						>
							<SettingTwoTone className="edit-button-style" />
						</ColorPicker>
					</div>
				</>
			);
		} else {
			return null;
		}
	}, [
		id,
		edit,
		num,
		linkList,
		setLinkList,
		item,
		type,
		color,
		setDisabled,
	]);

	const items = [
		{ key: 0, label: `微博` },
		{ key: 1, label: `抖音` },
		{ key: 2, label: `哔哩哔哩` },
		{ key: 3, label: `今日头条` },
		{ key: 4, label: `贴吧` },
		{ key: 5, label: `百度` },
		{ key: 6, label: `知乎` },
		{ key: 7, label: `少数派` },
	];

	return (
		<>
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
				className="newtabs-style-hotEvent"
				style={{
					width: "calc(100% - 32px)",
					height: "calc(100% - 32px)",
					borderRadius: showRadius(radius),
					boxShadow: showBoxShadow(),
					padding: "16px",
					backgroundColor: color,
					maxWidth: "calc(100vw)",
					overflow: "hidden",
					cursor: cursorControl(edit),
				}}
			>
				<>
					<Tabs
						activeKey={hotType}
						items={items}
						type="card"
						style={{
							color: "#fff",
							pointerEvents: pointerEventsControl(edit),
						}}
						tabBarGutter={8}
						onChange={(e) => {
							setHotType(parseInt(e));
							localStorage.setItem(`hotEvent${item.id}`, e);
						}}
						tabBarExtraContent={
							<p
								style={{
									fontWeight: "bold",
									fontSize: "18px",
									fontStyle: "italic",
									margin: "0px 0px 0px 12px",
									color: hexToRgb(color),
								}}
							>
								实时热榜
							</p>
						}
					/>
					{showList()}
				</>
			</div>
			{showSettings()}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
});

export default HotEventList;
