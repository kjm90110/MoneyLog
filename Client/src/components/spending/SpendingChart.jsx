import React, { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import styles from "./SpendingChart.module.css";

export default function SpendingChart({ spendings }) {
    const chartData = useMemo(() => {
        // 이번 달 기준 필터링
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthSpendings = spendings.filter((spending) => {
            const spendingDate = new Date(spending.createdAt);
            return (
                spendingDate.getMonth() === currentMonth &&
                spendingDate.getFullYear() === currentYear
            );
        });

        // 카테고리별 합계
        const categoryData = {};
        let totalAmount = 0;

        thisMonthSpendings.forEach((spending) => {
            const category = spending.category || "기타";
            const amount = Number(spending.amount);

            if (categoryData[category]) {
                categoryData[category] += amount;
            } else {
                categoryData[category] = amount;
            }

            totalAmount += amount;
        });

        const pieData = Object.entries(categoryData).map(
            ([category, amount]) => ({
                name: category,
                value: amount,
            })
        );

        return { pieData, totalAmount, thisMonthSpendings };
    }, [spendings]);

    // 색상 배열
    const COLORS = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
        "#98D8C8",
        "#F7DC6F",
        "#BB8FCE",
        "#85C1E2",
    ];

    if (chartData.thisMonthSpendings.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <p>이번 달 지출이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className={styles.chartContainer}>
            <div className={styles.header}>
                <h2>이번 달 소비 현황</h2>
                <div className={styles.totalAmount}>
                    총 소비: ₩{chartData.totalAmount.toLocaleString()}
                </div>
            </div>

            <div className={styles.chartSection}>
                <div className={styles.pieChartWrapper}>
                    <h3>카테고리별 비율</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData.pieData}
                                cx="50%"
                                cy="50%"
                                // 표시 가능한 데이터가 적을 땐 라벨을 표시해주면 보기가 좋다.
                                // labelLine={false}
                                // label={({ name, value }) =>
                                //     `${name} ₩${value.toLocaleString()}`
                                // }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) =>
                                    `₩${value.toLocaleString()}`
                                }
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.barChartWrapper}>
                    <h3>카테고리별 금액</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData.pieData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) =>
                                    `₩${value.toLocaleString()}`
                                }
                            />
                            <Bar dataKey="value" fill="#4CAF50" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={styles.detailsSection}>
                <h3>카테고리별 상세</h3>
                <div className={styles.detailsList}>
                    {chartData.pieData.map((item, index) => (
                        <div key={item.name} className={styles.detailItem}>
                            <div className={styles.itemLeft}>
                                <div
                                    className={styles.colorDot}
                                    style={{
                                        backgroundColor:
                                            COLORS[index % COLORS.length],
                                    }}
                                ></div>
                                <span className={styles.categoryName}>
                                    {item.name}
                                </span>
                            </div>
                            <div className={styles.itemRight}>
                                <span className={styles.amount}>
                                    ₩{item.value.toLocaleString()}
                                </span>
                                <span className={styles.percentage}>
                                    (
                                    {(
                                        (item.value / chartData.totalAmount) *
                                        100
                                    ).toFixed(1)}
                                    %)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
