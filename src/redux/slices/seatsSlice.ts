import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Seats } from "../../types/Seats"; 
import { RootState } from "../store";

interface SeatsState {
    seatsTo: Seats[]; // Места для направления "туда"
    seatsBack: Seats[]; // Места для направления "обратно"
    loading: boolean;
    error: string | null;
}

const initialState: SeatsState = {
    seatsTo: [],
    seatsBack: [],
    loading: false,
    error: null,
};

// Асинхронное действие для загрузки мест "туда"
export const fetchSeatsTo = createAsyncThunk(
    'seats/fetchSeatsTo',
    async (id: string, { getState }) => {
        const state = getState() as RootState;
        const filters = state.filterCarriages.filtersTo;

        // Формируем строку запроса
        const query = new URLSearchParams({
            ...Object.fromEntries(
                Object.entries(filters)
                    .filter(([, value]) => value === true)
                    .map(([key]) => [key, 'true'])
            )
        }).toString();

        // Логируем строку запроса
        console.log(`отправлен запрос по местам "туда" с id=${id} и query=${query}`);

        const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch seats to');
        }

        return await response.json();
    }
);

// Асинхронное действие для загрузки мест "обратно"
export const fetchSeatsBack = createAsyncThunk(
    'seats/fetchSeatsBack',
    async (id: string, { getState }) => {
        const state = getState() as RootState;
        const filters = state.filterCarriages.filtersBack;

        // Формируем строку запроса
        const query = new URLSearchParams({
            ...Object.fromEntries(
                Object.entries(filters)
                    .filter(([, value]) => value === true)
                    .map(([key]) => [key, 'true'])
            )
        }).toString();

        // Логируем строку запроса
        console.log(`отправлен запрос по местам "обратно" с id=${id} и query=${query}`);

        const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch seats back');
        }

        return await response.json();
    }
);

const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        clearSeats(state) {
            state.seatsTo = [];
            state.seatsBack = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeatsTo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeatsTo.fulfilled, (state, action: PayloadAction<Seats[]>) => {
                state.seatsTo = action.payload; // Обновляем массив мест "туда"
                state.loading = false;
            })
            .addCase(fetchSeatsTo.rejected, (state, action) => {
                state.error = action.error.message || 'Unknown error';
                state.loading = false;
            })
            .addCase(fetchSeatsBack.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeatsBack.fulfilled, (state, action: PayloadAction<Seats[]>) => {
                state.seatsBack = action.payload; // Обновляем массив мест "обратно"
                state.loading = false;
            })
            .addCase(fetchSeatsBack.rejected, (state, action) => {
                state.error = action.error.message || 'Unknown error';
                state.loading = false;
            });
    },
});

export const { clearSeats } = seatsSlice.actions;

export default seatsSlice.reducer;
