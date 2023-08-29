import { Button, InputNumber, Select, Space, message } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import "../common/funtabs.css";
import "../index.css";
import AddNewCard from "./addNewCard";
import Bookmarks from "./bookmarks";
import ChangeWallpaper from "./changeWallpaper";
import TabsManager from "./tabsManager";

const Settings = React.memo((props) => {
	const {
		localData,
		model,
		num,
		widthNum,
		heightNum,
		setWidthNum,
		setHeightNum,
		linkList,
		setLinkList,
		edit,
		editFunction,
		radius,
		setRadius,
		cardStyle,
		setCardStyle,
		funtabsData,
		gap,
		setGap,
		setTabsVisibility,
		tabsActiveKey,
		setTabsActiveKey,
		url,
		setUrl,
		tabs,
		gridWidthNum,
		setGridWidthNum,
		brightness,
		setBrightness,
		blur,
		setBlur,
		oldBlur,
		oldBrightness,
		setOldBrightness,
		setOldBlur,
		fontColor,
		setFontColor,
		wallpaperType,
		setWallpaperType,
		timeArea,
		setTimeArea,
		clockAreaHeight,
		setClockAreaHeight,
	} = props;

	const CardStyleSelect = useCallback(
		() => (
			<Select
				style={{ marginRight: "12px" }}
				defaultValue={cardStyle}
				onChange={(e) => {
					setCardStyle(e);
					if (e === "defaultCard") {
						setHeightNum(64);
						setWidthNum(160);
						setRadius(12);
					} else if (e === "onlyIconCard") {
						setHeightNum(72);
						setWidthNum(72);
						setRadius(35);
					} else if (e === "phoneCard") {
						setHeightNum(88);
						setWidthNum(88);
						setRadius(16);
					} else if (e === "onlyText") {
						message.warning("此样式下部分功能将被精简");
						setHeightNum(28);
						setWidthNum(120);
						setRadius(0);
					}
				}}
				options={[
					{
						value: "defaultCard",
						label: "默认卡片",
					},
					{
						value: "onlyIconCard",
						label: "图标纯享",
					},
					{
						value: "onlyText",
						label: "文字经典",
					},
					{
						value: "phoneCard",
						label: "手机样式",
					},
				]}
			/>
		),
		[cardStyle, setCardStyle, setHeightNum, setWidthNum, setRadius]
	);

	const handleSave = useCallback(() => {
		editFunction(0);
	}, [editFunction]);

	const handleCancel = useCallback(() => {
		editFunction();
	}, [editFunction]);

	const isMountedRef = useRef(false);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	return (
		<>
			<div className="settings_option" style={{ display: edit }}>
				<Space wrap style={{ marginLeft: "1rem", marginRight: "1rem" }}>
					<p>宽度：</p>
					<InputNumber
						min={4}
						autoComplete="off"
						style={{ width: "70px" }}
						value={widthNum}
						stringMode
						onChange={(e) => {
							if (isMountedRef.current && e !== null) {
								setWidthNum(e);
							}
						}}
					/>
					<p>高度：</p>
					<InputNumber
						min={2}
						autoComplete="off"
						style={{ width: "70px" }}
						stringMode
						value={heightNum}
						onChange={(e) => {
							if (isMountedRef.current && e !== null) {
								setHeightNum(e);
							}
						}}
					/>
					<p>圆角：</p>
					<InputNumber
						min={0}
						autoComplete="off"
						style={{ width: "70px" }}
						stringMode
						value={radius}
						onChange={(e) => {
							if (isMountedRef.current && e !== null) {
								setRadius(e);
							}
						}}
					/>
					<p>间距：</p>
					<InputNumber
						min={0}
						autoComplete="off"
						style={{ width: "70px" }}
						stringMode
						value={gap}
						onChange={(e) => {
							if (isMountedRef.current && e !== null) {
								setGap(e);
							}
						}}
					/>
					<p>页面总宽：</p>
					<InputNumber
						min={0}
						autoComplete="off"
						style={{ width: "70px" }}
						stringMode
						value={gridWidthNum}
						onChange={(e) => {
							if (isMountedRef.current && e !== null) {
								setGridWidthNum(e);
							}
						}}
					/>
					<p>卡片样式：</p>
					<CardStyleSelect />
					<AddNewCard
						model={model}
						linkList={linkList}
						setLinkList={setLinkList}
						num={num}
						funtabsData={funtabsData}
						tabsActiveKey={tabsActiveKey}
						setTabsActiveKey={setTabsActiveKey}
						edit={edit}
						cardStyle={cardStyle}
					/>
					<ChangeWallpaper
						url={url}
						setUrl={setUrl}
						brightness={brightness}
						setBrightness={setBrightness}
						blur={blur}
						setBlur={setBlur}
						oldBlur={oldBlur}
						oldBrightness={oldBrightness}
						setOldBlur={setOldBlur}
						setOldBrightness={setOldBrightness}
						fontColor={fontColor}
						setFontColor={setFontColor}
						wallpaperType={wallpaperType}
						setWallpaperType={setWallpaperType}
						linkList={linkList}
						setLinkList={setLinkList}
						timeArea={timeArea}
						setTimeArea={setTimeArea}
						clockAreaHeight={clockAreaHeight}
						setClockAreaHeight={setClockAreaHeight}
					/>
					<TabsManager
						tabs={tabs}
						linkList={linkList}
						setLinkList={setLinkList}
						setTabsVisibility={setTabsVisibility}
						tabsActiveKey={tabsActiveKey}
						setTabsActiveKey={setTabsActiveKey}
						localData={localData}
						edit={edit}
					/>
					<Bookmarks
						linkList={linkList}
						num={num}
						tabsActiveKey={tabsActiveKey}
						setLinkList={setLinkList}
						setTabsActiveKey={setTabsActiveKey}
						edit={edit}
						cardStyle={cardStyle}
					/>
					<Button type="primary" onClick={handleSave}>
						保存
					</Button>
					<Button danger type="primary" onClick={handleCancel}>
						取消
					</Button>
				</Space>
			</div>
		</>
	);
});

export default Settings;
