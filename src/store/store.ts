import { configureStore } from "@reduxjs/toolkit";
import articleSliceReducer from "./reducers/articleSlice";

export const store = configureStore({
  reducer: {
    articles: articleSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
