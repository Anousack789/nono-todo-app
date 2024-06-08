import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IUser } from "../../interfaces/i-user";

const initialState: { detail?: IUser } = {
  detail: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential(state, action: PayloadAction<IUser>) {
      state.detail = action.payload;
    },
  },
});
export const { setCredential } = authSlice.actions;

export const selectUserDetail = (state: RootState) => state.auth.detail;
export default authSlice.reducer;
