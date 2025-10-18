import React, {Suspense} from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import ExpenseList from "../compnents/expense/ExpenseList.jsx";

const ExpenseListPage = () => {
    return (
        <MainLayout>
            <ExpenseList/>
        </MainLayout>
    );
};

export default ExpenseListPage;