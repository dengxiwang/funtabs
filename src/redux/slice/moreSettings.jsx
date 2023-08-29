import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchBackgroundColor: localStorage.getItem("searchBackgroundColor")
		? localStorage.getItem("searchBackgroundColor")
		: "#ffffff",
	searchBlurOpen: localStorage.getItem("searchBlurOpen")
		? localStorage.getItem("searchBlurOpen") === "true"
			? true
			: false
		: false,
	searchBlurNumber: localStorage.getItem("searchBlurNumber")
		? parseInt(localStorage.getItem("searchBlurNumber"))
		: 8,
	searchRadius: localStorage.getItem("searchRadius")
		? parseInt(localStorage.getItem("searchRadius"))
		: 50,
	searchFontColor: localStorage.getItem("searchFontColor")
		? localStorage.getItem("searchFontColor")
		: "#000000",
	timeSeconds: localStorage.getItem("timeSeconds")
		? localStorage.getItem("timeSeconds") === "true"
			? true
			: false
		: false,
	searchAutoFocus: localStorage.getItem("searchAutoFocus")
		? localStorage.getItem("searchAutoFocus") === "true"
			? true
			: false
		: false,
};

export const moreSettings = createSlice({
	name: "moreSettings",
	initialState,
	reducers: {
		setSearchBackgroundColor: (state, action) => {
			state.searchBackgroundColor = action.payload;
		},
		setSearchBlurOpen: (state, action) => {
			state.searchBlurOpen = action.payload;
		},
		setSearchBlurNumber: (state, action) => {
			state.searchBlurNumber = action.payload;
		},
		setSearchRadius: (state, action) => {
			state.searchRadius = action.payload;
		},
		setSearchFontColor: (state, action) => {
			state.searchFontColor = action.payload;
		},
		setTimeSeconds: (state, action) => {
			state.timeSeconds = action.payload;
		},
		setSearchAutoFocus: (state, action) => {
			state.searchAutoFocus = action.payload;
		},
	},
});

export const {
	setSearchBackgroundColor,
	setSearchBlurOpen,
	setSearchBlurNumber,
	setSearchRadius,
	setSearchFontColor,
	setTimeSeconds,
	setSearchAutoFocus,
} = moreSettings.actions;

export default moreSettings.reducer;
