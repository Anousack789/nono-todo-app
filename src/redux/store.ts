import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { apiSlice } from "./apiSlice";
import mainReducer from "./features/mainSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    mainReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.DEV,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
