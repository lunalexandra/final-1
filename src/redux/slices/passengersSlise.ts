import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OrderRequest, UserInfo, RouteInfo, SeatInfo } from '../../types/IPassengers';

const initialState: {
  order: OrderRequest;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
} = {
  order: {
    user: {
      first_name: '',
      last_name: '',
      patronymic: '',
      phone: '',
      email: '',
      payment_method: 'cash',
    },
    departure: {
      route_direction_id: '',
      seats: [],
    },
    arrival: {
      route_direction_id: '',
      seats: [],
    },
  },
  status: 'idle',
  error: null,
};

// Асинхронный thunk для отправки данных
export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (order: OrderRequest, { rejectWithValue }) => {
    try {
      const response = await fetch('https://students.netoservices.ru/fe-diplom/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      return data; // Возвращаем успешный результат
    } catch (error) {
      console.log(`Ошибка: ${error}`);
      return rejectWithValue("Произошла ошибка при отправке данных.");
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Обновление данных пользователя
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.order.user = action.payload;
    },
    // Установка данных для отправления
    setDeparture: (state, action: PayloadAction<RouteInfo>) => {
      state.order.departure = action.payload;
    },
    // Установка данных для возвращения
    setArrival: (state, action: PayloadAction<RouteInfo>) => {
        if (action.payload) {
            state.order.arrival = action.payload;
          } else {
            state.order.arrival = { route_direction_id: '', seats: [] }; // Сброс данных при отсутствии arrival
          }
    },
    addUserInfo: (state, action: PayloadAction<UserInfo>) => {
        state.order.user = { ...state.order.user, ...action.payload }; // Объединение текущих данных с новыми
        console.log('Добавлен пользователь:', JSON.parse(JSON.stringify(state.order.user)));
      },
    // Добавление места
    addSeat: (state, action: PayloadAction<{ route: 'departure' | 'arrival'; seat: SeatInfo }>) => {
        const { route, seat } = action.payload;
        if (route === 'departure') {
          state.order.departure.seats.push(seat);
          console.log('Добавлено место для отправления:', JSON.parse(JSON.stringify(state.order.departure.seats)));
        } else if (state.order.arrival) { // Проверяем, есть ли arrival
          state.order.arrival.seats.push(seat);
          console.log('Добавлено место для возвращения:', JSON.parse(JSON.stringify(state.order.arrival.seats)));
        }
    },
    // Удаление места
    removeSeat: (state, action: PayloadAction<{ route: 'departure' | 'arrival'; seatNumber: number }>) => {
        const { route, seatNumber } = action.payload;
        if (route === 'departure') {
          state.order.departure.seats = state.order.departure.seats.filter(seat => seat.seat_number !== seatNumber);
        } else if (state.order.arrival) { // Проверяем, есть ли arrival
          state.order.arrival.seats = state.order.arrival.seats.filter(seat => seat.seat_number !== seatNumber);
        }
    },
    // Очистка состояния
    clearOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const { setUserInfo, setDeparture, setArrival, addSeat, addUserInfo, removeSeat, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
