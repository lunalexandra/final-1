import { setOffset } from "../../../redux/slices/sortSlice";
import { setCurrentPage } from "../../../redux/slices/currentPageSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import backImage from "../../../assets/images/trains/back.png";
import aheadImage from "../../../assets/images/trains/ahead.png";
import classes from "./pagination.module.css";

const Pagination = () => {
    const dispatch = useAppDispatch();
    const { total_count } = useAppSelector((state: RootState) => state.directions);
    const { limit = 5 } = useAppSelector((state: RootState) => state.sort);
    const currentPage = useAppSelector((state: RootState) => state.currentPage.currentPage);

    const totalPages = Math.ceil(total_count / limit);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;

        dispatch(setCurrentPage(pageNumber));
        dispatch(setOffset((pageNumber - 1) * limit));
    };

    const changePage = (direction: 'next' | 'prev') => {
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        handlePageChange(newPage);
    };

    const renderPageNumbers = () => {
      const pageNumbers: (number | string)[] = [];
  
      // Добавляем первую страницу
      if (totalPages > 0) pageNumbers.push(1);
  
      // Добавляем вторую страницу и "..." если необходимо
      if (totalPages > 2) {
          if (currentPage > 2) pageNumbers.push(2);
          if (currentPage > 3) pageNumbers.push("...");
      }
  
      // Добавляем номера страниц вокруг текущей страницы
      if (currentPage > 1 && currentPage < totalPages) {
          pageNumbers.push(currentPage);
      }
  
      // Добавляем "..." перед последней страницей, если это необходимо
      if (currentPage < totalPages - 1) {
          pageNumbers.push("...");
      }
  
      // Добавляем последнюю страницу
      if (totalPages > 1) pageNumbers.push(totalPages);
  
      // Добавляем третью страницу, если всего 3 страницы
      if (totalPages === 3 && !pageNumbers.includes(3)) {
          pageNumbers.splice(1, 0, 3); // Вставляем третью страницу на вторую позицию
      }
  
      return pageNumbers.map((number, index) => (
          number === "..." ? (
              <span key={`pag-${index}`} className={classes.dots}>...</span>
          ) : (
              <button
                  key={`pagination-${number}`}
                  onClick={() => handlePageChange(number as number)}
                  className={`${classes["page-button"]} ${currentPage === number ? classes.active : ""}`}
              >
                  {number}
              </button>
          )
      ));
  };
  
    return (
        <>
            {total_count > 0 && (
                <div className={classes.pagination}>
                    <button onClick={() => changePage('prev')} className={classes.back} disabled={currentPage === 1}>
                        <img src={backImage} alt="назад" className={classes.arrows} />
                    </button>
                    {renderPageNumbers()}
                    <button onClick={() => changePage('next')} className={classes.ahead} disabled={currentPage === totalPages}>
                        <img src={aheadImage} alt="далее" className={classes.arrows} />
                    </button>
                </div>
            )}
        </>
    );
};

export { Pagination };
