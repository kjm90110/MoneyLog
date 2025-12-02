import React, { useState, useRef } from "react";
import styles from "./AddSpendingInput.module.css";
import { v4 as uuidv4 } from "uuid";

export default function AddSpendingInput({ onAdd }) {
    const [category, setCategory] = useState("식비");
    const [content, setContent] = useState("");
    const [amount, setAmount] = useState("");
    const formRef = useRef(null);

    const handleAdd = (e) => {
        e.preventDefault();

        if (content.trim().length === 0 || !amount) {
            alert("지출 내용과 금액을 입력해주세요.");
            return;
        }

        const newSpending = {
            id: uuidv4(),
            category,
            content,
            amount: Number(amount),
            createdAt: new Date().toISOString(),
        };

        onAdd(newSpending);

        // 상태 초기화
        setCategory("식비");
        setContent("");
        setAmount("");

        // 폼 리셋 (혹시 모르니)
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <form ref={formRef} className={styles.fixedForm} onSubmit={handleAdd}>
            <input
                type="text"
                name="content"
                placeholder="지출 추가"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <input
                type="number"
                name="amount"
                placeholder="금액"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
            />

            <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="식비">식비</option>
                <option value="교통">교통</option>
                <option value="쇼핑">쇼핑</option>
                <option value="의료">의료</option>
                <option value="주거">주거</option>
                <option value="여가">여가</option>
                <option value="기타">기타</option>
            </select>

            <button type="submit">추가</button>
        </form>
    );
}
