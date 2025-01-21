import { useState } from "react";
import { Seats } from "../../../types/Seats";
import Tooltip from "../../tooltip/Tooltip";
import conditionerSelected from "../../../assets/images/facilities/conditioner_white.png";
import conditioner from "../../../assets/images/facilities/conditioner_black.png";
import wifiSelected from "../../../assets/images/facilities/wifi_white.png";
import wifi from "../../../assets/images/facilities/wifi_black.png";
import linesSelected from "../../../assets/images/facilities/lines_white.png";
import lines from "../../../assets/images/facilities/linens_black.png";
import foodSelected from "../../../assets/images/facilities/food_white.png";
import food from "../../../assets/images/facilities/food_black.png";
import linesInactive from "../../../assets/images/facilities/lines_gray.png";
import classes from "./facilitiesBlock.module.css";

type FacilityType = "conditioner" | "wifi" | "lines" | "food";

interface FacilitiesBlockProps {
  seats: Seats | null;
}

export const FacilitiesBlock: React.FC<FacilitiesBlockProps> = ({ seats }) => {
  const [selected, setSelected] = useState({
    conditioner: false,
    wifi: false,
    lines: false,
    food: false,
  });

  const [tooltipVisible, setTooltipVisible] = useState({
    conditioner: false,
    wifi: false,
    lines: false,
    food: false,
  });

  const handleToggle = (key: FacilityType) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMouseEnter = (key: FacilityType) => {
    setTooltipVisible((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const handleMouseLeave = (key: FacilityType) => {
    setTooltipVisible((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  return (
    <div className={classes.container}>
      <div
        className={`${selected.conditioner ? classes.selected : classes.icon}`}
        onClick={() => handleToggle("conditioner")}
        onMouseEnter={() => handleMouseEnter("conditioner")}
        onMouseLeave={() => handleMouseLeave("conditioner")}
      >
        <Tooltip content="кондиционер" visible={tooltipVisible.conditioner} className={classes.tooltip}></Tooltip>
          <img
            src={selected.conditioner ? conditionerSelected : conditioner}
            alt="Conditioner"
          />
      </div>
      <div
        className={`${selected.wifi ? classes.selected : classes.icon}`}
        onClick={() => handleToggle("wifi")}
        onMouseEnter={() => handleMouseEnter("wifi")}
        onMouseLeave={() => handleMouseLeave("wifi")}
      >
        <Tooltip content="Wi-Fi" visible={tooltipVisible.wifi} className={classes.tooltip}></Tooltip>
          <img src={selected.wifi ? wifiSelected : wifi} alt="Wi-Fi" />
      </div>
      {seats?.coach.is_linens_included ? (
  <div 
    className={classes.inactive}
    onMouseEnter={() => handleMouseEnter("lines")}
    onMouseLeave={() => handleMouseLeave("lines")}
  >
    <Tooltip content="белье включено" visible={tooltipVisible.lines} className={classes.tooltip} />
    <img src={linesInactive} alt="Lines" />
  </div>
) : (
  <div
    className={`${selected.lines ? classes.selected : classes.icon}`}
    onClick={() => handleToggle("lines")}
    onMouseEnter={() => handleMouseEnter("lines")}
    onMouseLeave={() => handleMouseLeave("lines")}
  >
    <Tooltip content="белье" visible={tooltipVisible.lines} className={classes.tooltip} />
    <img src={selected.lines ? linesSelected : lines} alt="Lines" />
  </div>
)}
      <div
        className={`${selected.food ? classes.selected : classes.icon}`}
        onClick={() => handleToggle("food")}
        onMouseEnter={() => handleMouseEnter("food")}
        onMouseLeave={() => handleMouseLeave("food")}
      >
        <Tooltip content="питание" visible={tooltipVisible.food} className={classes.tooltip}>
          <img src={selected.food ? foodSelected : food} alt="Food" />
        </Tooltip>
      </div>
    </div>
  );
};
