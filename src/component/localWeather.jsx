import { PushpinFilled, SettingTwoTone } from "@ant-design/icons";
import { Cascader, Popover, Skeleton, Space, message } from "antd";
import { useEffect, useRef, useState } from "react";
import useDoubleClick from "use-double-click";
import cursorControl from "../common/cursorControl";
import { getClear } from "../common/fetchClear";
import variable from "../common/variable";
import "../module/clock.css";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";
import "./localWeather.css";

const LocalWeather = (props) => {
	const {
		id,
		edit,
		num,
		linkList,
		gap,
		setLinkList,
		item,
		cardStyle,
		linkOpen,
		radius,
		widthNum,
		heightNum,
		click,
		fontColor,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;
	const localCity = localStorage.getItem(`weather_${item.id}`);
	const localData = localStorage.getItem(`data_weather_${item.id}`);
	const [load, setLoad] = useState(true);
	const [weatherData, setWeatherData] = useState({
		city: "",
		temp: "",
		weather: "",
		aqi: "",
		weatherType: "",
		qualityLevel: "",
		windLevel: "",
		wind: "",
	});
	const [cityName, setCityName] = useState(() => {
		if (localCity) {
			return JSON.parse(localCity);
		}
	});
	const timmer = useRef();

	useEffect(() => {
		if (localData) {
			setLoad(false);
			const data = JSON.parse(localData);
			setWeatherData({
				city: data.city || "",
				temp: data.current_temperature || "",
				weather: data.current_condition || "",
				aqi: data.aqi || "",
				qualityLevel: data.quality_level || "",
				wind: data.wind_direction || "",
				weatherType: data.weather_icon_id || "",
				windLevel: data.wind_level || "",
			});
		}
	}, [localData]);

	useEffect(() => {
		fetchWeatherData(cityName ? cityName[1] : "");
		timmer.current = setInterval(() => {
			fetchWeatherData(cityName ? cityName[1] : "");
		}, 120000);
		return () => clearInterval(timmer.current);
		// eslint-disable-next-line
	}, [cityName]);

	function changeLocal(e) {
		switch (e.key) {
			case `weather_${item.id}`: {
				try {
					setCityName(JSON.parse(e.newValue));
				} catch (error) {
					setCityName(e.newValue);
				}
				break;
			}
			default:
				break;
		}
	}

	useEffect(() => {
		window.addEventListener("setItemEvent", (e) => changeLocal(e));
		return () =>
			window.removeEventListener("setItemEvent", (e) => changeLocal(e));
		// eslint-disable-next-line
	}, []);

	const fetchWeatherData = (city) => {
		const params = { city: city || "" };
		getClear(`${variable.weather}`, params).then((data) => {
			localStorage.setItem(`data_weather_${item.id}`, JSON.stringify(data));
			setLoad(false);
			setWeatherData({
				city: data.city || "",
				temp: data.current_temperature || "",
				weather: data.current_condition || "",
				aqi: data.aqi || "",
				qualityLevel: data.quality_level || "",
				wind: data.wind_direction || "",
				weatherType: data.weather_icon_id || "",
				windLevel: data.wind_level || "",
			});
		});
	};

	const onChange = (value) => {
		if (value) {
			message.success("城市选择成功");
			setCityName(value);
			localStorage.setItem(`weather_${item.id}`, JSON.stringify(value));
		} else {
			message.success("已设置为自动获取天气");
			setCityName("");
			localStorage.setItem(`weather_${item.id}`, "");
		}
	};

	const filter = (inputValue, path) =>
		path.some(
			(option) =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);

	const [options, setOptions] = useState([]);

	useEffect(() => {
		try {
			getClear(`${variable.cityList}`).then((res) => {
				setOptions(res);
			});
		} catch (error) {}
	}, []);

	function weatherSettings() {
		return (
			<Cascader
				value={cityName}
				options={options}
				onChange={onChange}
				placeholder="自定义城市"
				showSearch={{
					filter,
				}}
			/>
		);
	}

	const showSettingsButton = () =>
		cardStyle === "onlyText" ? (
			<SettingTwoTone className="edit-button-style2" />
		) : (
			<SettingTwoTone className="edit-button-style" />
		);

	const showSettings = () =>
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
				<Popover title="选择城市" content={weatherSettings}>
					{showSettingsButton()}
				</Popover>
			</>
		);

	const {
		city,
		temp,
		weather,
		aqi,
		weatherType,
		qualityLevel,
		wind,
		windLevel,
	} = weatherData;

	const showBackground = () =>
		cardStyle !== "onlyText"
			? weatherType === "0" || weatherType === "1"
				? "-webkit-linear-gradient(top, rgb(13, 104, 188), rgb(114, 173, 224))"
				: weatherType === "30"
				? "linear-gradient(rgb(24, 50, 89), rgb(52, 130, 186))"
				: "-webkit-linear-gradient(top, rgb(72, 86, 99), rgb(161, 184, 202))"
			: "none";

	const showWeatherIcon = () =>
		!load &&
		`https://h5tq.moji.com/tianqi/assets/images/weather/w${weatherType}.png`;

	const [fontSize, setFontSize] = useState(0);

	useEffect(() => {
		var size;
		if (cardStyle === "defaultCard") {
			size =
				2 * parseInt(heightNum) < parseInt(widthNum)
					? 2 * heightNum - 60
					: widthNum - 40;
		} else if (cardStyle === "onlyIconCard") {
			size =
				parseInt(heightNum) < parseInt(widthNum)
					? 2 * heightNum + parseInt(gap) - 85
					: 2 * widthNum + parseInt(gap) - 85;
		} else {
			size =
				parseInt(heightNum) < parseInt(widthNum)
					? 2 * heightNum + parseInt(gap) - 106
					: 2 * widthNum + parseInt(gap) - 106;
		}
		setFontSize(size);
	}, [widthNum, heightNum, gap, cardStyle]);

	const showWind = () =>
		widthNum > 68
			? `${weather}（${wind} ${windLevel}级）`
			: `${wind} ${windLevel}级`;

	const howToShow = () =>
		cardStyle === "onlyText" ? (
			<Space
				style={{
					width: "100%",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					color: fontColor,
					fontWeight: "bold",
				}}
			>
				<PushpinFilled />
				<span>{city}</span>
				<span>{`${temp}°`}</span>
				<span>{weather}</span>
			</Space>
		) : (
			<div className="container2">
				<Skeleton
					active
					loading={load}
					title={false}
					paragraph={{
						rows: 3,
					}}
				>
					<Space>
						<PushpinFilled />
						<span>{city}</span>
					</Space>
					<img
						src={showWeatherIcon()}
						alt=""
						style={{
							position: "absolute",
							top: "10px",
							right: "12px",
							width: "auto",
							height: "33px",
						}}
					/>
					<p
						className="font-style"
						style={{
							fontSize: `${fontSize / 1.5}px`,
							lineHeight: `${fontSize / 1.5}px`,
							margin: "0px",
						}}
					>{`${temp}°`}</p>
					<span>
						{showWind()}
						<br />
						空气指数：{qualityLevel}&nbsp;{aqi}
					</span>
				</Skeleton>
			</div>
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
			if (edit === "" || click === 1) {
				return;
			} else {
				const w = document.body.clientWidth;
				if (w < 920) {
					window.open(`https://www.baidu.com/s?wd=${city}天气`, linkOpen);
				} else {
					window.open(
						`https://weathernew.pae.baidu.com/weathernew/pc?query=${city}天气&srcid=4982`,
						linkOpen
					);
				}
			}
		},
		ref: doubleClickRef,
		latency: 230,
	});

	return (
		<>
			<div
				ref={doubleClickRef}
				className="container"
				style={{
					background: showBackground(),
					color: "#fff",
					cursor: cursorControl(edit),
					fontWeight: "bold",
					borderRadius: radius,
					overflow: "hidden",
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
				{showSettings()}
				{howToShow()}
			</div>
			<ShowLabel item={item} fontColor={fontColor} cardStyle={cardStyle} />
		</>
	);
};

export default LocalWeather;
