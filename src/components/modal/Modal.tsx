import infoIcon from "../../assets/images/modal/info.png";
import classes from "./modal.module.css";

interface ModalProps {
    modalType: "info" | "error";
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ modalType, children, isOpen, onClose }) => {

    if (!isOpen) return null; 

    return (
            <div className={classes.container}>
                <div className={modalType === "info" ? classes.info : classes.error}>
                    <img src={infoIcon} alt="" />
                </div>
                <div className={classes.content}>{children}</div>
                <div className={classes["btn-box"]}>
                    <button type="button" onClick={onClose}>Понятно</button>
                </div>
            </div>
    );
};
