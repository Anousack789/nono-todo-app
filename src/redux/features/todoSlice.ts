import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { ITodo } from "../../interfaces/i-todo";
import { RootState } from "../store";

interface ITodoState {
  todoUpdateItem: ITodo | null;
}

const initialState = {
  todoUpdateItem: null,
} as ITodoState;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoUpdateItem: (state, action: PayloadAction<ITodo | null>) => {
      state.todoUpdateItem = action.payload;
    },
  },
});

export default todoSlice.reducer;

export const { setTodoUpdateItem } = todoSlice.actions;

export const selectTodoUpdateItem = (state: RootState) =>
  state.todoReducer.todoUpdateItem;
