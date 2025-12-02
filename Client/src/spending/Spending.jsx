import React from "react";
import styles from "./Spending.module.css";

export default function Spending({ spending }) {
    const { id, category, content, amount, createdAt } = spending;

    const date = new Date(createdAt).toLocaleDateString("ko-KR");

    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <span className={styles.category}>{category}</span>
                <p className={styles.content}>{content}</p>
                <p className={styles.date}>{date}</p>
            </div>

            <div className={styles.right}>
                <p className={styles.amount}>
                    {Number(amount).toLocaleString()}원
                </p>
            </div>
        </div>
    );
}
