import { HashLink } from 'react-router-hash-link';
import classes from "../header.module.css"
export interface IMenuItemProps {
  label: string;
  link: string;
}

// const active = ({ isActive }: { isActive: boolean }) =>
//   isActive ? `${classes['header__menu-item']} ${classes['header__menu-item--active']}` : classes['header__menu-item'];

export const MenuItem = ({ label, link }: IMenuItemProps) => {
  return (
    <li>
      <HashLink smooth to={link} className={classes['header__menu-item']}>{label}</HashLink>
    </li>
  );
};