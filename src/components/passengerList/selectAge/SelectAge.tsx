// import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { RootState } from "../../../redux/store";
import classes from ".//selectAge.module.css";

export const SelectAge = () => {
  return (
      <div className={classes.dropdown}>▾
        <div
          //onClick={() => handleAgeChange("is_adult")}
          className={classes.adult}
        >
          <p>Взрослый</p>
        </div>
 
        <div
          //onClick={() => handleSortChange("duration")}
          className={classes.child}
        >
          <p>Детский</p>
        </div>
      </div>
  );
};
