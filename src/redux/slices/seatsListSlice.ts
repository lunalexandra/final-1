import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PassengerInfo {
  seatNumber: number;
  isAdult: boolean;
  coach_id: string;
  price: number;
}

interface DirectionSeats {
  total_seats: number;
  seat_numbers: PassengerInfo[];
  total_price: number;
  adults: number;
  children: number;
  total_adult_price: number;
  total_children_price: number;
}

interface SeatsList {
  to: DirectionSeats;
  back: DirectionSeats;
  total_combined_price: number;  // Общая стоимость обоих направлений
  total_adult_price: number;
  total_children_price: number;
}

const initialDirectionState: DirectionSeats = {
  total_seats: 0,
  seat_numbers: [],
  total_price: 0,
  adults: 0,
  children: 0,
  total_adult_price: 0,
  total_children_price: 0,
};

const initialState: SeatsList = {
  to: { ...initialDirectionState },
  back: { ...initialDirectionState },
  total_combined_price: 0,
  total_adult_price: 0,
  total_children_price: 0,
};

export const SeatsListSlice = createSlice({
  name: "seats_list",
  initialState,
  reducers: {
    updateTotalPrices: (state) => {
      state.total_combined_price = state.to.total_price + state.back.total_price;
      state.total_adult_price = state.to.total_adult_price + state.back.total_adult_price;
      state.total_children_price = state.to.total_children_price + state.back.total_children_price;
    },
    addSeat: (
      state,
      action: PayloadAction<{ direction: "to" | "back"; passenger: PassengerInfo }>
    ) => {
      const { direction, passenger } = action.payload;
      const target = state[direction];
      target.seat_numbers.push(passenger);
      target.total_seats += 1;
      target.total_price += passenger.price;
      if (passenger.isAdult) {
        target.adults += 1;
        target.total_adult_price += passenger.price;
      } else {
        target.children += 1;
        target.total_children_price += passenger.price;
      }
      state.total_combined_price = state.to.total_price + state.back.total_price;
      state.total_adult_price = state.to.total_adult_price + state.back.total_adult_price;
      state.total_children_price = state.to.total_children_price + state.back.total_children_price;
    },
    removeSeat: (
      state,
      action: PayloadAction<{ direction: "to" | "back"; seatNumber: number }>
    ) => {
      const { direction, seatNumber } = action.payload;
      const target = state[direction];
      const seatIndex = target.seat_numbers.findIndex(
        (seat) => seat.seatNumber === seatNumber
      );
      if (seatIndex >= 0) {
        const removedSeat = target.seat_numbers[seatIndex];
        target.total_price -= removedSeat.price;
        if (removedSeat.isAdult) {
          target.adults -= 1;
          target.total_adult_price -= removedSeat.price;
        } else {
          target.children -= 1;
          target.total_children_price -= removedSeat.price;
        }
        target.seat_numbers.splice(seatIndex, 1);
        target.total_seats -= 1;
        state.total_combined_price = state.to.total_price + state.back.total_price;
        state.total_adult_price = state.to.total_adult_price + state.back.total_adult_price;
        state.total_children_price = state.to.total_children_price + state.back.total_children_price;
      }
    },
    clearSelectedSeats: (state) => {
      state.to = { ...initialDirectionState };
      state.back = { ...initialDirectionState };
      state.total_combined_price = 0;
      state.total_adult_price = 0;
      state.total_children_price = 0;
    },
  },
});

export const { addSeat, removeSeat, clearSelectedSeats } = SeatsListSlice.actions;
export default SeatsListSlice.reducer;
