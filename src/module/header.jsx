import {
	AppstoreFilled,
	// BellFilled,
	FormatPainterFilled,
	// GithubFilled,
	HeartFilled,
	// HomeFilled,
	InteractionFilled,
	// LockFilled,
	// QqOutlined,
	RedoOutlined,
	WarningFilled,
	// WechatOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	Divider,
	Dropdown,
	Input,
	InputNumber,
	Row,
	Space,
	Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { get } from "../common/fetch";
import "../common/funtabs.css";
import variable from "../common/variable";
import "../index.css";
import BackupData from "./backupData";
import Donate from "./donate";
import ResetData from "./resetData";
// import UpdateList from "./updateList";

const Header = (props) => {
	const {
		model,
		editFunction,
		editText,
		drag,
		setModel,
		api,
		fontColor,
		paddingTop,
		setPaddingTop,
		showClock,
		setShowClock,
		showSearch,
		setShowSearch,
		linkOpen,
		setLinkOpen,
		showSettings,
		setShowSettings,
		modelAnimationApi,
		setUrl,
		setWallpaperType,
	} = props;
	const [title, setTitle] = useState(() => {
		return document.title;
	});
	const { width } = useWindowSize();

	useEffect(() => {
		window.addEventListener("setItemEvent", function (e) {
			switch (e.key) {
				case "webTitle":
					document.title = e.newValue;
					setTitle(e.newValue);
					break;
				default:
					break;
			}
		});
		return () => {
			window.removeEventListener("setItemEvent", function () {});
		};
		// eslint-disable-next-line
	}, []);

	const moreMenu = [
		{
			key: "BackupRecovery",
			label: <BackupData />,
			icon: <InteractionFilled />,
		},
		{
			key: "recovery",
			label: <ResetData />,
			icon: <WarningFilled />,
		},
		{
			key: "donate",
			label: <Donate />,
			icon: <HeartFilled />,
		},
	];

	const [moreServe] = useState([
		{
			label: "雨云服务器",
			link: "https://www.rainyun.com/funtabs_",
			icon: "https://app.rainyun.com/favicon.ico",
		},
	]);

	function showOthers() {
		return (
			<>
				<div>
					<Input
						addonBefore={"页面标题"}
						autoComplete="off"
						addonAfter={
							<RedoOutlined
								onClick={() => {
									setTitle("趣标签页");
									document.title = "趣标签页";
									window.localStorage.setItem("webTitle", "趣标签页");
								}}
							/>
						}
						value={title}
						onChange={(e) => {
							const value = e.target.value;
							setTitle(value);
							document.title = value;
							window.localStorage.setItem("webTitle", value);
						}}
						maxLength={20}
						style={{
							width: "calc(100%)",
							marginBottom: "8px",
						}}
						allowClear
					/>
				</div>
				<Row style={{ margin: "8px 0px 12px 0px", alignItems: "center" }}>
					<Col flex="1">
						<InputNumber
							value={paddingTop}
							addonBefore="顶部高度"
							autoComplete="off"
							addonAfter="px像素"
							onChange={(e) => {
								if (e) {
									setPaddingTop(e);
									window.localStorage.setItem("paddingTop", e);
								}
							}}
						/>
					</Col>
					<Col>
						<Button
							style={{ padding: "0px 10px", marginLeft: "2px" }}
							onClick={() => {
								setPaddingTop(30);
								window.localStorage.setItem("paddingTop", 30);
							}}
						>
							<RedoOutlined />
						</Button>
					</Col>
				</Row>
				<Space wrap className="moreSettings">
					<div>
						简约模式：
						<Switch
							checkedChildren="打开"
							unCheckedChildren="关闭"
							defaultChecked={() => {
								if (model === "") {
									return false;
								} else {
									return true;
								}
							}}
							disabled={!drag}
							onChange={() => {
								const deviceWidth = document.documentElement.clientWidth;
								const moveNum = window.innerHeight * 0.1;
								if (model === "") {
									setModel("none");
									localStorage.setItem("model", "none");
									if (deviceWidth > 650) {
										modelAnimationApi.start({
											from: {
												y: 0,
											},
											to: {
												y: moveNum,
											},
										});
									}
								} else {
									setModel("");
									localStorage.setItem("model", "");
									modelAnimationApi.start({
										from: {
											y: moveNum,
										},
										to: {
											y: 0,
										},
									});
									api.start({
										from: {
											y: 20,
											opacity: 0,
											display: "none",
										},
										to: [
											{
												y: 19.99,
												opacity: 0,
												display: "",
											},
											{
												y: 0,
												opacity: 1,
												display: "",
											},
										],
										config: {
											duration: 150,
										},
									});
								}
							}}
						/>
					</div>
					<div>
						页面跳转：
						<Switch
							checkedChildren="页内"
							unCheckedChildren="页外"
							onChange={(e) => {
								if (e === false) {
									setLinkOpen("_blank");
									window.localStorage.setItem("linkOpen", "_blank");
								} else {
									setLinkOpen("_self");
									window.localStorage.setItem("linkOpen", "_self");
								}
							}}
							defaultChecked={() => {
								if (linkOpen === "_self") {
									return true;
								} else {
									return false;
								}
							}}
						/>
					</div>
					<div>
						时钟/LOGO：
						<Switch
							checkedChildren="开启"
							unCheckedChildren="关闭"
							onChange={(e) => {
								if (e === false) {
									setShowClock("none");
									localStorage.setItem("showClock", "none");
								} else {
									setShowClock("");
									localStorage.setItem("showClock", "");
								}
							}}
							defaultChecked={() => {
								if (showClock === "") {
									return true;
								} else {
									return false;
								}
							}}
						/>
					</div>
					<div>
						搜索框：
						<Switch
							checkedChildren="开启"
							unCheckedChildren="关闭"
							onChange={(e) => {
								if (e === false) {
									setShowSearch("none");
									localStorage.setItem("showSearch", "none");
								} else {
									setShowSearch("");
									localStorage.setItem("showSearch", "");
								}
							}}
							defaultChecked={() => {
								if (showSearch === "") {
									return true;
								} else {
									return false;
								}
							}}
						/>
					</div>
					<div>
						顶部菜单：
						<Switch
							checkedChildren="常驻"
							unCheckedChildren="隐藏"
							onChange={(e) => {
								if (e === false) {
									setShowSettings("autoHidden");
									localStorage.setItem("showSettings", "autoHidden");
								} else {
									setShowSettings("show");
									localStorage.setItem("showSettings", "show");
								}
							}}
							defaultChecked={() => {
								if (showSettings === "show") {
									return true;
								} else {
									return false;
								}
							}}
						/>
					</div>
				</Space>
				<Divider style={{ margin: "12px 0px" }}>
					<Donate />
				</Divider>
				<div className="more-products-grid">
					{moreServe.map((item, index) => {
						return (
							<div
								key={index}
								style={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
								}}
								onClick={() => {
									window.open(item.link, linkOpen);
								}}
							>
								<img
									src={item.icon}
									alt=""
									style={{ width: "38px", height: "38px" }}
								/>
								<p
									style={{
										fontSize: "10px",
										fontWeight: "bold",
										marginTop: "4px",
									}}
								>
									{item.label}
								</p>
							</div>
						);
					})}
				</div>
			</>
		);
	}

	function getRandomWallpaper() {
		get(variable.randomWallpaper).then((res) => {
			if (res) {
				const image = new Image();
				image.src = res;
				image.onload = function () {
					setUrl(res);
					setWallpaperType("image");
					localStorage.setItem("backgroundImage", res);
				};
			}
		});
	}

	return (
		<>
			{/* 设置按钮 */}
			<div
				className={
					showSettings === "show" ? "settings" : "settings-auto-hidden"
				}
				id="header"
				style={{
					zIndex: "11",
					justifyContent: width < 480 ? "flex-end" : "space-between",
					boxSizing: "border-box",
				}}
			>
				{width < 480 ? null : (
					<Space>
						<Button
							onClick={getRandomWallpaper}
							type="text"
							style={{ pointerEvents: "all" }}
						>
							<FormatPainterFilled
								style={{ color: fontColor, fontSize: "18px" }}
							/>
						</Button>
					</Space>
				)}
				<Space
					style={{ marginRight: "14px", pointerEvents: "auto" }}
					size={4}
					wrap
				>
					<Button
						type="text"
						style={{
							fontWeight: "bold",
							display: model,
							color: fontColor,
							marginRight: "-10px",
						}}
						onClick={editFunction}
					>
						{editText}
					</Button>
					<Button
						type="text"
						style={{
							fontWeight: "bold",
							display: model,
							marginRight: "-10px",
							color: fontColor,
						}}
						onClick={() => {
							window.open("https://star.hissac.com", linkOpen);
						}}
					>
						星空导航
					</Button>
					<Dropdown
						menu={{
							items: moreMenu,
						}}
						overlayStyle={{
							width: "200px",
							pointerEvents: "auto",
						}}
						placement="bottomRight"
						getPopupContainer={() => document.getElementById("header")}
						trigger={["hover"]}
						arrow={true}
					>
						<Button
							type="text"
							style={{
								fontWeight: "bold",
								display: model,
								marginRight: "-10px",
								color: fontColor,
							}}
						>
							关于
						</Button>
					</Dropdown>
					<div id="others">
						<Dropdown
							dropdownRender={showOthers}
							overlayStyle={{
								width: "max-content",
								maxWidth: "300px",
								pointerEvents: "auto",
								borderRadius: "8px",
								backgroundColor: "#fff",
								padding: "12px",
								boxShadow:
									"0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
							}}
							placement="bottomRight"
							getPopupContainer={() => document.getElementById("header")}
							trigger={["hover"]}
							arrow={true}
						>
							<Button
								type="text"
								style={{
									display: "flex",
									alignItems: "center",
									fontWeight: "bold",
									marginRight: "-10px",
									color: fontColor,
								}}
							>
								<AppstoreFilled style={{ fontSize: "20px" }} />
							</Button>
						</Dropdown>
					</div>
				</Space>
			</div>
		</>
	);
};

export default Header;
