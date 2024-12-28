import { useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { RootState } from "../../redux/store";
import calendar from "../../assets/images/calendar.png";
import { setDateFrom, setDateTo } from "../../redux/slices/dateSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

interface CalendarProps {
  id: string;
  classname?: string;
  classnameImg?: string;
  type: "date_start" | "date_end";
}

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ id, classname, type, classnameImg}) => {
  const dispatch = useAppDispatch();

  const startDateValue = useAppSelector(
    (state: RootState) => state.dates.date_start
  );

  const endDateValue = useAppSelector(
    (state: RootState) => state.dates.date_end
  );

  const [startDate, setStartDate] = useState<Date | null>(
    startDateValue ? new Date(startDateValue) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    endDateValue ? new Date(endDateValue) : null
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      const day = String(date.getDate()).padStart(2, "0");
  
      const formattedDate = `${year}-${month}-${day}`;
  
      if (type === "date_start") {
        dispatch(setDateFrom(formattedDate)); // Сохраняем дату отправления
        setStartDate(date); // Устанавливаем начальную дату
        //console.log(`сохраняем в стейт дату start`);
      } else {
        dispatch(setDateTo(formattedDate)); // Сохраняем дату прибытия
        setEndDate(date); // Устанавливаем конечную дату
        //console.log(`сохраняем в стейт дату end`);
      }
    } else {
      // Если дата null (пользователь стер поле), сбрасываем в пустую строку
      if (type === "date_start") {
        dispatch(setDateFrom("")); // Сбрасываем дату отправления в пустую строку
        setStartDate(null); // Сбрасываем startDate
      } else {
        dispatch(setDateTo("")); // Сбрасываем дату прибытия в пустую строку
        setEndDate(null); // Сбрасываем endDate
      }
    }
  };
  

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: CustomHeaderProps) => {
    const month = date.toLocaleString("ru-RU", { month: "long" });

    return (
      <div className="react-datepicker__current-month">
        <button
          className="decrease-month-arrow"
          onClick={(e) => {
            e.preventDefault();
            decreaseMonth();
          }}
        >
          {"◀"}
        </button>
        <span>{month}</span>
        <button
          className="increase-month-arrow"
          onClick={(e) => {
            e.preventDefault();
            increaseMonth();
          }}
        >
          {"▶"}
        </button>
      </div>
    );
  };

  return (
    <div className="calendar">
      <DatePicker
        id={id}
        locale={ru}
        selected={type === "date_start" ? startDate : endDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="ДД/ММ/ГГ"
        className={classname}
        popperPlacement="bottom-start"
        renderCustomHeader={renderCustomHeader}
      />

      <button
        type="button"
        onClick={() => document.getElementById(id)?.focus()}
        className={classnameImg}
      >
        <img src={calendar} alt="calendar" className="custom-button-img" />
      </button>
    </div>
  );
};
