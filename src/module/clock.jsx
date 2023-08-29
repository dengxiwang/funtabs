import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./clock.css";

const Clock = ({
	fontColor,
	clockAreaHeight,
	model,
	setModel,
	api,
	modelAnimationApi,
}) => {
	const timerRef = useRef();
	const [time, setTime] = useState({
		hour: "",
		minutes: "",
		seconds: "",
		year: "",
		month: "",
		day: "",
		weekday: "",
	});
	const timeSeconds = useSelector((state) => state.moreSettings.timeSeconds);

	const weekdayMap = useMemo(
		() => ({
			1: "一",
			2: "二",
			3: "三",
			4: "四",
			5: "五",
			6: "六",
			0: "日",
		}),
		[]
	);

	const setHeight = useMemo(
		() => () =>
			document.body.clientWidth < 650 ? clockAreaHeight / 2 : clockAreaHeight,
		[clockAreaHeight]
	);
	const setHeight2 = useMemo(
		() => () =>
			document.body.clientWidth < 650
				? clockAreaHeight / 4
				: clockAreaHeight / 2,
		[clockAreaHeight]
	);

	const getNewDate = () => {
		const time = new Date();
		const year = time.getFullYear();
		const month = time.getMonth() + 1;
		const day = time.getDate();
		const weekday = weekdayMap[time.getDay()];
		const hour = ("0" + time.getHours()).slice(-2);
		const minutes = ("0" + time.getMinutes()).slice(-2);
		const seconds = ("0" + time.getSeconds()).slice(-2);

		setTime({ hour, minutes, seconds, year, month, day, weekday });
	};

	useEffect(() => {
		getNewDate();
		timerRef.current = setInterval(getNewDate, 1000);
		return () => clearInterval(timerRef.current);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="clock" style={{ height: setHeight(), color: fontColor }}>
			<div
				onClick={() => {
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
						if (deviceWidth > 650) {
							modelAnimationApi.start({
								from: {
									y: moveNum,
								},
								to: {
									y: 0,
								},
							});
						}
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
				style={{
					zIndex: "1",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
					userSelect: "none",
				}}
			>
				<div className="clock-card">
					<p
						className="hourclass"
						style={{
							fontSize: `${setHeight2()}px`,
							lineHeight: `${setHeight2()}px`,
						}}
					>
						{`${time.hour}:`}
						{`${time.minutes}`}
						{timeSeconds ? `:${time.seconds}` : ""}
					</p>
				</div>
				<div
					className="dateclass"
					style={{
						fontSize: `${setHeight2() / 3.5}px`,
						lineHeight: `${setHeight2() / 3.5}px`,
					}}
				>
					{time.month &&
						`${time.year}年${time.month}月${time.day}日 星期${time.weekday}`}
				</div>
			</div>
		</div>
	);
};

export default Clock;
