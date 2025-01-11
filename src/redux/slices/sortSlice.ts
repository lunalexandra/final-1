import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchOptions } from "../../types/SearchOptions";

const initialState: SearchOptions = {
  limit: 5,
  sort: "date",
  offset: 0,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      console.log(`тип лимита в срезе ${typeof state.limit}`);
    },
    setSort: (state, action: PayloadAction<"date" | "min-price" | "duration">) => {
      if (typeof action.payload === "string") {
        console.log(typeof action.payload);
        state.sort = action.payload;
        console.log(`Меняем в срезе ${state.sort}`);
      }
    },
    setOffset: (state, action: PayloadAction<number>) => {
        state.offset = action.payload;
        console.log(`Оффсет в срезе ${state.offset}`);
    },
  },
});

export const { setLimit, setSort, setOffset } = sortSlice.actions;

export default sortSlice.reducer;
