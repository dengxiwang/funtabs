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

const OnlyIconStyle = memo((props) => {
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

	function renderComponent(Component, className, size) {
		return (
			<div
				ref={ref}
				className={`grid-item${size} ${className}`}
				style={{
					position: "relative",
					pointerEvents: "all",
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
				return renderComponent(LinkCard, "", item.size || 11);
			case "note":
				return renderComponent(Note, "", 34);
			case "timeProgress":
				return renderComponent(TimeProgress, "", 22);
			case "markdown":
				return renderComponent(Markdown, "", 11);
			case "translatelite":
				return renderComponent(Translate, "", 34);
			case "localWeather":
				return renderComponent(LocalWeather, "", 22);
			case "hotEventList":
				return renderComponent(HotEventList, "", 34);
			case "festivalRemind":
				return renderComponent(FestivalRemind, "", 22);
			case "article":
				return renderComponent(Article, "", item.size || 11);
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

export default OnlyIconStyle;
