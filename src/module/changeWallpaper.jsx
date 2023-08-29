import {
	BgColorsOutlined,
	CloudUploadOutlined,
	ExclamationCircleOutlined,
	QuestionCircleOutlined,
	RedoOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	ColorPicker,
	Image,
	Input,
	InputNumber,
	Modal,
	Radio,
	Row,
	Slider,
	Space,
	Switch,
	Tabs,
	Tag,
	Tooltip,
	Upload,
	message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateEffect } from "react-use";
import { get, post } from "../common/fetch";
import "../common/funtabs.css";
import { hexToRgb } from "../common/hexToRgb";
import variable from "../common/variable";
import "../index.css";
import {
	setSearchAutoFocus,
	setSearchBackgroundColor,
	setSearchBlurNumber,
	setSearchBlurOpen,
	setSearchFontColor,
	setSearchRadius,
	setTimeSeconds,
} from "../redux/slice/moreSettings";
import { funtabsData } from "./data";

export default function ChangeWallpaper(props) {
	const {
		url,
		setUrl,
		brightness,
		setBrightness,
		blur,
		setBlur,
		oldBlur,
		oldBrightness,
		setOldBlur,
		setOldBrightness,
		type,
		fontColor,
		setFontColor,
		wallpaperType,
		setWallpaperType,
		linkList,
		setLinkList,
		timeArea,
		setTimeArea,
		clockAreaHeight,
		setClockAreaHeight,
	} = props;
	const deviceType = useSelector((state) => state.deviceType.type);
	const [inputColor, setInputColor] = useState(fontColor);
	const [inputContent, setInputContent] = useState(url);
	const [previewImage, setPreviewImage] = useState(inputContent);
	const [opened, setOpened] = useState(false);
	const [newBrightness, setNewBrightness] = useState(brightness);
	const [newBlur, setNewBlur] = useState(blur);
	const [checkType, setCheckType] = useState(wallpaperType);
	const [timeAreaCheck, setTimeAreaCheck] = useState(timeArea);
	const [clockAreaHeightNum, setClockAreaHeightNum] = useState(clockAreaHeight);
	const localBoxShadow = window.localStorage.getItem("boxShadow");
	const localBoxShadowOpen = window.localStorage.getItem("boxShadowOpen");
	const [boxShadow, setBoxShadow] = useState(() => {
		try {
			if (localBoxShadow) {
				return localBoxShadow;
			} else {
				return "";
			}
		} catch (error) {
			return "";
		}
	});
	const [boxShadowOpen, setBoxShadowOpen] = useState(() => {
		try {
			if (localBoxShadowOpen) {
				return localBoxShadowOpen;
			} else {
				return "false";
			}
		} catch (error) {
			return "false";
		}
	});
	const [logoUrl, setLogoUrl] = useState(
		window.localStorage.getItem("logoUrl")
			? window.localStorage.getItem("logoUrl")
			: "/icons/logo_white.svg"
	);

	//获取全局状态数据
	const searchBackgroundColor = useSelector(
		(state) => state.moreSettings.searchBackgroundColor
	);
	const searchBlurOpen = useSelector(
		(state) => state.moreSettings.searchBlurOpen
	);
	const searchBlurNumber = useSelector(
		(state) => state.moreSettings.searchBlurNumber
	);
	const searchRadius = useSelector((state) => state.moreSettings.searchRadius);
	const searchFontColor = useSelector(
		(state) => state.moreSettings.searchFontColor
	);
	const timeSeconds = useSelector((state) => state.moreSettings.timeSeconds);
	const searchAutoFocus = useSelector(
		(state) => state.moreSettings.searchAutoFocus
	);

	//定义弹窗中的新值
	const [newSearchBackgroundColor, setNewSearchBackgroundColor] = useState(
		searchBackgroundColor
	);
	const [newSearchBlurOpen, setNewSearchBlurOpen] = useState(searchBlurOpen);
	const [newSearchBlurNumber, setNewSearchBlurNumber] =
		useState(searchBlurNumber);
	const [newSearchRadius, setNewSearchRadius] = useState(searchRadius);
	const [newSearchFontColor, setNewSearchFontColor] = useState(searchFontColor);
	const [newTimeSeconds, setNewTimeSeconds] = useState(timeSeconds);
	const [newSearchAutoFocus, setNewSearchAutoFocus] = useState(searchAutoFocus);

	//定义全局状态管理方法
	const dispatch = useDispatch();

	useUpdateEffect(() => {
		setInputContent(url);
	}, [url]);

	useEffect(() => {
		window.addEventListener("setItemEvent", function (e) {
			switch (e.key) {
				case "boxShadowOpen": {
					setBoxShadowOpen(e.newValue);
					break;
				}
				case "boxShadow": {
					setBoxShadow(e.newValue);
					break;
				}
				case "logoUrl": {
					setLogoUrl(e.newValue);
					break;
				}
				case "fontColor":
					setInputColor(e.newValue);
					break;
				case "wallpaperType":
					setCheckType(e.newValue);
					break;
				case "blur":
					setNewBlur(parseInt(e.newValue));
					break;
				case "brightness":
					setNewBrightness(parseInt(e.newValue));
					break;
				case "timeArea":
					setTimeAreaCheck(e.newValue);
					break;
				case "searchBackgroundColor":
					setNewSearchBackgroundColor(e.newValue);
					break;
				case "searchBlurNumber":
					setNewSearchBlurNumber(e.newValue);
					break;
				case "searchBlurOpen":
					setNewSearchBlurOpen(e.newValue);
					break;
				case "searchRadius":
					setNewSearchRadius(e.newValue);
					break;
				case "searchFontColor":
					setNewSearchFontColor(e.newValue);
					break;
				case "timeSeconds":
					setNewTimeSeconds(e.newValue);
					break;
				case "searchAutoFocus":
					setNewSearchAutoFocus(e.newValue);
					break;
				default:
					break;
			}
		});
		return window.removeEventListener("setItemEvent", function (e) {});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setInputContent(url);
		setPreviewImage(url);
		setBlur(oldBlur);
		setBrightness(oldBrightness);
		setNewBlur(oldBlur);
		setNewBrightness(oldBrightness);
		setInputColor(fontColor);
		setCheckType(wallpaperType);
		setBoxShadow(localBoxShadow);
		setBoxShadowOpen(localBoxShadowOpen);
		setTimeAreaCheck(timeArea);
		setClockAreaHeightNum(clockAreaHeight);
		setNewSearchBackgroundColor(searchBackgroundColor);
		setNewSearchBlurNumber(searchBlurNumber);
		setNewSearchBlurOpen(searchBlurOpen);
		setNewSearchRadius(searchRadius);
		setNewSearchFontColor(searchFontColor);
		setNewTimeSeconds(timeSeconds);
		setNewSearchAutoFocus(searchAutoFocus);
		// eslint-disable-next-line
	}, [opened]);

	function openChangeModal() {
		setOpened(true);
	}

	function cancelModal() {
		setOpened(false);
	}

	function okModal() {
		setOpened(false);
		message.success("设置成功");
		setUrl(inputContent);
		setFontColor(inputColor);
		setBrightness(newBrightness);
		setBlur(newBlur);
		setOldBlur(newBlur);
		setOldBrightness(newBrightness);
		setWallpaperType(checkType);
		setLinkList([...linkList]);
		setTimeArea(timeAreaCheck);
		setClockAreaHeight(clockAreaHeightNum);
		dispatch(setSearchBackgroundColor(newSearchBackgroundColor));
		dispatch(setSearchBlurNumber(newSearchBlurNumber));
		dispatch(setSearchBlurOpen(newSearchBlurOpen));
		dispatch(setSearchRadius(newSearchRadius));
		dispatch(setSearchFontColor(newSearchFontColor));
		dispatch(setTimeSeconds(newTimeSeconds));
		dispatch(setSearchAutoFocus(newSearchAutoFocus));
		localStorage.setItem("clockAreaHeight", clockAreaHeightNum);
		localStorage.setItem("logoUrl", logoUrl);
		localStorage.setItem("timeArea", timeAreaCheck);
		localStorage.setItem("wallpaperType", checkType);
		localStorage.setItem("brightness", newBrightness);
		localStorage.setItem("blur", newBlur);
		localStorage.setItem("backgroundImage", inputContent);
		localStorage.setItem("fontColor", inputColor);
		localStorage.setItem("boxShadow", boxShadow);
		localStorage.setItem("boxShadowOpen", boxShadowOpen);
		const searchSettings = {
			searchBackgroundColor: newSearchBackgroundColor,
			searchBlurNumber: newSearchBlurNumber,
			searchBlurOpen: newSearchBlurOpen,
			searchRadius: newSearchRadius,
			searchFontColor: newSearchFontColor,
			timeSeconds: newTimeSeconds,
			searchAutoFocus: newSearchAutoFocus,
		};
		Object.entries(searchSettings).forEach(([key, value]) =>
			localStorage.setItem(key, value)
		);
	}

	function showType() {
		if (type === 1) {
			return <p onClick={openChangeModal}>壁纸主题</p>;
		} else {
			return (
				<Button type="primary" onClick={openChangeModal}>
					壁纸主题
				</Button>
			);
		}
	}

	function wallpaperPreview() {
		if (checkType === "image") {
			return (
				<>
					<Image
						src={previewImage}
						style={{
							borderRadius: "6px",
							maxHeight: 144,
							width: "auto",
							maxWidth: "100%",
							filter: `brightness(${newBrightness}%)`,
							boxShadow: "0px 0px 0px 1px #d9d9d9",
						}}
						preview={{
							mask: "预览大图",
							maskClassName: "maskStyle",
							getContainer: () => document.body,
						}}
						fallback="data:image/png;base64,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"
					/>
				</>
			);
		} else if (checkType === "video") {
			return (
				<>
					<video
						autoPlay
						loop
						muted
						src={`${inputContent}`}
						style={{
							borderRadius: "6px",
							maxHeight: 144,
							overflow: "hidden",
							objectFit: "cover",
							width: "calc(100% - 2px)",
							filter: `brightness(${newBrightness}%)`,
							boxShadow: "0px 0px 0px 1px #f2f2f290",
						}}
					/>
				</>
			);
		} else if (checkType === "color") {
			return (
				<>
					<div
						style={{
							backgroundColor: `${inputContent}`,
							borderRadius: "6px",
							maxHeight: 144,
							height: "144px",
							maxWidth: "200px",
							overflow: "hidden",
							objectFit: "cover",
							width: "calc(100% - 2px)",
							filter: `brightness(${newBrightness}%)`,
							boxShadow: "0px 0px 0px 1px #d9d9d9",
						}}
					/>
				</>
			);
		}
	}

	function uploadAccept() {
		if (checkType === "image") {
			return ".png , .jpg , .jpeg, .webp";
		} else if (checkType === "video") {
			return ".mp4";
		}
	}

	function showButton() {
		const token = window.localStorage.getItem("token");
		if (checkType !== "color") {
			if (token) {
				return (
					<Upload
						id="uploadBackgroundImage"
						accept={uploadAccept()}
						maxCount={1}
						beforeUpload={(file) => {
							if (file.size / 1024 / 1024 > 5) {
								message.error("文件大小不能超过 5MB！");
								return false;
							}
							const formData = new FormData();
							formData.append("file", file);
							const token = window.localStorage.getItem("token");
							post(`${variable.uploadImages}`, formData, token).then((res) => {
								setInputContent(res.url);
								setPreviewImage(res.url);
							});
							//将图片转为base64使用
							// const isLt2M = file.size / 1024 / 1024 < 4;
							// if (!isLt2M) {
							//     message.error('文件大小必须小于 4MB!');
							// } else {
							//     var reader = new FileReader();
							//     reader.readAsDataURL(file);
							//     reader.onloadend = function () {
							//         setInputContent(reader.result)
							//         setPreviewImage(reader.result)
							//         getDomainColor(reader.result).then(color => {
							//             const mainColor = rgbToHex(color)
							//             setInputColor(hexToRgb(mainColor))
							//         })
							//     }
							// }
							return false;
						}}
						showUploadList={false}
					>
						<Tooltip title="上传壁纸">
							<Button
								style={{ width: "46px" }}
								icon={<CloudUploadOutlined />}
								onClick={() => {
									if (checkType === "image") {
										message.warning("上传图片过大会造成加载缓慢");
									} else if (checkType === "video") {
										message.warning("只可选择mp4视频类型文件");
									}
								}}
							/>
						</Tooltip>
					</Upload>
				);
			} else {
				return (
					<Tooltip title="上传壁纸">
						<Button
							style={{ width: "46px" }}
							icon={<CloudUploadOutlined />}
							onClick={() => {
								message.error("请登录后使用上传壁纸功能");
							}}
						/>
					</Tooltip>
				);
			}
		} else {
			return (
				<ColorPicker
					trigger="hover"
					value={inputContent}
					onChange={(e) => {
						setInputContent(e.toHexString());
					}}
				/>
			);
		}
	}

	function showShadowInput() {
		if (boxShadowOpen === "true") {
			return (
				<Input
					placeholder="卡片阴影配置，如“0px 0px 0px 1px #d9d9d9”"
					value={boxShadow}
					autoComplete="off"
					onChange={(e) => {
						setBoxShadow(e.target.value.trim());
					}}
				/>
			);
		}
	}

	function showTag() {
		if (boxShadowOpen === "true") {
			return (
				<Row style={{ marginBottom: "8px", alignItems: "center" }}>
					<div
						style={{
							borderRadius: "8px",
							border: "1px solid #91caff",
							backgroundColor: "#e6f4ff",
							color: "#1677ff",
							fontSize: "8px",
							padding: "2px",
							width: "100%",
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						<span>
							<ExclamationCircleOutlined
								style={{ fontSize: "12px", marginRight: "4px" }}
							/>
							阴影格式：x偏移像素 + y偏移像素 + 模糊像素大小 + 阴影大小 +
							阴影颜色
						</span>
					</div>
				</Row>
			);
		}
	}

	function showLogoSettings() {
		return timeAreaCheck === "logo" ? (
			<>
				<Row style={{ marginBottom: "12px", alignItems: "center" }}>
					<Col flex="78px">图片地址：</Col>
					<Col flex="1">
						<Input
							placeholder="在此输入图片的url地址"
							value={logoUrl}
							autoComplete="off"
							style={{ width: "100%" }}
							onBlur={(e) => {
								setLogoUrl(e.target.value);
							}}
							onChange={(e) => {
								setLogoUrl(e.target.value);
							}}
						/>
					</Col>
					<Col>
						<Upload
							id="uploadLogoImage"
							accept=".png, .jpg, .jpeg, .svg"
							maxCount={1}
							beforeUpload={(file) => {
								const isLt400K = file.size / 1024 / 1024 < 0.4;
								if (!isLt400K) {
									message.error("文件大小必须小于 400KB!");
								} else {
									// var reader = new FileReader();
									// reader.readAsDataURL(file);
									// reader.onloadend = function () {
									//     setLogoUrl(reader.result)
									// }
									const formData = new FormData();
									formData.append("file", file);
									const token = window.localStorage.getItem("token");
									if (token) {
										post(`${variable.uploadImages}`, formData, token).then(
											(res) => {
												setLogoUrl(res.url);
											}
										);
									} else {
										message.error("用户未登录，更换图标失败");
									}
								}
								return false;
							}}
							showUploadList={false}
						>
							<Tooltip title="上传壁纸">
								<Button
									style={{ width: "46px" }}
									icon={<CloudUploadOutlined />}
								/>
							</Tooltip>
						</Upload>
						<Tooltip title="恢复默认LOGO">
							<Button
								danger
								onClick={() => {
									setLogoUrl("/icons/logo_white.svg");
								}}
							>
								<RedoOutlined />
							</Button>
						</Tooltip>
					</Col>
				</Row>
				<Row style={{ margin: "14px 0px" }}>
					<Col flex="78px">图片预览：</Col>
					<Col flex="1">
						<Image
							src={logoUrl}
							height={100}
							style={{
								borderRadius: "6px",
								backgroundColor: "#f0f0f0",
								width: "auto",
							}}
							preview={{
								mask: "预览大图",
								maskClassName: "maskStyle",
								getContainer: () => document.body,
							}}
							fallback="data:image/png;base64,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"
						/>
					</Col>
				</Row>
			</>
		) : null;
	}

	function getRandomWallpaper() {
		get(variable.randomWallpaper).then((res) => {
			if (res) {
				setInputContent(res);
				setPreviewImage(res);
			}
		});
	}

	const wallpaperItems = [
		{
			label: "壁纸",
			key: "wallpaperSet",
			children: (
				<>
					<Row style={{ marginBottom: "12px", alignItems: "center" }}>
						<Col flex="78px">壁纸地址：</Col>
						<Col flex="1">
							<Input
								placeholder="在此输入图片的url地址"
								value={inputContent}
								autoComplete="off"
								style={{ width: "100%" }}
								onBlur={(e) => {
									setPreviewImage(e.target.value);
								}}
								onChange={(e) => {
									setInputContent(e.target.value);
								}}
							/>
						</Col>
						<Col style={{ display: "flex", flexDirection: "row" }}>
							{showButton()}
							<Tooltip title="恢复默认壁纸">
								<Button
									danger
									onClick={() => {
										setInputContent(funtabsData.backgroundImage);
										setPreviewImage(funtabsData.backgroundImage);
										setInputColor("#ffffff");
										setCheckType("image");
									}}
								>
									<RedoOutlined />
								</Button>
							</Tooltip>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "8px",
							alignItems: "stretch",
							lineHeight: "32px",
						}}
					>
						<Col flex="78px">壁纸类型：</Col>
						<Col
							flex="1"
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<Radio.Group
								value={checkType}
								onChange={(e) => {
									const type = e.target.value;
									if (deviceType !== "PC") {
										if (type === "video") {
											message.error("仅PC电脑端可设置动态壁纸");
										} else {
											if (type !== "color") {
												message.warning(
													"地址栏只可使用没有跨域限制的资源地址或自行上传资源"
												);
												setInputContent("");
											} else {
												message.warning(
													"地址栏可输入相应的色彩代码，支持RGB或十六进制"
												);
												setInputContent("#1b7c87");
											}
											setCheckType(type);
										}
									} else {
										if (type !== "color") {
											message.warning(
												"地址栏只可使用没有跨域限制的资源地址或自行上传资源"
											);
											setInputContent("");
										} else {
											message.warning(
												"地址栏可输入相应的色彩代码，支持RGB或十六进制"
											);
											setInputContent("#1b7c87");
										}
										setCheckType(type);
									}
								}}
							>
								<Radio value={"image"}>静态</Radio>
								<Radio value={"video"}>动态</Radio>
								<Radio value={"color"}>纯色</Radio>
							</Radio.Group>
							{checkType === "image" ? (
								<Button
									type="link"
									style={{ padding: "0px" }}
									onClick={getRandomWallpaper}
								>
									获取随机壁纸
								</Button>
							) : null}
						</Col>
					</Row>
					<Row style={{ marginBottom: "8px", alignItems: "center" }}>
						<Col flex="78px">壁纸亮度：</Col>
						<Col flex="1">
							<Slider
								defaultValue={newBrightness}
								onAfterChange={(e) => {
									setBrightness(e);
								}}
								onChange={(e) => setNewBrightness(e)}
								tooltip={{
									formatter: null,
								}}
							/>
						</Col>
						<Col style={{ marginLeft: "8px" }}>{`${newBrightness}%`}</Col>
					</Row>
					<Row style={{ marginBottom: "16px", alignItems: "center" }}>
						<Col flex="78px">壁纸模糊：</Col>
						<Col flex="1">
							<Slider
								defaultValue={blur}
								onAfterChange={(e) => {
									setBlur(e);
								}}
								onChange={(e) => {
									setNewBlur(e);
								}}
								tooltip={{
									formatter: null,
								}}
							/>
						</Col>
						<Col style={{ marginLeft: "8px" }}>{`${newBlur}%`}</Col>
					</Row>
					<Row style={{ marginBottom: "0px", alignItems: "stretch" }}>
						<Col flex="78px">预览壁纸：</Col>
						<Col flex="1">{wallpaperPreview()}</Col>
					</Row>
				</>
			),
		},
		{
			label: "搜索栏",
			key: "searchBar",
			children: (
				<>
					<Row
						style={{ alignItems: "center", marginBottom: "16px", gap: "4px" }}
					>
						<Col>背景颜色及透明度：</Col>
						<Col style={{ display: "flex", gap: "2px" }}>
							<ColorPicker
								trigger="hover"
								showText
								value={newSearchBackgroundColor}
								onChange={(e) => {
									setNewSearchBackgroundColor(e.toHexString());
								}}
							/>
							<Tooltip title="恢复默认颜色">
								<Button
									icon={<RedoOutlined />}
									danger
									onClick={() => {
										setNewSearchBackgroundColor("#ffffff");
									}}
								/>
							</Tooltip>
						</Col>
					</Row>
					<Row
						style={{ alignItems: "center", marginBottom: "16px", gap: "4px" }}
					>
						<Col>搜索区域字体颜色：</Col>
						<Col style={{ display: "flex", gap: "2px" }}>
							<Radio.Group
								value={newSearchFontColor}
								onChange={(e) => {
									setNewSearchFontColor(e.target.value);
								}}
							>
								<Radio value={"#000000"}>黑色</Radio>
								<Radio value={"#ffffff"}>白色</Radio>
							</Radio.Group>
						</Col>
					</Row>
					<Row
						style={{ alignItems: "center", marginBottom: "13px", gap: "4px" }}
					>
						<Col>毛玻璃模糊：</Col>
						<Col style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
							<Switch
								defaultChecked={newSearchBlurOpen}
								onChange={setNewSearchBlurOpen}
							/>
							<Tag icon={<QuestionCircleOutlined />}>
								毛玻璃仅在背景透明度存在时生效
							</Tag>
						</Col>
					</Row>
					{newSearchBlurOpen ? (
						<Row
							style={{ alignItems: "center", marginBottom: "12px", gap: "4px" }}
						>
							<Col>模糊程度：</Col>
							<Col>
								<InputNumber
									value={newSearchBlurNumber}
									onChange={(e) => {
										setNewSearchBlurNumber(e);
									}}
									style={{ maxWidth: "130px" }}
									addonAfter="px"
								/>
							</Col>
						</Row>
					) : null}
					<Row
						style={{ alignItems: "center", marginBottom: "12px", gap: "4px" }}
					>
						<Col>圆角：</Col>
						<Col style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
							<InputNumber
								style={{ maxWidth: "130px" }}
								value={newSearchRadius}
								onChange={(e) => {
									setNewSearchRadius(e);
								}}
								addonAfter="px"
							/>
						</Col>
					</Row>
					<Row
						style={{
							alignItems: "center",
							margin: "4px 0px 16px 0px",
							gap: "4px",
						}}
					>
						<Col>首次打开页面输入框自动聚焦：</Col>
						<Col style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
							<Switch
								checked={newSearchAutoFocus}
								onChange={setNewSearchAutoFocus}
							/>
						</Col>
					</Row>
				</>
			),
		},
		{
			label: "时间区域",
			key: "timeArea",
			children: (
				<>
					<Row
						style={{
							marginBottom: "10px",
							alignItems: "center",
							minHeight: "32px",
						}}
					>
						<Col flex="78px">时间区域：</Col>
						<Col>
							<Radio.Group
								value={timeAreaCheck}
								onChange={(e) => {
									setTimeAreaCheck(e.target.value);
								}}
							>
								<Radio value={"time"}>时间</Radio>
								<Radio value={"logo"}>图片LOGO</Radio>
							</Radio.Group>
						</Col>
					</Row>
					{timeAreaCheck === "time" ? (
						<>
							<Row
								style={{
									marginBottom: "10px",
									alignItems: "center",
									minHeight: "32px",
								}}
							>
								<Col>秒钟：</Col>
								<Col>
									<Switch
										checked={newTimeSeconds}
										onChange={(e) => {
											setNewTimeSeconds(e);
										}}
									/>
								</Col>
							</Row>
						</>
					) : null}
					{showLogoSettings()}
					<Row
						style={{
							marginBottom: "16px",
							alignItems: "center",
							minHeight: "32px",
						}}
					>
						<Col flex="78px">区域高度：</Col>
						<Col
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<InputNumber
								autoComplete="off"
								min={100}
								value={clockAreaHeightNum}
								onChange={(e) => {
									setClockAreaHeightNum(e);
								}}
								style={{ width: "115px" }}
								addonAfter={"px"}
							/>
							<Tooltip title="恢复默认高度">
								<Button
									danger
									onClick={() => {
										setClockAreaHeightNum(188);
									}}
								>
									<RedoOutlined />
								</Button>
							</Tooltip>
						</Col>
					</Row>
				</>
			),
		},

		{
			label: "字体其他",
			key: "fontOther",
			children: (
				<>
					<Row style={{ marginBottom: "10px", alignItems: "center" }}>
						<Col flex="78px">字体颜色：</Col>
						<Col flex="1" style={{ display: "flex", flexDirection: "row" }}>
							<Input
								placeholder="更改字体颜色"
								autoComplete="off"
								value={inputColor}
							/>
							<Tooltip title="此处预览颜色">
								<Button
									style={{
										backgroundColor: hexToRgb(inputColor),
										color: inputColor,
										fontWeight: "bold",
									}}
								>
									效果预览
								</Button>
							</Tooltip>
						</Col>
						<Col>
							<ColorPicker
								trigger="hover"
								value={inputColor}
								onChange={(e) => {
									setInputColor(e.toHexString());
								}}
							>
								<Button>
									<BgColorsOutlined />
								</Button>
							</ColorPicker>
							<Tooltip title="恢复默认颜色">
								<Button
									danger
									onClick={() => {
										setInputColor("#ffffff");
									}}
								>
									<RedoOutlined />
								</Button>
							</Tooltip>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "6px",
							alignItems: "center",
							height: "32px",
						}}
					>
						<Col flex="78px">卡片阴影：</Col>
						<Col
							flex="1"
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Switch
								style={{
									marginRight: "4px",
								}}
								defaultChecked={() => {
									if (boxShadowOpen === "true") {
										return true;
									} else {
										return false;
									}
								}}
								onChange={(e) => {
									const type = e.toString();
									setBoxShadowOpen(type);
									if (
										type === "true" &&
										(boxShadow === "" || boxShadow === "null")
									) {
										setBoxShadow("0px 0px 0px 1px #d9d9d9");
									}
								}}
							/>
							{showShadowInput()}
						</Col>
					</Row>
					{showTag()}
				</>
			),
		},
		// {
		// 	label: "推荐壁纸",
		// 	key: "recommendWallpaper",
		// 	children: (
		// 		<>
		// 			<OfficalWallpaper
		// 				url={inputContent}
		// 				setUrl={setInputContent}
		// 				setCheckType={setCheckType}
		// 				setFontColor={setInputColor}
		// 				setPreviewImage={setPreviewImage}
		// 			/>
		// 		</>
		// 	),
		// },
	];

	return (
		<>
			{showType()}
			{opened ? (
				<Modal
					title="壁纸主题设置"
					open={opened}
					onCancel={cancelModal}
					footer={null}
					bodyStyle={{
						display: "flex",
						flexDirection: "column",
					}}
					style={{
						maxHeight: "100%",
					}}
					destroyOnClose
					focusTriggerAfterClose={false}
				>
					<Tabs
						items={wallpaperItems}
						style={{
							height: "382px",
						}}
					/>
					<Space style={{ justifyContent: "flex-end", marginTop: "12px" }} wrap>
						<Button type="default" onClick={cancelModal}>
							取消
						</Button>
						<Button type="primary" onClick={okModal}>
							确认
						</Button>
					</Space>
				</Modal>
			) : null}
		</>
	);
}
