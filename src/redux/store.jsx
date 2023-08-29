import { configureStore } from "@reduxjs/toolkit";
import cloudSync from "./slice/cloudSync";
import deviceType from "./slice/deviceType";
import moreSettings from "./slice/moreSettings";

export const store = configureStore({
	reducer: {
		cloudSync: cloudSync,
		deviceType: deviceType,
		moreSettings: moreSettings,
	},
});
