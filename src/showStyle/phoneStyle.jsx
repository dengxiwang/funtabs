import { memo } from "react";
import { Flipped } from "react-flip-toolkit";
import { useInView } from "react-intersection-observer";
import { useLongPress } from "use-long-press";
import "../common/funtabs.css";
import Article from "../component/article";
import FestivalRemind from "../component/festivalRemind";
import HotEventList from "../component/hotEventList";
import LocalWeather from "../component/localWeather";
import Markdown from "../component/markdown";
import Note from "../component/note";
import TimeProgress from "../component/timeProgress";
import Translate from "../component/translate";
import LinkCard from "../module/linkCard";

const PhoneStyle = memo((props) => {
	const {
		id,
		edit,
		item,
		num,
		gap,
		linkList,
		setLinkList,
		radius,
		widthNum,
		heightNum,
		cardStyle,
		linkOpen,
		click,
		setDisabled,
		setA,
		folderDisabled,
		type,
		editFunction,
		tabsActiveKey,
		setTabsActiveKey,
	} = props;

	const longpress = useLongPress(
		() => {
			if (edit === "none") {
				editFunction();
			}
		},
		{
			cancelOnMovement: true,
			detect: "mouse",
		}
	);

	const [ref, inView] = useInView({
		threshold: 0,
		rootMargin: `${window.innerHeight / 2}px`,
	});

	function renderComponent(
		Component,
		className,
		size,
		style,
		widthNum,
		heightNum
	) {
		return (
			<div
				ref={ref}
				className={`grid-item${size} ${className}`}
				style={{
					margin: "0px 11px 22px 11px",
					position: "relative",
					pointerEvents: "all",
					...style,
				}}
				{...longpress()}
			>
				{inView && (
					<Component
						id={id}
						edit={edit}
						item={item}
						num={num}
						linkList={linkList}
						setLinkList={setLinkList}
						radius={radius}
						heightNum={heightNum}
						cardStyle={cardStyle}
						linkOpen={linkOpen}
						click={click}
						setDisabled={setDisabled}
						widthNum={widthNum}
						gap={gap}
						setClick={setA}
						folderDisabled={folderDisabled}
						type={type}
						tabsActiveKey={tabsActiveKey}
						setTabsActiveKey={setTabsActiveKey}
					/>
				)}
			</div>
		);
	}

	function howToShow() {
		switch (item.type) {
			case "link":
				return renderComponent(
					LinkCard,
					"",
					item.size || 11,
					{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						margin: "0px",
					},
					widthNum,
					heightNum
				);
			case "note":
				return renderComponent(Note, "", 34, null, widthNum, heightNum - 22);
			case "timeProgress":
				return renderComponent(
					TimeProgress,
					"",
					22,
					null,
					widthNum - 22,
					heightNum - 22
				);
			case "markdown":
				return renderComponent(Markdown, "", 11, null, widthNum, heightNum);
			case "translatelite":
				return renderComponent(Translate, "", 34, null, widthNum, heightNum);
			case "localWeather":
				return renderComponent(LocalWeather, "", 22, null, widthNum, heightNum);
			case "hotEventList":
				return renderComponent(HotEventList, "", 34, null, widthNum, heightNum);
			case "festivalRemind":
				return renderComponent(
					FestivalRemind,
					"",
					22,
					null,
					widthNum,
					heightNum
				);
			case "article":
				return renderComponent(
					Article,
					"",
					item.size || 11,
					null,
					widthNum,
					heightNum
				);
			default:
				return null;
		}
	}

	return (
		<>
			<Flipped flipId={item.type + item.link + item.id}>{howToShow()}</Flipped>
		</>
	);
});

export default PhoneStyle;
