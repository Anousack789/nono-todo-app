import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IMainState {
  previewImage: string;
}
const initialState = {
  previewImage: "",
  shop: undefined,
  listShop: [],
} as IMainState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string>) => {
      state.previewImage = action.payload;
    },
  },
});
export const { setPreviewImage } = mainSlice.actions;

export default mainSlice.reducer;
export const selectPreviewImage = (state: RootState) =>
  state.mainReducer.previewImage;
