import classNames from "classnames";
import React from "react";
import style from "./layout.module.css";

interface ILayout {
  header: () => React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isAuth: boolean;
}
export const Layout = ({
  header,
  sidebar,
  children,
  footer,
  isAuth,
}: ILayout) => {
  const openLayout = !(isAuth && footer);
  return (
    <div className={style.layoutContainer}>
      <nav className={style.navBar}>{header()}</nav>
      {isAuth ? (
        <div
          className={classNames({
            [style.sidebar]: true,
          })}
        >
          {sidebar}
        </div>
      ) : null}
      <div
        className={classNames({
          [style.main]: true,
          //for login and signup layout
          [style.fullWidth]: openLayout,
          [style.fullHeight]: openLayout,
        })}
      >
        {children}
      </div>
      {footer && <div className={style.footer}>{footer}</div>}
    </div>
  );
};
