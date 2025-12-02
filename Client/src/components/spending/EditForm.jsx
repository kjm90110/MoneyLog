import React from "react";
import styles from "./EditForm.module.css";

export default function EditForm({ editData, onEditChange, onSave, onCancel }) {
    return (
        <div className={styles.editForm}>
            <button className={styles.closeBtn} onClick={onCancel}>
                ✕
            </button>

            <h2>지출 수정</h2>

            <label>
                내용:
                <input
                    type="text"
                    name="content"
                    value={editData.content || ""}
                    onChange={onEditChange}
                    placeholder="지출 내용을 입력하세요"
                />
            </label>

            <label>
                카테고리:
                <input
                    type="text"
                    name="category"
                    value={editData.category || ""}
                    onChange={onEditChange}
                    placeholder="카테고리를 입력하세요"
                />
            </label>

            <label>
                금액:
                <input
                    type="number"
                    name="amount"
                    value={editData.amount || ""}
                    onChange={onEditChange}
                    placeholder="금액을 입력하세요"
                />
            </label>

            <div className={styles.buttonGroup}>
                <button className={styles.saveBtn} onClick={onSave}>
                    저장
                </button>
                <button className={styles.cancelBtn} onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    );
}
