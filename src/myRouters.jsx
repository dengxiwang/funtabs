// 从网上抄来的react路由守卫
import { Spin } from "antd";
import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { Home } from "./module/home";
const Myrouters = [
    {
        path: '/',
        element: <Home />
    }
];

const RouterBeforeEach = () => {
    return (<>
        <Outlet />
    </>)
};

const Router = () => (
    <Suspense fallback={<Spin />}>{useRoutes(Myrouters)}</Suspense>
);
export { Router, RouterBeforeEach };
