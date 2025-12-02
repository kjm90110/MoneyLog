import React from "react";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <img
                    className={styles.logo}
                    src="/darkmode_money.png"
                    alt="logo"
                />
                <strong>MoneyLog</strong>
            </header>
        </>
    );
}
