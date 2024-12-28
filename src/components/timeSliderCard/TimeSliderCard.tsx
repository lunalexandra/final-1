import React, { useState } from "react";
import Slider from "../slider/Slider";
import arrowRight from "../../assets/images/arrow-right.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import classes from "./timeSliderCard.module.css";

interface TimeSliderCardProps {
  title: "Туда" | "Обратно";
}

const TimeSliderCard: React.FC<TimeSliderCardProps> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className={classes.expandable}>
      <div className={classes.expandable__headline}>
        <div className={classes.arrow}>
        <img src={title === "Туда" ? arrowRight : arrowLeft} alt={title === "Туда" ? "Туда" : "Обратно"} className={classes.img} />
        </div>
        <h3 className={classes.title}>{title}</h3>
        <button onClick={toggleExpand} className={classes.button}>
          {isExpanded ? "—" : "+"}
        </button>
      </div>

      <div
        style={{
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          maxHeight: isExpanded ? "400px" : "0",
          opacity: isExpanded ? 1 : 0,
          overflow: "hidden",
          padding: isExpanded ? "0 30px 30px" : "0",
        }}
      >
        <div className={classes["departure-container"]}>
                  <p className={classes["departure-time"]}>Время отбытия</p>
        {title === "Туда" ? (
          <Slider key="slider-startDeparture" type="startDeparture" min={0} max={24} step={1} />
        ) : (
          <Slider key="slider-endDeparture" type="endDeparture" min={0} max={24} step={1} />
        )}
        </div>
<div className={classes["arrival-container"]}>
          <p className={classes["arrival-time"]}>Время прибытия</p>
        {title === "Туда" ? (
          <Slider key="slider-startArrival" type="startArrival" min={0} max={24} step={1} />
        ) : (
          <Slider key="slider-endArrival" type="endArrival" min={0} max={24} step={1} />
        )}
      </div>
</div>

    </div>
  );
};

export default TimeSliderCard;