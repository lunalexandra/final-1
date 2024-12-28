import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchOptions } from "../../types/SearchOptions";

const initialState: SearchOptions = {
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_express: false,
  price_from: 2000,
  price_to: 5000,
  start_departure_hour_from: 0,
  start_departure_hour_to: 24,
  start_arrival_hour_from: 0,
  start_arrival_hour_to: 24,
  end_departure_hour_from: 0,
  end_departure_hour_to: 24,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 24,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (
      state,
      action: PayloadAction<
        | "have_first_class"
        | "have_second_class"
        | "have_third_class"
        | "have_fourth_class"
        | "have_wifi"
        | "have_express"
      >
    ) => {
      const filterType = action.payload;
      state[filterType] = !state[filterType];
      //console.log(`${state[filterType]}`)
    },

    updatePriceRange: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (from >= 0 && to >= from) {
        state.price_from = from;
        state.price_to = to;
      }
    },
    updateStartDepartureHour: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (from >= 0 && from <= 24 && to >= 0 && to <= 24 && from <= to) {
        state.start_departure_hour_from = from;
        state.start_departure_hour_to = to;
      }
    },
    updateStartArrivalHour: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (from >= 0 && from <= 24 && to >= 0 && to <= 24 && from <= to) {
        state.start_arrival_hour_from = from;
        state.start_arrival_hour_to = to;
      }
    },
    updateEndDepartureHour: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (from >= 0 && from <= 24 && to >= 0 && to <= 24 && from <= to) {
        state.end_departure_hour_from = from;
        state.end_departure_hour_to = to;
      }
    },
    updateEndArrivalHour: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (from >= 0 && from <= 24 && to >= 0 && to <= 24 && from <= to) {
        state.end_arrival_hour_from = from;
        state.end_arrival_hour_to = to;
      }
    },
  },
});

export const {
  toggleFilter,
  updatePriceRange,
  updateStartDepartureHour,
  updateStartArrivalHour,
  updateEndDepartureHour,
  updateEndArrivalHour,
} = filtersSlice.actions;

export default filtersSlice.reducer;
