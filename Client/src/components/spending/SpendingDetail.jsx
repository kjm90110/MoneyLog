import React from "react";
import styles from "./SpendingDetail.module.css";

export default function SpendingDetail({
    spending,
    onEdit,
    onDelete,
    onClose,
}) {
    return (
        <>
            <button className={styles.closeBtn} onClick={onClose}>
                ✕
            </button>

            <div className={styles.detailContainer}>
                <div className={styles.header}>
                    <h2>{spending.content}</h2>
                    <span className={styles.categoryBadge}>
                        {spending.category}
                    </span>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                        <label>금액</label>
                        <p className={styles.amount}>
                            ₩{Number(spending.amount).toLocaleString()}
                        </p>
                    </div>

                    <div className={styles.infoItem}>
                        <label>날짜</label>
                        <p>
                            {new Date(spending.createdAt).toLocaleDateString(
                                "ko-KR",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.editBtn} onClick={onEdit}>
                        수정
                    </button>
                    <button className={styles.deleteBtn} onClick={onDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
}
