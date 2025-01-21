import { configureStore } from "@reduxjs/toolkit";
import  citiesReducer  from "../slices/citySlice";
import datesReducer  from "../slices/dateSlice";
import filterReduser from "../slices/filterSlice";
import filterCarriagesReduser from "../slices/filterCarriagesSlice";
import directionReduser from "../slices/directionsSlice";
import sortReduser from "../slices/sortSlice";
import currentPageReducer from "../slices/currentPageSlice";
import seatsReduser from "../slices/seatsSlice";
import seatsListReduser from "../slices/seatsListSlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    dates: datesReducer,
    filters: filterReduser,
    filterCarriages: filterCarriagesReduser,
    directions: directionReduser,
    sort: sortReduser,
    currentPage: currentPageReducer,
    seats: seatsReduser,
    seats_list: seatsListReduser,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;