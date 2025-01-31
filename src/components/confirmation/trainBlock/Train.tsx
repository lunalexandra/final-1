import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { RootState } from "../../../redux/store";
import { clearOrder } from "../../../redux/slices/passengersSlise";
import { ChangeBtn } from "../changeBtn/ChangeBtn";
import { convertSecondsToTime } from "../../../helpers/convertSecondsToTime";
import { formattedPrice } from "../../../helpers/formattedPrice";
import arrowRight from "../../../assets/images/trains/right.png";
import arrowLeft from "../../../assets/images/trains/left.png";
import trainIcon from "../../../assets/images/trains/train.png";
import icons from "../../../assets/images/triple.png";
import classes from "./train.module.css";

const types = {
  first: "люкс",
  second: "купе",
  third: "плацкарт",
  fourth: "сидячий",
} as const;

type SeatType = keyof typeof types;

interface SeatsInfo {
  [key: string]: number | null;
}

// Интерфейс для информации о ценах
interface PriceInfo {
  [key: string]: {
    bottom_price: number;
  };
}

export const Train = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();
  const direction = useAppSelector((state: RootState) => state.selectedDirection.direction);

  if (!direction || !direction.departure) {
    return
  }

  const availableSeatsInfo: SeatsInfo = direction.available_seats_info || {};
  const priceInfo: PriceInfo = direction.departure.price_info || {};

  const onChangeDirection = () => {
    navigate(`/trains`)
    dispatch(clearOrder());
      }

  return (
    <>

      <div className={classes.container}>
        <div className={classes.train}>
          <div className={classes.icon}>
            <img src={trainIcon} alt="" className={classes.img} />
          </div>
          <div className={classes.number}>{direction.departure.train.name}</div>
          <div className={classes.cities}>
            <p className={classes.initial}>{direction.departure.from.city.name} ➔</p>
            <p className={classes.from}>{direction.departure.from.city.name} ➔</p>
            <p className={classes.to}>{direction.departure.to.city.name}</p>
          </div>
        </div>
        <div className={classes["time-box"]}>
          <div className={classes["departure-box"]}>
            <div className={classes["departure-box__from"]}>
              <div className={classes.time}>
                {new Date(direction.departure.from.datetime * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className={classes.city}>{direction.departure.from.city.name}</div>
              <div className={classes.station}>{direction.departure.from.railway_station_name}</div>
            </div>

            <div className={classes.direction}>
              <div className={classes.duration}>
                {convertSecondsToTime(direction.departure.duration)}
              </div>
              <img src={arrowRight} alt="" className={classes.arrow} />
            </div>

            <div className={classes["departure-box__to"]}>
              <div className={classes.time}>
                {new Date(direction.departure.to.datetime * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className={classes.city}>{direction.departure.to.city.name}</div>
              <div className={classes.station}>{direction.departure.to.railway_station_name}</div>
            </div>
          </div>

          <div className={classes["arrival-box"]}>
            {direction.arrival?.from.city.name && (
              <>
                <div className={classes["arrival-box__from"]}>
                  <p className={classes.time}>
                    {direction.arrival.from.datetime
                      ? new Date(direction.arrival.from.datetime * 1000).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : ""}
                  </p>
                  <p className={classes.city}>{direction.arrival.from.city.name}</p>
                  <p className={classes.station}>{direction.arrival.from.railway_station_name}</p>
                </div>

                <div className={classes.direction}>
                  <p className={classes.duration}>
                    {direction.arrival.duration && convertSecondsToTime(direction.arrival.duration)}
                  </p>
                  <img src={arrowLeft} alt="" className={classes.arrow} />
                </div>

                <div className={classes["arrival-box__to"]}>
                  <p className={classes.time}>
                    {direction.arrival.to.datetime
                      ? new Date(direction.arrival.to.datetime * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                  <p className={classes.city}>{direction.arrival.to.city.name}</p>
                  <p className={classes.station}>{direction.arrival.to.railway_station_name}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={classes["price-box"]}>
          {direction.available_seats_info &&
            Object.keys(direction.available_seats_info).map((classType) => {
              return (
                <div className={classes["type-box"]} key={classType}>
                  <div className={classes.type}>
                    {types[classType as SeatType]}
                  </div>
                  <div className={classes.quantity}>
                    {availableSeatsInfo[classType]}
                  </div>
                  <div className={classes.price}>
                    <span>от </span>
                    <span className={classes.amount}>
                      {formattedPrice(priceInfo[classType]?.bottom_price) ??
                        "—"}
                    </span>
                    <span className={classes.ruble}>₽</span>
                  </div>
                </div>
              );
            })}
          <div className={classes.tripple}>
            <img src={icons} alt="" />
          </div>
          <ChangeBtn onClick={onChangeDirection}/>
        </div>
      </div>
    </>
  );
};
