import styles from './Style1.module.scss';
import React from 'react';

interface Props {
    color?: "black" | "white" | "default" | "primary" | "dark" | "light",
    children: React.ReactNode
}

const Style1 = ({children, color="default"}: Props) => {
  return (
    <div className={`${styles.container} ${styles[color]}`}>{children}</div>
  )
}

export default Style1