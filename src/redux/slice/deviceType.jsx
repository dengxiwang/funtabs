import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	type: "",
};

export const deviceType = createSlice({
	name: "deviceType",
	initialState,
	reducers: {
		setDeviceType: (state, action) => {
			state.type = action.payload;
		},
	},
});

export const { setDeviceType } = deviceType.actions;

export default deviceType.reducer;
