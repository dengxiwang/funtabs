import { Image, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useMemo, useRef, useState } from "react";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import "../common/funtabs.css";
import { hexToRgb } from "../common/hexToRgb";
import showBoxShadow from "../common/showBoxShadow";
import DeleteCard from "./deleteCard";
import EditCard from "./editCard";
import ShowLabel from "./showLabel";

const calculateShowSize = (size, heightNum) => {
	switch (size) {
		case 11:
		case 12:
		case 21:
		case "11":
		case "12":
		case "21":
			return `calc(${heightNum}px - 20px)`;
		case 22:
		case "22":
			return `calc(2 * ${heightNum}px - 20px)`;
		default:
			return "";
	}
};

const LinkCard = (props) => {
	const {
		id,
		edit,
		item,
		linkList,
		num,
		setLinkList,
		radius,
		heightNum,
		cardStyle,
		linkOpen,
		click,
		setDisabled,
		fontColor,
		tabsActiveKey,
		setTabsActiveKey,
		type,
	} = props;

	const ellipsis = true;
	const [backgroundColor, setBackgroundColor] = useState(
		item.backgroundColor || "#ffffff"
	);
	const showSize = useMemo(
		() => calculateShowSize(item.size, heightNum),
		[item.size, heightNum]
	);

	useEffect(() => {
		setBackgroundColor(item.backgroundColor || "#ffffff");
		// eslint-disable-next-line
	}, [edit]);

	const imgStyle = useMemo(
		() => ({
			width: showSize,
			height: showSize,
			margin: "0px 10px 0px 0px",
			zIndex: 1,
		}),
		[showSize]
	);

	const imgStyle2 = useMemo(
		() => ({
			width: showSize,
			height: showSize,
			margin: "0px 0px 0px 0px",
			zIndex: 1,
		}),
		[showSize]
	);

	const shadowStyle = {
		boxShadow: showBoxShadow(),
	};

	const handleClick = () => {
		if (edit === "" || click === 1) {
			return;
		} else {
			window.open(`${item.link}`, linkOpen);
		}
	};

	const showSettings = useMemo(
		() =>
			edit === "" && (
				<>
					<DeleteCard
						linkList={linkList}
						id={id}
						item={item}
						num={num}
						setLinkList={setLinkList}
						cardStyle={cardStyle}
					/>
					<EditCard
						id={id}
						num={num}
						linkList={linkList}
						setLinkList={setLinkList}
						setBackgroundColor={setBackgroundColor}
						setDisabled={setDisabled}
						cardStyle={cardStyle}
					/>
				</>
			),
		[
			edit,
			linkList,
			id,
			item,
			num,
			setLinkList,
			setBackgroundColor,
			setDisabled,
			cardStyle,
		]
	);

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
			handleClick();
		},
		ref: doubleClickRef,
		latency: 230,
	});

	const howToShow = useMemo(() => {
		switch (cardStyle) {
			case "defaultCard":
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
						onDragStart={(e) => {
							e.preventDefault();
						}}
						style={{
							display: "flex",
							padding: "10px",
							borderRadius: `${radius}px`,
							position: "relative",
							overflow: "hidden",
							width: "calc(100% - 20px)",
							height: "calc(100% - 20px)",
							background: backgroundColor,
							alignItems: "center",
							cursor: cursorControl(edit),
							...shadowStyle,
						}}
						rel="noreferrer"
					>
						<Image
							style={imgStyle}
							src={item.icon}
							preview={false}
							alt=""
							fallback="./icons/icon_error.svg"
						/>
						<div
							style={{
								display: "flex",
								marginBottom: "-14px",
								alignItems: "center",
							}}
						>
							<Paragraph
								style={{
									fontWeight: "bold",
									color: hexToRgb(backgroundColor),
									zIndex: 1,
								}}
								ellipsis={
									ellipsis
										? {
												rows: 2,
										  }
										: false
								}
							>
								{item.label}
							</Paragraph>
						</div>
						<img
							src={item.icon}
							alt=""
							style={{
								position: "absolute",
								height: "100%",
								top: "0px",
								right: "-10px",
								opacity: 0.1,
								transform: "rotate(-30deg)",
							}}
						/>
					</div>
				);
			case "onlyIconCard":
				return (
					<div
						ref={doubleClickRef}
						onDoubleClick={(e) => {
							if (type !== "folder") {
								const x = e.clientX;
								const width = window.innerWidth;
								if (x <= width / 2) {
									changeTabs("left");
								} else {
									changeTabs("right");
								}
							}
						}}
						onDragStart={(e) => {
							e.preventDefault();
						}}
						className={`grid-item${item.size}`}
						style={{
							borderRadius: `${radius}px`,
							padding: "10px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							overflow: "hidden",
							width: "calc(100% - 20px)",
							height: "calc(100% - 20px)",
							background: backgroundColor,
							cursor: cursorControl(edit),
							...shadowStyle,
						}}
						rel="noreferrer"
					>
						<Image
							alt=""
							style={imgStyle2}
							src={item.icon}
							preview={false}
							fallback="./icons/icon_error.svg"
						/>
					</div>
				);
			case "phoneCard":
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
						onDragStart={(e) => {
							e.preventDefault();
						}}
						style={{
							display: "flex",
							height: `calc(100% - 22px)`,
							width: "100%",
							justifyContent: "center",
						}}
					>
						<div
							onClick={handleClick}
							rel="noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								overflow: "hidden",
								borderRadius: `${radius}px`,
								backgroundColor: backgroundColor,
								width: `calc(100% - 22px)`,
								height: `calc(100%)`,
								cursor: cursorControl(edit),
								...shadowStyle,
							}}
						>
							<Image
								style={{
									width: showSize,
									height: showSize,
									padding: "8px",
								}}
								alt=""
								src={item.icon}
								preview={false}
								fallback="./icons/icon_error.svg"
							/>
						</div>
					</div>
				);
			case "onlyText":
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
						onDragStart={(e) => {
							e.preventDefault();
						}}
						style={{
							display: "flex",
							height: `calc(100%)`,
							width: "100%",
							justifyContent: "center",
						}}
					>
						<div
							onClick={handleClick}
							rel="noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								overflow: "hidden",
								width: `calc(100%)`,
								height: `calc(100%)`,
								cursor: cursorControl(edit),
								...shadowStyle,
							}}
						>
							<p
								className="onlyTextStyle"
								style={{
									fontWeight: "bold",
									color: fontColor,
									marginBottom: "0px",
								}}
							>
								{item.label}
							</p>
						</div>
					</div>
				);
			default:
				return null;
		}
		// eslint-disable-next-line
	}, [
		cardStyle,
		backgroundColor,
		click,
		cursorControl,
		edit,
		fontColor,
		handleClick,
		hexToRgb,
		imgStyle,
		imgStyle2,
		item.icon,
		item.label,
		item.link,
		linkOpen,
		ellipsis,
		num,
		radius,
		shadowStyle,
		showSize,
	]);

	return (
		<>
			{showSettings}
			{howToShow}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
};

export default LinkCard;
