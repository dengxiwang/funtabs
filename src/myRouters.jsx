// 从网上抄来的react路由守卫
import { Spin } from "antd";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Home } from "./module/home";
const Myrouters = [
	{
		path: "/",
		element: <Home />,
	},
];

const RouterBeforeEach = () => {
	const location = useLocation();
	const navigator = useNavigate();

	useEffect(() => {
		if (location.pathname !== "/") {
			navigator("/");
		}
	});

	return (
		<>
			<Outlet />
		</>
	);
};

const Router = () => (
	<Suspense fallback={<Spin />}>{useRoutes(Myrouters)}</Suspense>
);
export { Router, RouterBeforeEach };
