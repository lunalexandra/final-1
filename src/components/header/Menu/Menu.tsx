import { MenuItem } from "../MenuItem/MenuItem";
import classes from "../header.module.css"

export function Menu() {
  const menuItems = [
    { label: "О нас", link: "/#about" },
    { label: "Как это работает", link: "/#howitworks" },
    { label: "Отзывы", link: "/#reviews" },
    { label: "Контакты", link: "/#contacts" },
  ];

  return (
    <nav >
      <ul className={classes["header__menu"]}>
        {menuItems.map(({ label, link }) => (
        <MenuItem key={label} label={label} link={link} />
      ))}
      </ul>
    </nav>
  );
}