import { Skeleton, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import { getClear } from "../common/fetchClear";
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import variable from "../common/variable";
import "../module/clock.css";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";

function FestivalRemind(props) {
	const {
		radius,
		edit,
		id,
		num,
		item,
		linkList,
		setLinkList,
		cardStyle,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;

	const [residueDays, setResidueDays] = useState(0);
	const [festivalName, setFestivalName] = useState("");
	const reminderRef = useRef(null);
	const [year, setYear] = useState(new Date().getFullYear());
	const [load, setLoad] = useState(true);
	const [numSize, setNumSize] = useState();

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
		onDoubleClick: (e) => {
			const x = e.clientX;
			const width = window.innerWidth;
			if (x <= width / 2) {
				changeTabs("left");
			} else {
				changeTabs("right");
			}
		},
		ref: reminderRef,
		latency: 230,
	});

	function getFestival(year) {
		getClear(`${variable.festival}`).then((data) => {
			for (let key in localStorage) {
				if (key.startsWith("festival_")) {
					localStorage.removeItem(key);
				}
			}
			const holidayData = JSON.parse(data);
			for (const key in holidayData.holiday) {
				if (holidayData.holiday.hasOwnProperty(key)) {
					holidayData.holiday[key].date = formatDate(
						holidayData.holiday[key].date
					);
				}
			}
			localStorage.setItem(`festival_${year}`, JSON.stringify(holidayData));
			getResidueDay(holidayData);
		});
	}

	//更新日期的格式
	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day} 00:00:00`;
	}

	const backSource = [
		{ name: "端午节", color: "#037c4b", icon: "/festival/duanwu.svg" },
		{ name: "元旦", color: "rgb(206 136 0)", icon: "/festival/yuandan.svg" },
		{ name: "除夕", color: "#a92d2d", icon: "/festival/chuxi.svg" },
		{ name: "初一", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "初二", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "初三", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "初四", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "初五", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "初六", color: "#a92d2d", icon: "/festival/chunjie.svg" },
		{ name: "清明节", color: "#1d9a33", icon: "/festival/qingming.svg" },
		{ name: "劳动节", color: "#1a456e", icon: "/festival/laodong.svg" },
		{ name: "中秋节", color: "#000000", icon: "/festival/zhongqiu.svg" },
		{ name: "国庆节", color: "#a92d2d", icon: "/festival/guoqing.svg" },
	];

	function getResidueDay(data) {
		const result = getNearFestival(data);
		setLoad(false);
		setFestivalName(result.name);
		if (backSource.some((item) => item.name === result.name)) {
			const item = backSource.find((item) => item.name === result.name);
			reminderRef.current.style.backgroundColor = `${item.color}`;
			reminderRef.current.style.backgroundImage = `url(${item.icon})`;
		}

		// 解决时区问题
		const targetTimestamp = Date.parse(result.date); // 将节日日期字符串转换为时间戳
		const todayTimestamp = Date.now(); // 获取当前时间的时间戳
		const timeDiff = Math.abs(targetTimestamp - todayTimestamp); // 计算时间差

		// 毫秒转换为天数
		const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		setResidueDays(daysDiff);
		if (reminderRef.current) {
			const height = reminderRef.current.offsetHeight;
			const size = (height - 78) / 1.5;
			setNumSize(size);
		}
	}

	function getNearFestival(datejson) {
		for (let key in datejson.holiday) {
			if (datejson.holiday.hasOwnProperty(key)) {
				if (datejson.holiday[key].hasOwnProperty("target")) {
					delete datejson.holiday[key];
				}
			}
		}
		// 获取今天的日期字符串，格式为：MM-DD
		const todayStr = new Date()
			.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" })
			.replace(/\//g, "-")
			.substring(5);
		if (datejson.holiday.hasOwnProperty(todayStr)) {
			// 如果今天在节假日数据中，则返回今天的节日信息
			return datejson.holiday[todayStr];
		} else {
			// 如果今天不在节假日数据中，则找到最近的未来节假日
			let futureHoliday = null;
			Object.keys(datejson.holiday).forEach((dateStr) => {
				const holidayInfo = datejson.holiday[dateStr];
				if (
					new Date(holidayInfo.date) > new Date() &&
					(!futureHoliday ||
						new Date(holidayInfo.date) < new Date(futureHoliday.date))
				) {
					futureHoliday = holidayInfo;
				}
			});
			if (futureHoliday) {
				return futureHoliday;
			} else {
				const today = new Date(); // 获取当前日期
				const endOfYear = new Date(today.getFullYear(), 11, 31); // 构造今年年底的日期，月份是从0开始计数，11表示12月

				// 解决时区问题
				const targetTimestamp = endOfYear.getTime();
				const todayTimestamp = Date.now();
				const timeDiff = targetTimestamp - todayTimestamp;

				const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 将毫秒转换为天数，并向上取整
				const nextYearHoliday = {
					name: "元旦",
					rest: daysRemaining + 1,
				};
				return nextYearHoliday;
			}
		}
	}

	useEffect(() => {
		const localData = localStorage.getItem(`festival_${year}`);
		if (localData) {
			const holidayData = JSON.parse(localData);
			for (const key in holidayData.holiday) {
				if (holidayData.holiday.hasOwnProperty(key)) {
					holidayData.holiday[key].date = formatDate(
						holidayData.holiday[key].date
					);
				}
			}
			getResidueDay(holidayData);
		} else {
			getFestival(year);
		}
		// eslint-disable-next-line
	}, [year]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			if (now.getFullYear() !== year) {
				setYear(now.getFullYear());
			}
		}, 60000); // 每隔一分钟检查一次

		return () => {
			clearInterval(intervalId);
		};
		// eslint-disable-next-line
	}, []);

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
				</>
			);
		}
	}

	return (
		<>
			<div
				ref={reminderRef} //使用ref来获得元素
				style={{
					display: "flex",
					borderRadius: showRadius(radius),
					boxShadow: showBoxShadow(),
					cursor: cursorControl(),
					width: "calc(100% - 28px)",
					height: "calc(100% - 28px)",
					padding: "14px",
					justifyContent: "space-between",
					flexDirection: "column",
					alignItems: "flex-start",
					color: "#ffffff",
					backgroundSize: "calc(50%) auto",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "calc(100% - 12px) calc(100% - 12px)",
					textShadow: "rgb(0 0 0 / 35%) 0px 0px 2px",
					backgroundColor: "#fefefe",
					overflow:'scroll'
				}}
			>
				<Skeleton
					loading={load}
					title={false}
					paragraph={{
						rows: 3,
					}}
				>
					<p style={{ fontSize: "16px", fontWeight: "bold" }}>
						距离{festivalName}还有
					</p>
					<p
						style={{ fontWeight: "bold", fontSize: `${numSize}px` }}
					>
						{residueDays}
					</p>
					<p style={{ fontSize: "22px", fontWeight: "bold" }}>天</p>
				</Skeleton>
			</div>
			{showSettings()}
			<ShowLabel cardStyle={cardStyle} item={item} edit={edit} />
		</>
	);
}

export default FestivalRemind;
