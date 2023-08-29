import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cloudSyncState: "success",
	autoCloudSync: localStorage.getItem("autoCloudSync")
		? localStorage.getItem("autoCloudSync") === "true"
			? true
			: false
		: true,
};

export const cloudSync = createSlice({
	name: "cloudSync",
	initialState,
	reducers: {
		setCloudSyncState: (state, action) => {
			state.cloudSyncState = action.payload;
		},
		setAutoCloudSync: (state, action) => {
			state.autoCloudSync = action.payload;
			localStorage.setItem("autoCloudSync", action.payload);
		},
	},
});

export const { setCloudSyncState, setAutoCloudSync } = cloudSync.actions;

export default cloudSync.reducer;
