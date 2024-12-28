import { Menu } from "./Menu/Menu";
import { Logo } from "./Logo/Logo";
import classes from "./header.module.css";

interface HeaderProps {
  background?: string; //пропс для фона
  children?: React.ReactNode; // Контент, который добавляется в хедер
}

export const Header: React.FC<HeaderProps> = ({ background, children }) => {
  return (
    <header
      className={classes.header}
      style={{ backgroundImage: background ? `url(${background})` : "none" }}
    >
      <Logo />
      <Menu />
      {children}
    </header>
  );
};
