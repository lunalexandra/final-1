import { useState } from "react";
import { Range } from "react-range";
import { formatTime } from "./formatTime";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import {
  updatePriceRange,
  updateStartDepartureHour,
  updateStartArrivalHour,
  updateEndDepartureHour,
  updateEndArrivalHour,
} from "../../redux/slices/filterSlice";
import "./slider.css";


interface SliderProps {
  type:
    | "price"
    | "startDeparture"
    | "startArrival"
    | "endDeparture"
    | "endArrival"; // Разные типы слайдера
  min: number; // Минимальное значение
  max: number; // Максимальное значение
  step: number; // Шаг
}

const Slider: React.FC<SliderProps> = ({ type, min, max, step }) => {
  const dispatch = useAppDispatch();

  const price_from = useAppSelector((state: RootState) => state.filters.price_from ?? min);
  const price_to = useAppSelector((state: RootState) => state.filters.price_to ?? max);
  const start_departure_hour_from = useAppSelector(
    (state: RootState) => state.filters.start_departure_hour_from ?? min
  );
  const start_departure_hour_to = useAppSelector(
    (state: RootState) => state.filters.start_departure_hour_to ?? max 
  );
  const start_arrival_hour_from = useAppSelector(
    (state: RootState) => state.filters.start_arrival_hour_from ?? min
  );
  const start_arrival_hour_to = useAppSelector(
    (state: RootState) => state.filters.start_arrival_hour_to ?? max 
  );
  const end_departure_hour_from = useAppSelector(
    (state: RootState) => state.filters.end_departure_hour_from ?? min 
  );
  const end_departure_hour_to = useAppSelector(
    (state: RootState) => state.filters.end_departure_hour_to ?? max 
  );
  const end_arrival_hour_from = useAppSelector(
    (state: RootState) => state.filters.end_arrival_hour_from ?? min 
  );
  const end_arrival_hour_to = useAppSelector(
    (state: RootState) => state.filters.end_arrival_hour_to ?? max 
  );

  // Локальное состояние для значений слайдера
  const [values, setValues] = useState<number[]>(() => {
    switch (type) {
      case "price":
        return [price_from, price_to];
      case "startDeparture":
        return [start_departure_hour_from, start_departure_hour_to];
      case "startArrival":
        return [start_arrival_hour_from, start_arrival_hour_to];
      case "endDeparture":
        return [end_departure_hour_from, end_departure_hour_to];
      case "endArrival":
        return [end_arrival_hour_from, end_arrival_hour_to];
      default:
        return [min, max];
    }
  });

  // Обновляем Redux только при завершении изменения
  const handleFinalChange = (newValues: number[]) => {
    setValues(newValues);
    switch (type) {
      case "price":
        dispatch(updatePriceRange({ from: newValues[0], to: newValues[1] }));
        break;
      case "startDeparture":
        dispatch(updateStartDepartureHour({ from: newValues[0], to: newValues[1] }));
        break;
      case "startArrival":
        dispatch(updateStartArrivalHour({ from: newValues[0], to: newValues[1] }));
        break;
      case "endDeparture":
        dispatch(updateEndDepartureHour({ from: newValues[0], to: newValues[1] }));
        break;
      case "endArrival":
        dispatch(updateEndArrivalHour({ from: newValues[0], to: newValues[1] }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="slider-container">
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={setValues}
        onFinalChange={handleFinalChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              display: "flex",
              width: "100%",
              height: type === "price" ? "19px" : "10px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "1px solid #C4C4C4",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${((values[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                height: type === "price" ? "19px" : "10px",
                backgroundColor: "#FFA800", 
                zIndex: 1,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          return (
            <div
              {...props}
              style={{
                height: type === "price" ? "24px" : "20px",
                width: type === "price" ? "24px" : "20px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                position: "absolute",
                zIndex: "20",
              }}
            >
              <div
                className="thumb-value"
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "400",
                  width: "60px",
                  textAlign: "end",
                  left: `${(values[0] / max) * 100}%`,
                  right: `${100 - (values[1] / max) * 100}%`,
                }}
              >
                {type === "price"
                  ? index === 0
                    ? values[0]
                    : values[1]
                  : index === 0
                  ? formatTime(values[0])
                  : formatTime(values[1])}
              </div>
            </div>
          );
        }}
      />
      <div className="min-max"></div>
    </div>
  );
};

export default Slider;
