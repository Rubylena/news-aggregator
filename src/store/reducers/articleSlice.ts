import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArticleState {
  query: string;
  filters: { date: string; category: string; source: string };
}

const initialState: ArticleState = {
  query: "",
  filters: { date: "", category: "", source: "" },
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
      action: PayloadAction<{ date: string; category: string; source: string }>
    ) => {
      state.filters = action.payload;
    },
  },
});

export const { setQuery, setFilters } = articleSlice.actions;
export default articleSlice.reducer;
