import { memo } from "react";
import { Flipped } from "react-flip-toolkit";
import { useInView } from "react-intersection-observer";
import { useLongPress } from "use-long-press";
import "../common/funtabs.css";
import LocalWeather from "../component/localWeather";
import Markdown from "../component/markdown";
import TimeProgress from "../component/timeProgress";
import LinkCard from "../module/linkCard";

const OnlyText = memo((props) => {
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
		fontColor,
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
						fontColor={fontColor}
						widthNum={widthNum}
						gap={gap}
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
				return renderComponent(LinkCard, "", 11);
			case "timeProgress":
				return renderComponent(TimeProgress, "", 11);
			case "markdown":
				return renderComponent(Markdown, "", 11);
			case "localWeather":
				return renderComponent(LocalWeather, "", 11);
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

export default OnlyText;
