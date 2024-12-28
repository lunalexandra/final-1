import React from "react";
import "./stepsBar.css";

const steps = ["Билеты", "Пассажиры", "Оплата", "Проверка"];

interface StepsBarProps {
  currentStep: number;
}

export const StepsBar: React.FC<StepsBarProps> = ({ currentStep }) => {
  return (
    <div className="steps-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-bar__step step-${index + 1}${index < currentStep ? " --active" : ""}`}
        >
        <div className={"step-bar__circle"}>{index + 1}</div>
          <span className="step-text">{step}</span>
          {index < steps.length - 1 && <div className="arrow"></div>}
          {index < steps.length - 1 && <div className="arrow-border"></div>}
        </div>
      ))}
    </div>
  );
};
