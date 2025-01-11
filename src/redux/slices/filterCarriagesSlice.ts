import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterOptions {
    id: string;
    filtersTo: {
        have_first_class: boolean;
        have_second_class: boolean;
        have_third_class: boolean;
        have_fourth_class: boolean;
        have_wifi: boolean;
        have_air_conditioning: boolean;
        have_express: boolean; 
    };
    filtersBack: {
        have_first_class: boolean;
        have_second_class: boolean;
        have_third_class: boolean;
        have_fourth_class: boolean;
        have_wifi: boolean;
        have_air_conditioning: boolean;
        have_express: boolean; 
    };
}

const initialState: FilterOptions = {
    id: "",
    filtersTo: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
        have_express: false,
    },
    filtersBack: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
        have_express: false,
    }
};

const filterCarriagesSlice = createSlice({
    name: "filterCarriages",
    initialState,
    reducers: {
        setFilterTo: (
            state,
            action: PayloadAction<
                | "have_first_class"
                | "have_second_class"
                | "have_third_class"
                | "have_fourth_class"
                | "have_air_conditioning"
                | "have_wifi"
                | "have_express"
            >
        ) => {
            const filterType = action.payload;
            // Устанавливаем фильтр в true, если он был false, и в false, если был true
            state.filtersTo[filterType] = !state.filtersTo[filterType];
            console.log(`Состояние фильтра изменено для вагона "туда": ${filterType} = ${state.filtersTo[filterType]}`);
        },
        setFilterBack: (
            state,
            action: PayloadAction<
                | "have_first_class"
                | "have_second_class"
                | "have_third_class"
                | "have_fourth_class"
                | "have_air_conditioning"
                | "have_wifi"
                | "have_express"
            >
        ) => {
            const filterType = action.payload;
            // Устанавливаем фильтр в true, если он был false, и в false, если был true
            state.filtersBack[filterType] = !state.filtersBack[filterType];
            console.log(`Состояние фильтра изменено для вагона "обратно": ${filterType} = ${state.filtersBack[filterType]}`);
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
    },
});

export const { setFilterTo, setFilterBack, setId } = filterCarriagesSlice.actions;

export default filterCarriagesSlice.reducer;
