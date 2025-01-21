import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  FilterOptions,
  setFilterTo,
  setFilterBack,
} from "../../../redux/slices/filterCarriagesSlice";
import { RootState } from "../../../redux/store";

interface ImageFilterProps {
  filterKey?:
    | keyof FilterOptions["filtersTo"]
    | keyof FilterOptions["filtersBack"];
  activeImg: string;
  inactiveImg: string;
  uniqueKey: string;
  type: "туда" | "обратно";
}

export const FilterIcon: React.FC<ImageFilterProps> = ({
  filterKey,
  activeImg,
  inactiveImg,
  uniqueKey,
  type,
}) => {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state: RootState) =>
    type === "туда"
      ? state.filterCarriages.filtersTo[filterKey as keyof FilterOptions["filtersTo"]]
      : state.filterCarriages.filtersBack[filterKey as keyof FilterOptions["filtersBack"]]
  );

  const handleClick = () => {
    if (filterKey) {
      if (type === "туда") {
        dispatch(setFilterTo(filterKey as keyof FilterOptions["filtersTo"]));
      } else {
        dispatch(setFilterBack(filterKey as keyof FilterOptions["filtersBack"]));
      }
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      style={{ cursor: "pointer" }}
      key={uniqueKey}
    >
      <img
        src={isSelected ? activeImg : inactiveImg}
        alt={filterKey || 'фильтр'}
        //style={{ height: "50px" }}
      />
    </div>
  );
};
