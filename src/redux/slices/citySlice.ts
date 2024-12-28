import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
} from "@reduxjs/toolkit";

import { City } from "../../types/SearchOptions";

// Тип состояния для городов
interface CitiesState {
  fromCity: City; // Город отправления
  toCity: City; // Город прибытия
  departureSuggestions: City[]; // Подсказки городов отправления
  destinationSuggestions: City[]; // Подсказки городов прибытия
  loadingFromCity: boolean; // Состояние загрузки для отправления
  loadingToCity: boolean; // Состояние загрузки для прибытия
  error: string | null; // Ошибка
}

// Начальное состояние
const initialState: CitiesState = {
  fromCity: { name: "", _id: "" },
  toCity: { name: "", _id: "" },
  departureSuggestions: [],
  destinationSuggestions: [],
  loadingFromCity: false,
  loadingToCity: false,
  error: null,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});


const citiesSlice = createSliceWithThunk({
  name: "cities",
  initialState,
  selectors: {
    CitiesState: (state) => state,
  },
  reducers: (create) => ({
    setFromCity: create.reducer(
      (state, action: PayloadAction<City>) => {
        state.fromCity = action.payload;
        //console.log(`Срез: ${state.fromCity._id} ${state.fromCity.name}`)
      }
    ),
    setToCity: create.reducer((state, action: PayloadAction<City>) => {
      state.toCity = action.payload;
    }),

    clearSuggestions: create.reducer((state) => {
      state.departureSuggestions = [];
      state.destinationSuggestions = [];
    }),

    swapCities: create.reducer((state) => {
    const temp = state.fromCity;
    state.fromCity = state.toCity;
    state.toCity = temp;
  }),
    
    fetchDepartureSuggestions: create.asyncThunk<City[], string,{ rejectValue: string }>(
      async (name, { rejectWithValue }) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/routes/cities?name=${name}`);

          if (!response.ok) {
            return rejectWithValue("Не удалось загрузить данные о городах.");
          }
          const data = await response.json();
          return data.map((city: { _id: string; name: string }) => ({
            name: city.name,
            _id: city._id,
          })); 
        } catch (error) {
          console.log(error)
          return rejectWithValue("Произошла ошибка при загрузке данных.");
        }
      },
      {
        pending: (state) => {
          state.loadingFromCity = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          state.departureSuggestions = action.payload;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => {
          state.loadingFromCity = false;
        },
      }
    ),

    fetchDestinationSuggestions: create.asyncThunk<City[],string,{ rejectValue: string }>(
      async (name, { rejectWithValue }) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/routes/cities?name=${name}`);

          if (!response.ok) {
            return rejectWithValue("Не удалось загрузить данные о городах.");
          }
          const data = await response.json();
          return data.map((city: { _id: string; name: string }) => ({
            name: city.name,
            _id: city._id,
          })); 
        }  catch (error) {
          console.log(error)
          return rejectWithValue("Произошла ошибка при загрузке данных.");
        }
      },
      {
        pending: (state) => {
          state.loadingToCity = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          state.destinationSuggestions = action.payload;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => {
          state.loadingToCity = false;
        },
      }
    )
  }),

});

export const { setFromCity, setToCity, clearSuggestions, fetchDepartureSuggestions, fetchDestinationSuggestions, swapCities } = citiesSlice.actions;
export default citiesSlice.reducer;