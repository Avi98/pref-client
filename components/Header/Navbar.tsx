import React from "react";
import style from "./header.module.css";
interface INavBar {
  hamMenu: Record<string, string>;
  dropdownMenu: Record<string, React.Component>;
}

export const NavBar = (props: any) => {
  return (
    <nav className={style.navbar}>
      <div>Pricing</div>
      <div>Pricing</div>
      <div>Pricing</div>
      <div>Pricing</div>
      <div>Pricing</div>
    </nav>
  );
};
