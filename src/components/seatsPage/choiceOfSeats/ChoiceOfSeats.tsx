import { useEffect } from "react";
import { Seats } from "../../../types/Seats";
import {
  clearSeats,
  selectCoachTo,
  selectCoachBack,
} from "../../../redux/slices/seatsSlice";
import { formattedPrice } from "../../../helpers/formattedPrice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { FacilitiesBlock } from "../facilitiesBlock/FacilitiesBlock";
import { RootState } from "../../../redux/store";
import { FirstClass } from "../carriageMap/FirstClass";
import { SecondClass } from "../carriageMap/SecondClass";
import { ThirdClass } from "../carriageMap/ThirdClass";
import { FourthClass } from "../carriageMap/FourthClass";
import classes from "./choiceOfSeats.module.css";

const classTypeComponents: Record<
  string,
  React.FC<{
    seats: { index: number; available: boolean }[] | undefined;
    isAdult: boolean;
    coach_id: string;
    price: { top?: number; bottom?: number; standard?: number };
    directionType: "туда" | "обратно";
  }>
> = {
  first: FirstClass,
  second: SecondClass,
  third: ThirdClass,
  fourth: FourthClass,
};

interface ChoiceOfSeatsProps {
  seats: Seats[];
  type: "туда" | "обратно";
  isAdult: boolean;
}

export const ChoiceOfSeats: React.FC<ChoiceOfSeatsProps> = ({
  seats,
  type,
  isAdult,
}) => {
  const dispatch = useAppDispatch();
  const { selectedCoachTo, selectedCoachBack } = useAppSelector(
    (state: RootState) => state.seats
  );
  const selectedCoaches = type === "туда" ? selectedCoachTo : selectedCoachBack;
  const { to, back } = useAppSelector((state: RootState) => state.seats_list);
  const seatData = type === "туда" ? to : back;

  const extractNumbers = (name: string | undefined) => {
    return name ? name.replace(/\D/g, "") : "";
  };

  const coachNames = [...new Set(seats.map((item) => item.coach.name))];

  const handleCoachClick = (coach: Seats) => {
    dispatch(type === "туда" ? selectCoachTo(coach) : selectCoachBack(coach));
  };

  useEffect(() => {
    dispatch(clearSeats()); // Очищаем выбор вагонов при изменении направления
  }, [type, dispatch]);

  return (
    <>
      <div className={classes.numbers}>
        <p>
          Вагоны
          {coachNames.map((coachName) => {
            const isSelected = selectedCoaches?.some(
              (coach) => coach.coach.name === coachName
            );
            return (
              <span
                key={coachName}
                className={
                  isSelected ? classes.selectedCoach : classes.coachName
                }
                onClick={() =>
                  handleCoachClick(
                    seats.find((seat) => seat.coach.name === coachName)!
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {coachName}
              </span>
            );
          })}
        </p>
        <p className={classes["head-tail"]}>
          Нумерация вагонов начинается с головы поезда
        </p>
      </div>
      {seats.length === 0 ? (
        <div className={classes.empty}>Мест нет</div>
      ) : (
        <>
        <div className={classes["carriages-box"]}>
                 {selectedCoaches?.map((coach, index) => {
            const CoachComponent =
              classTypeComponents[coach.coach.class_type || "first"];
            return (
              <div  key={index}>
                <div className={classes.info}>
                  <div className={classes["carriage-number"]}>
                    <div>
                      <p className={classes.numeric}>
                        {extractNumbers(coach.coach.name)}
                      </p>
                      <div className={classes["word-carriage"]}>вагон</div>
                    </div>
                  </div>
                  <div className={classes.places}>
                    <div className={classes.total}>
                      Места{" "}
                      <span className={classes["total-number"]}>
                        {coach.coach.available_seats}
                      </span>
                    </div>
                    <div className={classes["upper"]}>
                      {coach.coach.class_type === "first" ||
                      coach.coach.class_type === "fourth" ? (
                        ""
                      ) : (
                        <>
                          <span>Верхние</span>
                          {""}
                        </>
                      )}
                    </div>
                    <div className={classes["lower"]}>
                      {coach.coach.class_type === "first" ||
                      coach.coach.class_type === "fourth" ? (
                        ""
                      ) : (
                        <>
                          <span>Нижние</span>
                          {""}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={classes.cost}>
                    <div className={classes["cost-title"]}>Стоимость</div>
                    {coach.coach.class_type === "first" ||
                    coach.coach.class_type === "fourth" ? (
                      <div className={classes["price"]}>
                        {coach.coach.price} <span>₽</span>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <div className={classes["top_price"]}>
                          {coach.coach.top_price} <span>₽</span>
                        </div>
                        <div className={classes["bottom_price"]}>
                          {coach.coach.bottom_price} <span>₽</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={classes.service}>
                    <p>Обслуживание ФПК</p>
                    <div className={classes.facilities}>
                      <FacilitiesBlock seats={null} />
                    </div>
                  </div>
                </div>

                <div className={classes["coach-map-wrp"]}>
                  <CoachComponent
                    seats={coach.seats}
                    directionType={type}
                    isAdult={isAdult}
                    coach_id={coach.coach._id}
                    price={{
                      top: coach.coach.top_price,
                      bottom: coach.coach.bottom_price,
                      standard: coach.coach.price, // Используем для люкса и четвертого класса
                    }}
                  />
                </div>
              </div>
            );
          })} 
   {selectedCoaches.length > 0 && (
              <div className={classes.sum}>
                {formattedPrice(seatData.total_price)} <span>₽</span>
              </div>
            )}
        </div>
        </>
      )}
    </>
  );
};
