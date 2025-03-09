import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleState } from "../../utils/interface";

const initialState: ArticleState = {
  query: "debate",
  filters: { category: "", source: "", person: "" },
  resultFilters: { date: "", category: "", source: "" },
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{ category: string; source: string, person: string }>
    ) => {
      state.filters = action.payload;
    },
    setResultFilters: (
      state,
      action: PayloadAction<{ date: string; category: string; source: string}>
    ) => {
      state.resultFilters = action.payload;
    },
  },
});

export const { setQuery, setFilters, setResultFilters } = articleSlice.actions;
export default articleSlice.reducer;
