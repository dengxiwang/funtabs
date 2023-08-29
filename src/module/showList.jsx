import React, { memo, useEffect, useMemo, useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ReactSortable } from "react-sortablejs";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../common/funtabs.css";
import DefaultStyle from "../showStyle/defaultStyle";
import OnlyIconStyle from "../showStyle/onlyIconStyle";
import OnlyText from "../showStyle/onlyText";
import PhoneStyle from "../showStyle/phoneStyle";

const ShowList = memo((props) => {
	const {
		cardStyle,
		tabs,
		gap,
		num,
		newlinkList,
		setNewLinkList,
		gridStyle,
		drag,
		edit,
		radius,
		widthNum,
		heightNum,
		tabsActiveKey,
		setTabsActiveKey,
		linkOpen,
		fontColor,
		editFunction,
	} = props;

	const deviceType = useSelector((state) => state.deviceType.type);
	const [a, setA] = useState(0);
	const [folderDisabled, setFolderDisabled] = useState(true);
	const [click] = useState(0);

	useEffect(() => {
		setFolderDisabled(edit !== "");
	}, [edit]);

	useEffect(() => {
		setTimeout(() => {
			setA(1);
		}, 500);
	}, []);

	function showKey(a) {
		return deviceType === "PC" && a !== 0 ? newlinkList : false;
	}

	const settings = {
		dots: false,
		infinite: false,
		adaptiveHeight: true,
		touchMove: false,
		initialSlide: num,
		arrows: false,
	};

	const creatLinkList = useMemo(
		() => (item, index) =>
			(
				<div key={index}>
					<div
						id="grid-div"
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<ReactSortable
							group="1"
							id={`sortable${item.key}`}
							key={deviceType === "PC" ? "sortable" : "sortable-phone"}
							list={item.content}
							setList={(e) => {
								newlinkList[index].content = e;
								setNewLinkList([...newlinkList]);
							}}
							className="grid"
							tag="div"
							ghostClass="drag-background-class"
							style={{ ...gridStyle }}
							disabled={drag}
							animation={deviceType === "PC" ? 300 : 0}
							onStart={() => setA(0)}
							onChoose={(e) => {
								const checkItem = e.item.getAttribute("data-flip-id");
								const result = checkItem?.substring(0, 4);
								if (result !== "link") {
									setFolderDisabled(true);
								}
							}}
							onUnchoose={() => {
								setFolderDisabled(false);
							}}
							onEnd={() => {
								setTimeout(() => {
									setA(1);
								}, 10);
							}}
						>
							{item.content.map((item, index) => {
								switch (cardStyle) {
									case "defaultCard":
										return (
											<DefaultStyle
												key={item.link + item.type + item.id}
												id={index}
												edit={edit}
												item={item}
												linkList={newlinkList}
												setLinkList={setNewLinkList}
												radius={radius}
												num={num}
												gap={gap}
												widthNum={widthNum}
												heightNum={heightNum}
												tabsActiveKey={tabsActiveKey}
												setTabsActiveKey={setTabsActiveKey}
												cardStyle={cardStyle}
												linkOpen={linkOpen}
												setA={setA}
												folderDisabled={folderDisabled}
												click={click}
												editFunction={editFunction}
											/>
										);
									case "onlyIconCard":
										return (
											<OnlyIconStyle
												key={item.link + item.type + item.id}
												id={index}
												edit={edit}
												item={item}
												linkList={newlinkList}
												setLinkList={setNewLinkList}
												radius={radius}
												num={num}
												gap={gap}
												widthNum={widthNum}
												heightNum={heightNum}
												tabsActiveKey={tabsActiveKey}
												setTabsActiveKey={setTabsActiveKey}
												cardStyle={cardStyle}
												linkOpen={linkOpen}
												setA={setA}
												folderDisabled={folderDisabled}
												click={click}
												editFunction={editFunction}
											/>
										);
									case "phoneCard":
										return (
											<PhoneStyle
												key={item.link + item.type + item.id}
												id={index}
												edit={edit}
												item={item}
												linkList={newlinkList}
												setLinkList={setNewLinkList}
												radius={radius}
												num={num}
												gap={gap}
												widthNum={widthNum}
												heightNum={heightNum}
												tabsActiveKey={tabsActiveKey}
												setTabsActiveKey={setTabsActiveKey}
												cardStyle={cardStyle}
												linkOpen={linkOpen}
												setA={setA}
												folderDisabled={folderDisabled}
												click={click}
												editFunction={editFunction}
											/>
										);
									case "onlyText":
										return (
											<OnlyText
												key={item.link + item.type + item.id}
												id={index}
												edit={edit}
												item={item}
												linkList={newlinkList}
												setLinkList={setNewLinkList}
												radius={radius}
												num={num}
												gap={gap}
												widthNum={widthNum}
												heightNum={heightNum}
												tabsActiveKey={tabsActiveKey}
												setTabsActiveKey={setTabsActiveKey}
												cardStyle={cardStyle}
												linkOpen={linkOpen}
												setA={setA}
												folderDisabled={folderDisabled}
												click={click}
												fontColor={fontColor}
												editFunction={editFunction}
											/>
										);
									default:
										return null;
								}
							})}
						</ReactSortable>
					</div>
				</div>
			),
		// eslint-disable-next-line
		[newlinkList, gridStyle, drag, setNewLinkList, setA, folderDisabled]
	);

	return (
		<>
			<Flipper flipKey={showKey(a)} spring="veryGentle">
				<Slider ref={tabs} {...settings}>
					{newlinkList.map(creatLinkList)}
				</Slider>
			</Flipper>
		</>
	);
});

export default ShowList;
