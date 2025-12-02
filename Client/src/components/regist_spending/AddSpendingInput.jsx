import React from "react";
import { useState } from "react";
import styles from "./AddSpendingInput.module.css";
import { v4 as uuidv4 } from "uuid";

export default function AddSpendingInput({ onAdd }) {
    const [category, setCategory] = useState("식비");
    const [content, setContent] = useState("");
    const [amount, setAmount] = useState(0);

    const handleAdd = (e) => {
        e.preventDefault();
        if (content.trim().length === 0) {
            return;
        }

        onAdd({
            id: uuidv4(),
            category,
            content,
            amount,
            createdAt: Date.now(),
        });
    };

    return (
        <>
            <form className={styles.fixedForm} onSubmit={handleAdd}>
                <input
                    type="text"
                    name="content"
                    placeholder="지출 추가"
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="금액"
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    name="category"
                    id="spending-type"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue="식비"
                >
                    <option value="식비">식비</option>
                    <option value="교통">교통</option>
                    <option value="쇼핑">쇼핑</option>
                    <option value="의료">의료</option>
                    <option value="주거">주거</option>
                    <option value="기타">기타</option>
                </select>
                <button type="submit">추가</button>
            </form>
        </>
    );
}
