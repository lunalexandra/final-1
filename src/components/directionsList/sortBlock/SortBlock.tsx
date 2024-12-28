import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setLimit, setSort } from "../../../redux/slices/sortSlice";
import { RootState } from "../../../redux/store";
import classes from "./sortBlock.module.css";

const SortBlock = () => {
  const dispatch = useAppDispatch();
  const { total_count } = useAppSelector(
    (state: RootState) => state.directions
  );
  const { limit, sort } = useAppSelector((state: RootState) => state.sort);

  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);

  const handleLimitChange = (newLimit: number) => {
    //console.log("Новое значение лимита:", newLimit);
    dispatch(setLimit(newLimit));
  };

  const handleSortChange = (newSort: "date" | "min-price" | "duration") => {
    dispatch(setSort(newSort));
    //console.log(newSort);
    setIsSortMenuVisible(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.found}>Найдено {total_count}</div>
      <div
        className={classes.sort}
        onMouseEnter={() => setIsSortMenuVisible(true)}
        onMouseLeave={() => setIsSortMenuVisible(false)}
      >
        сортировать по:
        {isSortMenuVisible ? (
          <div className={classes.dropdown}>
            <div
              onClick={() => handleSortChange("date")}
              className={classes.option}
            >
              по времени
            </div>
            <div
              onClick={() => handleSortChange("min-price")}
              className={classes.option}
            >
              по стоимости
            </div>
            <div
              onClick={() => handleSortChange("duration")}
              className={classes.option}
            >
              по длительности
            </div>
          </div>
        ) : (
          <div className={classes["dropdown-hidden"]}>
            <div className={classes.selected}>
              {sort === "date"
                ? "по времени"
                : sort === "min-price"
                ? "по стоимости"
                : "по длительности"}
            </div>
          </div>
        )}
      </div>
      <div className={classes.show}>
        Показывать по:
        <span
          onClick={() => handleLimitChange(5)}
          className={limit === 5 ? classes.active : ""}
        >
          5
        </span>
        <span
          onClick={() => handleLimitChange(10)}
          className={limit === 10 ? classes.active : ""}
        >
          10
        </span>
        <span
          onClick={() => handleLimitChange(20)}
          className={limit === 20 ? classes.active : ""}
        >
          20
        </span>
      </div>
    </div>
  );
};

export { SortBlock };
