import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchOptions } from "../../types/SearchOptions";

const initialState: SearchOptions = {
  date_start: "",
  date_end: "",
};

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setDateFrom: (state, action: PayloadAction<string>) => {
      state.date_start = action.payload;
      //console.log(`Срез дата туда${state.date_start}`)
    },
    setDateTo: (state, action: PayloadAction<string>) => {
      state.date_end = action.payload;
      //console.log(`Срез дата оттуда${state.date_end}`)
    },
    clearDates: (state) => {
      state.date_start = "";
      state.date_end = "";
    },
  },
});

export const { setDateFrom, setDateTo, clearDates } = datesSlice.actions;
export default datesSlice.reducer;
