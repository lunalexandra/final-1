import { useState, useEffect } from "react";
import { setOffset } from "../../../redux/slices/sortSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import backImage from "../../../assets/images/trains/back.png";
import aheadImage from "../../../assets/images/trains/ahead.png";
import classes from "./pagination.module.css";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { total_count } = useAppSelector(
      (state: RootState) => state.directions
    );
  const { limit = 5 } = useAppSelector((state: RootState) => state.sort);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = total_count;
  const totalPages = Math.ceil(totalItems / limit); // Общее количество страниц

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Проверка на допустимость страницы
    setCurrentPage(pageNumber);
    dispatch(setOffset((pageNumber - 1) * limit)); // Обновляем offset для получения данных
    //console.log(`знаечние оффсет ${offset}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  useEffect(() => {
    handlePageChange(currentPage); // Запрос данных для текущей страницы
  }, [currentPage, dispatch]);

  return (
    <>
      {totalItems !== 0 && (
        <div className={classes.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={classes.back}
          >
            <img src={backImage} alt="назад" className={classes.arrows}/>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${classes["page-button"]} ${
                currentPage === index + 1 ? classes.active : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={classes.ahead}
          >
            <img src={aheadImage} alt="далее" className={classes.arrows}/>
          </button>
        </div>
      )}
    </>
  );
};

export {Pagination};
