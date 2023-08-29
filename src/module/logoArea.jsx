import { Image } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";

function LogoArea(props) {
	const { clockAreaHeight, model, setModel, api, modelAnimationApi } = props;
	const [width, setWidth] = useState(window.innerWidth);
	const logoUrl = useMemo(
		() => window.localStorage.getItem("logoUrl") || "/icons/logo_white.svg",
		[]
	);

	const handleResize = useCallback(() => {
		setWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	const getHeight = useCallback(() => {
		return width < 650 ? clockAreaHeight / 2 : clockAreaHeight;
	}, [width, clockAreaHeight]);

	const height = getHeight();

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Image
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
								duration: 100,
							},
						});
					}
				}}
				src={logoUrl}
				style={{
					height: `${height}px`,
					padding: `${height / 6}px 0px`,
					width: "auto",
					cursor: "pointer",
				}}
				fallback="./icons/logo_white.svg"
				preview={false}
			/>
		</div>
	);
}

export default LogoArea;
