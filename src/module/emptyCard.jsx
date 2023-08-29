import { Skeleton } from "antd";
import React from "react";
import showRadius from "../common/showRadius";

export default function EmptyCard(props) {
	const { radius } = props;

	return (
		<div
			style={{
				display: "flex",
				backgroundColor: "#ffffff",
				width: "100%",
				height: "100%",
				borderRadius: showRadius(radius),
				padding: "0px 10px",
				boxSizing: "border-box",
				overflow: "hidden",
				alignItems: "center",
			}}
		>
			<Skeleton title={false} active />
		</div>
	);
}
