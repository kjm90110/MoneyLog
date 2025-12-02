import React, { useState } from "react";
import Spending from "../../spending/Spending";
import AddSpendingInput from "../regist_spending/AddSpendingInput";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
    const [spendings, setSpendings] = useState([]);

    const handleAdd = (spending) => setSpendings([...spendings, spending]);

    return (
        <div className={styles.wrapper}>
            <AddSpendingInput onAdd={handleAdd} />

            <div className={styles.dashboard}>
                {spendings.map((spending) => (
                    <Spending key={spending.id} spending={spending} />
                ))}
            </div>
        </div>
    );
}
