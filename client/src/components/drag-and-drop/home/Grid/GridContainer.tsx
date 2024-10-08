/** @format */

import React from "react";

import styles from "./grid-container.module.scss";

export interface Props {
  children: React.ReactNode;
  columns: number;
}

export function GridContainer({ children, columns }: Props) {
  return (
    <div
      className={styles.GridContainer}
      style={
        {
          "--col-count": columns,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
