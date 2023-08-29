import "nprogress/nprogress.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Router, RouterBeforeEach } from "./myRouters";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<RouterBeforeEach />
			<Router />
		</BrowserRouter>
	</Provider>
);
