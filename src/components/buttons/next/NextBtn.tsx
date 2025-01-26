import "./next.css";

interface NextBtnProps {
  active: boolean;
  onClick?: () => void;
  type: "button" | "submit";
}

export const NextBtn: React.FC<NextBtnProps> = ({ onClick, active, type }) => {
  return (
    <div className="next-wrp">
          <button
      type={type}
      className={active ? "next" : "next-inactive"}
      onClick={onClick}
    >
      ДАЛЕЕ
    </button>
    </div>
  
  );
};
