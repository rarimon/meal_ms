import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import ExpenseAddForm from "../compnents/expense/ExpenseAddForm.jsx";

const ExpenseAddPage = () => {
    return (
        <MainLayout>
            <ExpenseAddForm/>
        </MainLayout>
    );
};

export default ExpenseAddPage;