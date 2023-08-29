export default function showBoxShadow() {
	const localBoxShadow = window.localStorage.getItem("boxShadow");
	const localBoxShadowOpen = window.localStorage.getItem("boxShadowOpen");

	return localBoxShadowOpen === "true" && localBoxShadow
		? localBoxShadow
		: null;
}
