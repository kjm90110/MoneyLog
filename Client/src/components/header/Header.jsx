import React from "react";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <>
            <header>
                <img className={styles.logo} src="/lightmode_money.png"></img>
            </header>
        </>
    );
}
