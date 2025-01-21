import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PassengerInfo {
  seatNumber: number;
  isAdult: boolean;
  coach_id: string;
}

interface DirectionSeats {
  total_seats: number;
  seat_numbers: PassengerInfo[];
  adults: number;
  children: number;
}

interface SeatsList {
  to: DirectionSeats;  // Места для направления "туда"
  back: DirectionSeats;  // Места для направления "обратно"
}

const initialDirectionState: DirectionSeats = {
  total_seats: 0,
  seat_numbers: [],
  adults: 0,
  children: 0,
};

const initialState: SeatsList = {
  to: { ...initialDirectionState },
  back: { ...initialDirectionState },
};

export const SeatsListSlice = createSlice({
  name: 'seats_list',
  initialState,
  reducers: {
    selectCoach: (state, action: PayloadAction<'to' | 'back'>) => {
      const direction = state[action.payload];
      direction.seat_numbers = [];
      direction.total_seats = 0;
      direction.adults = 0;
      direction.children = 0;
    },
    addSeat: (state, action: PayloadAction<{ direction: 'to' | 'back'; passenger: PassengerInfo }>) => {
      const { direction, passenger } = action.payload;
      const target = state[direction];
      target.seat_numbers.push(passenger);
      target.total_seats += 1;
      if (passenger.isAdult) {
        target.adults += 1;
      } else {
        target.children += 1;
      }
      console.log(`[addSeat] Добавлено место: ${JSON.stringify(passenger)}. Текущее состояние: ${JSON.stringify(state)}`);
    },
    removeSeat: (state, action: PayloadAction<{ direction: 'to' | 'back'; seatNumber: number }>) => {
      const { direction, seatNumber } = action.payload;
      const target = state[direction];
      const seatIndex = target.seat_numbers.findIndex(seat => seat.seatNumber === seatNumber);
      if (seatIndex >= 0) {
        const removedSeat = target.seat_numbers[seatIndex];
        target.seat_numbers.splice(seatIndex, 1);
        target.total_seats -= 1;
        if (removedSeat.isAdult) {
          target.adults -= 1;
        } else {
          target.children -= 1;
        }
        console.log(`[removeSeat] Удалено место: ${JSON.stringify(removedSeat)}. Текущее состояние: ${JSON.stringify(state)}`);
      }
    },
    clearSelectedSeats: (state) => {
      state.to = { ...initialDirectionState };
      state.back = { ...initialDirectionState };
    },
  },
});

export const { selectCoach, addSeat, removeSeat, clearSelectedSeats } = SeatsListSlice.actions;
export default SeatsListSlice.reducer;