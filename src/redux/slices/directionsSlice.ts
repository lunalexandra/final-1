import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TrainInfo } from "../../types/TrainInfo"; // Импортируйте тип для направлений
import { SearchOptions } from "../../types/SearchOptions";
import { RootState } from "../store";

interface DirectionsState {
  directions: TrainInfo[]; // Массив направлений поездов
  options?: SearchOptions;
  total_count: number; // Общее количество направлений
  loading: boolean;
  error: string | null;
}

const initialState: DirectionsState = {
  directions: [],
  options: {},
  total_count: 0,
  loading: false,
  error: null,
};

export const fetchDirections = createAsyncThunk<
  { items: TrainInfo[]; total_count: number },
  string,
  { rejectValue: string }
>("directions/fetchDirections", async (_, { getState, rejectWithValue }) => {
  const { fromCity, toCity } = (getState() as RootState).cities;
  const { date_start, date_end } = (getState() as RootState).dates;
  const filterOptions = (getState() as RootState).filters;
  const sortOptions = (getState() as RootState).sort;

  if (!fromCity || !toCity) {
    console.log("Нет выбранных городов");
    return rejectWithValue("Не выбраны города для поиска направлений.");
  }

  try {
    const filterParams = new URLSearchParams();

    if (date_start) filterParams.append("date_start", date_start);
    if (date_end) filterParams.append("date_end", date_end);
    if (filterOptions.price_from)
      filterParams.append("price_from", String(filterOptions.price_from));
    if (filterOptions.price_to)
      filterParams.append("price_to", String(filterOptions.price_to));
    if (filterOptions.start_departure_hour_from !== undefined)
      filterParams.append(
        "start_departure_hour_from",
        String(filterOptions.start_departure_hour_from)
      );
    if (filterOptions.start_departure_hour_to !== undefined)
      filterParams.append(
        "start_departure_hour_to",
        String(filterOptions.start_departure_hour_to)
      );
    if (filterOptions.start_arrival_hour_from !== undefined)
      filterParams.append(
        "start_arrival_hour_from",
        String(filterOptions.start_arrival_hour_from)
      );
    if (filterOptions.start_arrival_hour_to !== undefined)
      filterParams.append(
        "start_arrival_hour_to",
        String(filterOptions.start_arrival_hour_to)
      );
    if (filterOptions.end_departure_hour_from !== undefined)
      filterParams.append(
        "end_departure_hour_from",
        String(filterOptions.end_departure_hour_from)
      );
    if (filterOptions.end_departure_hour_to !== undefined)
      filterParams.append(
        "end_departure_hour_to",
        String(filterOptions.end_departure_hour_to)
      );
    if (filterOptions.end_arrival_hour_from !== undefined)
      filterParams.append(
        "end_arrival_hour_from",
        String(filterOptions.end_arrival_hour_from)
      );
    if (filterOptions.end_arrival_hour_to !== undefined)
      filterParams.append(
        "end_arrival_hour_to",
        String(filterOptions.end_arrival_hour_to)
      );

    if (filterOptions.have_first_class)
      filterParams.append("have_first_class", "true");
    if (filterOptions.have_second_class)
      filterParams.append("have_second_class", "true");
    if (filterOptions.have_third_class)
      filterParams.append("have_third_class", "true");
    if (filterOptions.have_fourth_class)
      filterParams.append("have_fourth_class", "true");
    if (filterOptions.have_wifi) filterParams.append("have_wifi", "true");
    if (filterOptions.have_express) filterParams.append("have_express", "true");
    if (sortOptions.limit)
      filterParams.append("limit", String(sortOptions.limit));
    if (sortOptions.sort) filterParams.append("sort", sortOptions.sort);
    if (sortOptions.offset)
      filterParams.append("offset", String(sortOptions.offset));
    // console.log(
    //   "Параметры фильтра после добавления сортировки:",
    //   filterParams.toString()
    // );

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/routes?$from_city_id=${
        fromCity._id
      }&to_city_id=${toCity._id}&${filterParams.toString()}`
    );

    if (!response.ok) {
      return rejectWithValue("Не удалось загрузить данные о направлениях.");
    }
    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      //console.error("Неверный формат данных:", data);
      return rejectWithValue("Получены некорректные данные о направлениях.");
    }

    console.log(
      `Отправленный запрос: ${
        import.meta.env.VITE_API_URL
      }/routes?from_city_id=${fromCity._id}&to_city_id=${
        toCity._id
      }&${filterParams.toString()}`
    );
    console.log(data);
    return { items: data.items, total_count: data.total_count };
  } catch (error) {
    console.log(`Ошибка: ${error}`);
    return rejectWithValue("Произошла ошибка при загрузке данных.");
  }
});

const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {
    setDirections(state, action: PayloadAction<TrainInfo[]>) {
      state.directions = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearDirections(state) {
      state.directions = [];
      state.total_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirections.fulfilled, (state, action) => {
        state.directions = action.payload.items;
        state.total_count = action.payload.total_count;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDirections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDirections, setLoading, setError, clearDirections } =
  directionsSlice.actions;

export default directionsSlice.reducer;
