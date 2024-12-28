import { useNavigate } from 'react-router-dom';
import classes from "./findTicketsBtn.module.css";

export const FindTicketsBtn = () => {

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //console.log("click: find ticket");
    navigate(`/trains`);
  };

    return (
        <button
        type="submit"
        className={classes["find-tickets-btn"]}
        onClick={handleClick}
      >
        НАЙТИ БИЛЕТЫ
      </button>
    )
}