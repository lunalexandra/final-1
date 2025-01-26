import { useState, useEffect } from "react";
import { RootState } from "../../../redux/store";
//import { addSeat } from "../../../redux/slices/seatsListSlice";
import { clearSelectedSeats } from "../../../redux/slices/seatsListSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TrainInfo } from "../../../types/TrainInfo";
import { Seats } from "../../../types/Seats";
import { FilterIcon } from "../filterIcon/FilterIcon";
import { TrainBlock } from "../trainBlock/TrainBlock";
import { ChoiceOfSeats } from "../choiceOfSeats/ChoiceOfSeats";
import { declinePassenger, declineChild } from "../../../helpers/wordForms";
import thereIcon from "../../../assets/images/seats/there.png";
import backIcon from "../../../assets/images/seats/back.png";
import class1Icon from "../../../assets/images/seats/1class.png";
import class2Icon from "../../../assets/images/seats/2class.png";
import class3Icon from "../../../assets/images/seats/3class.png";
import class4Icon from "../../../assets/images/seats/4class.png";
import class1IconActive from "../../../assets/images/seats/1class-yellow.png";
import class2IconActive from "../../../assets/images/seats/2class-yellow.png";
import class3IconActive from "../../../assets/images/seats/3class-yellow.png";
import class4IconActive from "../../../assets/images/seats/4class-yellow.png";
import classes from "./carriage.module.css";

interface CarriageProps {
  direction: TrainInfo | null;
  seats: Seats[];
  type: "туда" | "обратно";
  onReturn: () => void;
}

export const Carriage: React.FC<CarriageProps> = ({
  direction,
  seats,
  onReturn,
  type,
}) => {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState<"adult" | "child">("adult");
  const { to, back } = useAppSelector((state: RootState) => state.seats_list);
  const seatData = type === "туда" ? to : back;

  const handleReturn = () => {
    dispatch(clearSelectedSeats()); // Сбросьте выбранные места в Redux
    onReturn();
  };

  useEffect(() => {
    // Здесь вы можете выполнить действия при изменении seats
    console.log("Seats have changed:", seats);
    // Например, если вы хотите сбросить выбранные места при изменении списка мест
    dispatch(clearSelectedSeats());
  }, [seats, dispatch]);

  return (
    <div className={classes.container}>
      <div
        className={
          type === "туда" ? classes["topline-there"] : classes["topline-back"]
        }
      >
        <div className={classes.arrow}>
          {type === "туда" ? (
            <img src={thereIcon} alt="" />
          ) : (
            <img src={backIcon} alt="" />
          )}
        </div>
        <button className={classes.return} onClick={handleReturn}>
          Выбрать другой поезд
        </button>
      </div>

      <TrainBlock direction={direction} type={type} />

      <div className={classes["quantity-wrp"]}>
        <h3>Количество билетов</h3>
        <div className={classes.quantity}>
          <div
            onClick={() => {
              setSelectedType("adult");
            }}
            className={
              selectedType === "adult" ? classes.selected : classes.adults
            }
          >
            <div className={classes["quantity-box"]}>
              Взрослых - {seatData.adults}
            </div>
            <div className={classes.add}>
              Можно добавить еще {declinePassenger(3)}
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedType("child");
            }}
            className={
              selectedType === "child" ? classes.selected : classes.kids
            }
          >
            <div className={classes["quantity-box"]}>
              Детских - {seatData.children}
            </div>
            <div className={classes.add}>
              Можно добавить еще {declineChild(3)} до 10 лет.Свое место в
              вагоне, как у взрослых, но дешевле в среднем на 50-65%
            </div>
          </div>
          <div className={classes.babies}>
            <div className={classes["quantity-box"]}>
              <label htmlFor="">
                Детских «без места» -{" "}
                <input type="text" className={classes.input} placeholder="0" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.carriage}>
        <h3 className={classes["types-title"]}>Тип вагона</h3>
        <div className={classes.types}>
          <div className={classes.fourth}>
            <FilterIcon
              type={type}
              filterKey="have_fourth_class"
              activeImg={class4IconActive}
              inactiveImg={class4Icon}
              uniqueKey={`key-icon-have_fourth_class`}
            />
            <p className={classes["types-text"]}>Сидячий</p>
          </div>
          <div className={classes.third}>
            {" "}
            <FilterIcon
              type={type}
              filterKey="have_third_class"
              activeImg={class3IconActive}
              inactiveImg={class3Icon}
              uniqueKey={`key-icon-have_third_class`}
            />
            <p className={classes["types-text"]}>Плацкарт</p>
          </div>
          <div className={classes.second}>
            {" "}
            <FilterIcon
              type={type}
              filterKey="have_second_class"
              activeImg={class2IconActive}
              inactiveImg={class2Icon}
              uniqueKey={`key-icon-have_second_class`}
            />
            <p className={classes["types-text"]}>Купе</p>
          </div>
          <div className={classes.first}>
            {" "}
            <FilterIcon
              type={type}
              filterKey="have_first_class"
              activeImg={class1IconActive}
              inactiveImg={class1Icon}
              uniqueKey={`key-icon-have_first_class`}
            />
            <p className={classes["types-text"]}>Люкс</p>
          </div>
        </div>
        <ChoiceOfSeats
          seats={seats}
          type={type}
          isAdult={selectedType === "adult"}
        />

      </div>
    </div>
  );
};
