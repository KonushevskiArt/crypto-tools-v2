import * as React from "react";
import styles from "./stules.module.css";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppNavigation = () => {
  const { t } = useTranslation();

  const linksInfo = [
    {
      to: `/`,
      text: t("Currency_list"),
    },
    {
      to: `calculators`,
      text: t("ComissionCalculator"),
    },
    {
      to: `tables`,
      text: "Tables Page",
    },
  ];

  return (
    <nav aria-label="navigation">
      <ul className={styles.list}>
        {linksInfo.map(({ to, text }) => (
          <li key={to + text} className={styles.listEl}>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? `${styles.active} ${styles.link}`
                  : isPending
                  ? styles.link
                  : styles.link
              }
              to={to}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AppNavigation;
