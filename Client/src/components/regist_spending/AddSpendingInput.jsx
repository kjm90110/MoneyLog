import React from "react";
import { useState } from "react";
import styles from "./AddSpendingInput";

export default function AddSpendingInput() {
    return (
        <>
            <input type="text" placeholder="지출 추가" />
            <button>추가</button>
        </>
    );
}
