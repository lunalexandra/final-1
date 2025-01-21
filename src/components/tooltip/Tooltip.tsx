import React, { useRef } from "react";

interface TooltipProps {
  content?: React.ReactNode;
  children?: React.ReactNode; // Элемент, над которым отображается тултип
  visible?: boolean;
  className?: string; // Управление видимостью тултипа извне
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  visible = false,
  className = "",
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={tooltipRef}
      style={{ display: "inline-block", position: "relative" }}
    >
      {children}

      {visible && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "10px",
            border: "none",
            padding: "10px",
            background: "white",
            zIndex: 1000,
            color: "#928f94",
            fontSize: "18px",
            borderRadius: "10px",
          }}
          className={className}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
