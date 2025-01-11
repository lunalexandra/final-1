import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  FilterOptions,
  setFilterTo,
  setFilterBack,
} from "../../../redux/slices/filterCarriagesSlice";
import { RootState } from "../../../redux/store";

interface ImageFilterProps {
  filterKey?: // Сделаем filterKey необязательным
    | keyof FilterOptions["filtersTo"]
    | keyof FilterOptions["filtersBack"];
  activeImg: string;
  inactiveImg: string;
  uniqueKey: string;
  type: "туда" | "обратно";
  sendRequest?: (filterKey?: string) => void; // Также делаем filterKey необязательным в sendRequest
}

export const FilterIcon: React.FC<ImageFilterProps> = ({
  filterKey,
  activeImg,
  inactiveImg,
  uniqueKey,
  type,
  sendRequest, // Получаем функцию для отправки запроса
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = useAppSelector((state: RootState) =>
    type === "туда"
      ? state.filterCarriages.filtersTo[filterKey as keyof FilterOptions["filtersTo"]]
      : state.filterCarriages.filtersBack[filterKey as keyof FilterOptions["filtersBack"]]
  );

  const handleClick = () => {
    // Проверяем текущее состояние фильтра
    if (filterKey && !isSelected) {
      // Если filterKey передан и фильтр не выбран, устанавливаем его
      if (type === "туда") {
        dispatch(setFilterTo(filterKey as keyof FilterOptions["filtersTo"]));
      } else {
        dispatch(setFilterBack(filterKey as keyof FilterOptions["filtersBack"]));
      }

      // Если передана функция для отправки запроса, вызываем ее
      if (sendRequest) {
        sendRequest(filterKey); // Передаем filterKey, который может быть undefined
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      key={uniqueKey}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? activeImg : (isSelected ? activeImg : inactiveImg)}
        alt={filterKey ? filterKey : 'фильтр'} // Используем дефолтное значение для alt
        style={{ height: "50px" }}
      />
    </div>
  );
};
