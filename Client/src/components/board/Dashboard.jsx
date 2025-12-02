import React, { useState } from "react";
import Spending from "../spending/Spending";
import SpendingDetail from "../spending/SpendingDetail";
import EditForm from "../spending/EditForm";
import SpendingChart from "../spending/SpendingChart";
import AddSpendingInput from "../regist_spending/AddSpendingInput";
import styles from "./Dashboard.module.css";
// 삭제 하기 확인 눌렀을 때 Spending list에서 안 보이긴 하는데 모달이  아래에 남아있는 문제 해결해야함!!!!

export default function Dashboard() {
    const [spendings, setSpendings] = useState([]);
    const [selectedSpending, setSelectedSpending] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({});

    const handleAdd = (spending) => {
        const newSpending = {
            ...spending,
            id: spending.id || Date.now(),
            createdAt: spending.createdAt || new Date().toISOString(),
        };
        setSpendings([newSpending, ...spendings]);
    };

    const handleDelete = (id) => {
        const delConfirm = confirm("정말 삭제 하시겠습니까?");
        if (delConfirm) {
            setSpendings(spendings.filter((spending) => spending.id !== id));
            setSelectedSpending(null);
            setIsEditMode(false);
        }
    };

    const handleEditClick = (spending) => {
        setEditData({ ...spending });
        setIsEditMode(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedSpending = { ...editData };
        setSpendings((prev) =>
            prev.map((spending) =>
                spending.id === editData.id ? updatedSpending : spending
            )
        );
        setSelectedSpending(updatedSpending);
        setIsEditMode(false);
        setEditData({});
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditData({});
    };

    const handleSpendingClick = (spending) => {
        setSelectedSpending(spending);
        setIsEditMode(false);
        setEditData({});
    };

    const handleCloseModal = () => {
        setSelectedSpending(null);
        setIsEditMode(false);
        setEditData({});
    };

    return (
        <>
            <div className={styles.wrapper}>
                <AddSpendingInput onAdd={handleAdd} />

                {spendings.length > 0 && (
                    <SpendingChart spendings={spendings} />
                )}

                <div className={styles.dashboard}>
                    {spendings.length === 0 ? (
                        <div className={styles.emptyMessage}>
                            지출을 추가해 주세요.
                        </div>
                    ) : (
                        spendings.map((spending) => (
                            <Spending
                                key={spending.id}
                                spending={spending}
                                onClick={handleSpendingClick}
                            />
                        ))
                    )}
                </div>
            </div>

            {selectedSpending && (
                <div className="overlay" onClick={handleCloseModal}></div>
            )}

            {selectedSpending && (
                <div className="modal">
                    <div className="modal-content">
                        {!isEditMode ? (
                            <SpendingDetail
                                spending={selectedSpending}
                                onEdit={() => handleEditClick(selectedSpending)}
                                onDelete={() =>
                                    handleDelete(selectedSpending.id)
                                }
                                onClose={handleCloseModal}
                            />
                        ) : (
                            <EditForm
                                editData={editData}
                                onEditChange={handleEditChange}
                                onSave={handleSaveEdit}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
