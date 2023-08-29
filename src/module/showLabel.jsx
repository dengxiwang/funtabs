import React from "react";
import ShowLabelFontColor from "../common/showLabelFontColor";

export default function ShowLabel(props) {
	const { cardStyle, item } = props;

	if (cardStyle === "phoneCard") {
		const labelColor = ShowLabelFontColor();

		return (
			<p
				style={{
					overflow: "hidden",
					fontWeight: "bold",
					fontSize: "12px",
					marginBottom: "0px",
					textAlign: "center",
					color: labelColor,
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{item.label}
			</p>
		);
	}
}
