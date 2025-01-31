
import classes from "./changeBtn.module.css";

interface ChangeBtnProps {
  onClick: () => void;
}

export const ChangeBtn: React.FC<ChangeBtnProps> = ({ onClick }) => {

  return (
    <button type="button" className={classes.change} onClick={onClick}>
      Изменить
    </button>
  );
};
