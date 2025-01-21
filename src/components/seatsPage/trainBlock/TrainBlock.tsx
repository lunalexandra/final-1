import { TrainInfo } from "../../../types/TrainInfo";
import { formatDuration, formatDate } from "./formatTime";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import trainIcon from "../../../assets/images/seats/train.png";
import rightIcon from "../../../assets/images/seats/arrow-right.png";
import leftIcon from "../../../assets/images/seats/arrow-left.png";
import clockIcon from "../../../assets/images/seats/clock.png";
import classes from "./trainBlock.module.css";

interface TrainBlockProps {
  direction: TrainInfo | null;
  type: "туда" | "обратно";
}

export const TrainBlock: React.FC<TrainBlockProps> = ({ direction, type }) => {
  const { fromCity, toCity } = useAppSelector(
    (state: RootState) => state.cities
  ); //убрать

  return (
    <>
      <div className={classes.train}>
        <div className={classes.icon}>
          <img src={trainIcon} alt="" />
        </div>
        <div className={classes.name}>
          <div className={classes.number}>
            {type === "туда"
              ? direction?.departure.train.name
              : direction?.arrival
              ? direction?.arrival.train.name
              : ""}
          </div>
          <div className={classes.cities}>
            <p className={classes.initial}>
              {type === "туда"
                ? direction?.departure.from.city.name
                : direction?.arrival
                ? direction?.arrival.from.city.name
                : ""}
              ➔
            </p>
            <p className={classes.from}>
              {type === "туда" ? fromCity.name : toCity.name}➔
            </p>
            <p className={classes.to}>
              {type === "туда"
                ? direction?.departure.to.city.name
                : direction?.arrival
                ? direction?.arrival.to.city.name
                : ""}
            </p>
          </div>
        </div>
        <div className={classes.departure}>
          {type === "туда" ? (
            <>
              <div className={classes["departure-time"]}>
                {
                  (formatDate(direction?.departure?.from?.datetime))}
              </div>
              <div className={classes["departure-city"]}>
                {direction?.departure.from.city.name}
              </div>
              <div className={classes["departure-station"]}>
                {direction?.departure.from.railway_station_name}
              </div>
            </>
          ) : direction?.arrival ? (
            <>
              <div className={classes["departure-time"]}>
                {
                  formatDate(direction?.arrival?.from?.datetime)}
              </div>
              <div className={classes["departure-city"]}>
                {direction?.arrival.from.city.name}
              </div>
              <div className={classes["departure-station"]}>
                {direction?.arrival.from.railway_station_name}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={classes["arrow-box"]}>
          {type === "туда" ? (
            <img src={rightIcon} alt="" />
          ) : (
            <img src={leftIcon} alt="" />
          )}
        </div>

        <div className={classes.arrival}>
          {type === "туда" ? (
            <>
              <div className={classes["arrival-time"]}>
                {
                  formatDate(direction?.departure?.to?.datetime)}
              </div>
              <div className={classes["arrival-city"]}>
                {direction?.departure.to.city.name}
              </div>
              <div className={classes["arrival-station"]}>
                {direction?.departure.to.railway_station_name}
              </div>
            </>
          ) : direction?.arrival ? (
            <>
              <div className={classes["arrival-time"]}>
                {
                 formatDate(direction?.arrival?.to?.datetime)}
              </div>
              <div className={classes["arrival-city"]}>
                {direction?.arrival.to.city.name}
              </div>
              <div className={classes["arrival-station"]}>
                {direction?.arrival.to.railway_station_name}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={classes.duration}>
          <div className={classes.clock}>
            <img src={clockIcon} alt="" />
          </div>
          {type === "туда" ? (
            <>
              <div className={classes.time}>
                {direction?.departure.duration
                  ? formatDuration(direction?.departure.duration)
                  : ""}
              </div>
            </>
          ) : direction?.arrival ? (
            <div className={classes.time}>
              {direction?.arrival.duration
                ? formatDuration(direction?.arrival.duration)
                : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
