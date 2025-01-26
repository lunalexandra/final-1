import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Seats } from "../../types/Seats";
import { RootState } from "../store";

interface SeatsState {
  seatsTo: Seats[]; // Места для направления "туда"
  seatsBack: Seats[]; // Места для направления "обратно"
  loading: boolean;
  error: string | null;
  selectedCoachTo: Seats []| null; // Выбранный вагон для направления "туда"
  selectedCoachBack: Seats [] | null; // Выбранный вагон для направления "обратно"
}

const initialState: SeatsState = {
  seatsTo: [],
  seatsBack: [],
  loading: false,
  error: null,
  selectedCoachTo: [],
  selectedCoachBack: [],
};

// Асинхронное действие для загрузки мест "туда"
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

    const response = await fetch(
      `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch seats to");
    }
    return await response.json();
  }
);

// Асинхронное действие для загрузки мест "обратно"
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
      state.selectedCoachTo = null;
      state.selectedCoachBack = null;
    },
    // Теперь сохраняем не строку, а объект вагона
    selectCoachTo(state, action: PayloadAction<Seats[]>) {
      state.selectedCoachTo = action.payload;
    },
    selectCoachBack(state, action: PayloadAction<Seats[]>) {
      state.selectedCoachBack = action.payload;
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


// passenger


// import { useState } from "react";
// import { PersonInfo } from "../../../types/IPassengers";
// import { addSeat } from "../../../redux/slices/passengersSlise";
// import { RootState } from "../../../redux/store";
// import { SelectAge } from "../selectAge/SelectAge";
// import { SelectDocument } from "../selectDocument/selectDocument";
// import { useAppDispatch, useAppSelector } from "../../../hooks";
// import classes from "./passenger.module.css";

// interface PassengerProps {
//   number: number;
//   seatNumber: number
// }

// export const Passenger: React.FC<PassengerProps> = ({ number, seatNumber }) => {
//   const dispatch = useAppDispatch();
//   const { to,  } = useAppSelector((state: RootState) => state.seats_list);
//   const [personInfo, setPersonInfo] = useState<PersonInfo>({
//     is_adult: true,
//     first_name: "",
//     last_name: "",
//     patronymic: "",
//     gender: true,
//     birthday: "",
//     document_type: "",
//     document_data: "",
//   });

//   const [isExpandedPassenger, setIsExpandedPassenger] =
//     useState<boolean>(false);
//   const [passportSeries, setPassportSeries] = useState<string>("");
//   const [passportNumber, setPassportNumber] = useState<string>("");

//   const toggleExpandedPassenger = () => {
//     setIsExpandedPassenger((prevState) => !prevState);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPersonInfo({
//       ...personInfo,
//       [name]: name === "is_adult" ? value === "true" : value,
//     });
//   };

//   const handlePassportSeriesChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPassportSeries(e.target.value);
//   };

//   const handlePassportNumberChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPassportNumber(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (seatNumber !== null) {
//       const seat = {
//         coach_id: to.seat_numbers[0]?.coach_id || "",
//         seatNumber: seatNumber,
//         isAdult: personInfo.is_adult,
//       };
//       const seatBack = {
//         coach_id: back.seat_numbers[0]?.coach_id || "",
//         seatNumber: seatNumber,
//         isAdult: personInfo.is_adult,
//       };

//       // Объединяем серию и номер паспорта
//       const fullDocumentData = `${passportSeries} ${passportNumber}`;
//       dispatch(
//         addSeat({
//           route: "departure",
//           seat: { ...personInfo, document_data: fullDocumentData },
//         })
//       );
//       dispatch(
//         addSeat({
//           route: "arrival",
//           seat: { ...seatBack, document_data: fullDocumentData },
//         })
//       );
//     }
//   };

//   const handleSelectChange = (value: string) => {
//     setPersonInfo((prevInfo) => ({
//       ...prevInfo,
//       is_adult: value === "true",
//     }));
//   };

//   const handleSelectDocumentChange = (value: string) => {
//     setPersonInfo((prevInfo) => ({
//       ...prevInfo,
//       document_type: value,
//     }));
//   };

//   return (
//     <>
//       <form className={classes.form} onSubmit={handleSubmit}>
//         <div className={classes.topline}>
//           <button
//             type="button"
//             onClick={toggleExpandedPassenger}
//             className={isExpandedPassenger ? classes.minus : classes.plus}
//           >
//             {isExpandedPassenger ? "—" : "+"}
//           </button>
//           <div className={classes.title}>
//             <p>
//               Пассажир <span className={classes.number}>{number}</span>
//             </p>
//           </div>
//           <button type="button" className={classes.cross}>
//             ✖
//           </button>
//         </div>
//         {isExpandedPassenger && (
//           <>
//             <SelectAge
//               value={personInfo.is_adult ? "true" : "false"}
//               onChange={handleSelectChange}
//               options={[
//                 { value: "true", label: "Взрослый" },
//                 { value: "false", label: "Детский" },
//               ]}
//             />
//             <div className={classes["complete-name"]}>
//               <div className={classes["input-container"]}>
//                 <label htmlFor="first_name" className={classes.label}>
//                   Имя
//                 </label>
//                 <input
//                   id="first_name"
//                   type="text"
//                   name="first_name"
//                   value={personInfo.first_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className={classes["input-container"]}>
//                 <label htmlFor="last_name" className={classes.label}>
//                   Фамилия
//                 </label>
//                 <input
//                   id="last_name"
//                   type="text"
//                   name="last_name"
//                   value={personInfo.last_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className={classes["input-container"]}>
//                 <label htmlFor="patronymic" className={classes.label}>
//                   Отчество
//                 </label>
//                 <input
//                   id="patronymic"
//                   type="text"
//                   name="patronymic"
//                   value={personInfo.patronymic}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className={classes["gender-date-box"]}>
//               <div>
//                 <label className={classes.label}>Пол</label>
//                 <div className={classes["radio-container"]}>
//                   <div className={classes["castom-radio"]}>
//                     <input
//                       id="gender_male"
//                       type="radio"
//                       name="gender"
//                       value="true"
//                       className={classes.radio}
//                       checked={personInfo.gender === true}
//                       onChange={() =>
//                         setPersonInfo({ ...personInfo, gender: true })
//                       }
//                     />
//                     <label
//                       htmlFor="gender_male"
//                       className={
//                         personInfo.gender === true ? classes.selected : ""
//                       }
//                     >
//                       М
//                     </label>
//                   </div>
//                   <div className={classes["castom-radio"]}>
//                     <input
//                       id="gender_female"
//                       type="radio"
//                       name="gender"
//                       value="false"
//                       className={classes.radio}
//                       checked={personInfo.gender === false}
//                       onChange={() =>
//                         setPersonInfo({ ...personInfo, gender: false })
//                       }
//                     />
//                     <label
//                       htmlFor="gender_female"
//                       className={
//                         personInfo.gender === false ? classes.selected : ""
//                       }
//                     >
//                       Ж
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className={classes["date-container"]}>
//                 <label htmlFor="birthday" className={classes.label}>
//                   Дата рождения
//                 </label>
//                 <input
//                   type="date"
//                   name="birthday"
//                   value={personInfo.birthday}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className={classes.checkbox}>
//               <input type="checkbox" id="checkbox" name="" />
//               <label htmlFor="checkbox" className={classes["checkbox-label"]}>
//                 ограниченная подвижность
//               </label>
//             </div>

//             <div className={classes.documents}>
//               <div className={classes.type}>
//                 <div className={classes.label}>Тип документа</div>
//                 <SelectDocument
//                   value={personInfo.document_type}
//                   onChange={handleSelectDocumentChange}
//                   options={[
//                     { value: "passport", label: "Паспорт РФ" },
//                     {
//                       value: "birth_certificate",
//                       label: "Свидетельство о рождении",
//                     },
//                   ]}
//                 />
//               </div>

//               {personInfo.document_type === "passport" ? (
//                 <>
//                   <div className={classes["passport-series"]}>
//                     <label htmlFor="passport-series" className={classes.label}>
//                       Серия
//                     </label>
//                     <input
//                       id="passport-series"
//                       type="text"
//                       value={passportSeries}
//                       className={classes["passport-series-input"]}
//                       onChange={handlePassportSeriesChange}
//                       placeholder="__  __  __  __"
//                       required
//                     />
//                   </div>
//                   <div className={classes["passport-number"]}>
//                     <label htmlFor="passport-number" className={classes.label}>
//                       Номер
//                     </label>
//                     <input
//                       id="passport-number"
//                       type="text"
//                       value={passportNumber}
//                       className={classes["passport-number-input"]}
//                       onChange={handlePassportNumberChange}
//                       placeholder="__  __  __  __  __  __"
//                       required
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                 <div className={classes["birth-number"]}>
//                 <label htmlFor="birth-number" className={classes.label}>
//                       Номер
//                     </label>
//                    <input
//                    id="birth-number"
//                     type="text"
//                     name="document_data"
//                     value={personInfo.document_data}
//                     onChange={handleChange}
//                     className={classes["birth-number-input"]}
//                     placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
//                     required
//                   />
//                 </div>
                 
//                 </>
//               )}
//             </div>

//             <button type="submit" className={classes.submitButton}>
//               Добавить пассажира
//             </button>
//           </>
//         )}
//       </form>
//     </>
//   );
// };
