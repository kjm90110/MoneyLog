import { useState } from "react";
import Header from "./components/header/Header";
import Dashboard from "./components/board/dashboard";
import AddSpendingInput from "./components/regist_spending/AddSpendingInput";

function App() {
    return (
        <>
            <Header></Header>
            <AddSpendingInput></AddSpendingInput>
            <Dashboard></Dashboard>
        </>
    );
}

export default App;
