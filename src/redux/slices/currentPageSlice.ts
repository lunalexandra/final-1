import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICurrentPage {
    currentPage: number
}

const initialState: ICurrentPage = {
    currentPage: 1,
};

const currentPageSlice = createSlice({
  name: "current_page",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      console.log(`Срез текущая страница${state.currentPage}`)
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;