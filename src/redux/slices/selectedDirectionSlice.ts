import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainInfo } from "../../types/TrainInfo";

interface SelectedDirectionState {
  direction: TrainInfo | null;
}

const initialState: SelectedDirectionState = {
  direction: null,
};

const selectedDirectionSlice = createSlice({
  name: "selectedDirection",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<TrainInfo>) => {
      state.direction = action.payload;
    },
    clearDirection: (state) => {
      state.direction = null;
    },
  },
});

export const { setDirection, clearDirection } = selectedDirectionSlice.actions;
export default selectedDirectionSlice.reducer;
