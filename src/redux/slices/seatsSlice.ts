import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Seats } from "../../types/Seats";
import { RootState } from "../store";

interface SeatsState {
  seatsTo: Seats[]; // Места для направления "туда"
  seatsBack: Seats[]; // Места для направления "обратно"
  loading: boolean;
  error: string | null;
  selectedCoachTo: Seats []; // Выбранный вагон для направления "туда"
  selectedCoachBack: Seats []; // Выбранный вагон для направления "обратно"
}

const initialState: SeatsState = {
  seatsTo: [],
  seatsBack: [],
  loading: false,
  error: null,
  selectedCoachTo: [],
  selectedCoachBack: [],
};

export const fetchSeatsTo = createAsyncThunk(
  "seats/fetchSeatsTo",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const filters = state.filterCarriages.filtersTo;

    // Формируем строку запроса
    const query = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(filters)
          .filter(([, value]) => value === true)
          .map(([key]) => [key, "true"])
      ),
    }).toString(); 
    
    // или Формируем строку запроса
    //       const query = new URLSearchParams(
    //           Object.entries(filters).reduce((acc, [key, value]) => {
    //             acc[key] = value.toString(); // Явное преобразование значений
    //             return acc;
    //           }, {} as Record<string, string>)
    //         ).toString();
    //console.log(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`)

    const response = await fetch(
      `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch seats to");
    }
    return await response.json();
  }
);

export const fetchSeatsBack = createAsyncThunk(
  "seats/fetchSeatsBack",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const filters = state.filterCarriages.filtersBack;

    const query = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(filters)
          .filter(([, value]) => value === true)
          .map(([key]) => [key, "true"])
      ),
    }).toString();

    const response = await fetch(
      `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch seats back");
    }
    return await response.json();
  }
);

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    clearSeats(state) {
      state.seatsTo = [];
      state.seatsBack = [];
      state.error = null;
      state.loading = false;
      state.selectedCoachTo = [];
      state.selectedCoachBack = [];
    },
   
    selectCoachTo(state, action: PayloadAction<Seats>) {
      const exists = state.selectedCoachTo.some(coach => coach.coach.name === action.payload.coach.name);
      if (!exists) {
        state.selectedCoachTo.push(action.payload); // Добавление вагона
      } else {
        state.selectedCoachTo = state.selectedCoachTo.filter(coach => coach.coach.name !== action.payload.coach.name); // Удаление
      }
    },
    selectCoachBack(state, action: PayloadAction<Seats>) {
      const exists = state.selectedCoachBack.some(coach => coach.coach.name === action.payload.coach.name);
      if (!exists) {
        state.selectedCoachBack.push(action.payload);
      } else {
        state.selectedCoachBack = state.selectedCoachBack.filter(coach => coach.coach.name !== action.payload.coach.name);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatsTo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSeatsTo.fulfilled,
        (state, action: PayloadAction<Seats[]>) => {
          state.seatsTo = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSeatsTo.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.loading = false;
      })
      .addCase(fetchSeatsBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSeatsBack.fulfilled,
        (state, action: PayloadAction<Seats[]>) => {
          state.seatsBack = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSeatsBack.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.loading = false;
      });
  },
});

export const { clearSeats, selectCoachTo, selectCoachBack } = seatsSlice.actions;

export default seatsSlice.reducer;


// export const fetchSeatsTo = createAsyncThunk(
//     "seats/fetchSeatsTo",
//     async (id: string, { getState }) => {
//       const state = getState() as RootState;
//       const filters = state.filterCarriages.filtersTo;
  
//       // Формируем строку запроса
//       const query = new URLSearchParams(
//           Object.entries(filters).reduce((acc, [key, value]) => {
//             acc[key] = value.toString(); // Явное преобразование значений
//             return acc;
//           }, {} as Record<string, string>)
//         ).toString();
  
//         console.log(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`)
  
//       const response = await fetch(
//         `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch seats to");
//       }
//       return await response.json();
//     }
//   );
  
//   // Асинхронное действие для загрузки мест "обратно"
//   export const fetchSeatsBack = createAsyncThunk(
//     "seats/fetchSeatsBack",
//     async (id: string, { getState }) => {
//       const state = getState() as RootState;
//       const filters = state.filterCarriages.filtersBack;
  
//       const query = new URLSearchParams(
//           Object.entries(filters).reduce((acc, [key, value]) => {
//             acc[key] = value.toString(); // Явное преобразование значений
//             return acc;
//           }, {} as Record<string, string>)
//         ).toString();
  
//       const response = await fetch(
//         `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch seats back");
//       }
//       return await response.json();
//     }
//   );