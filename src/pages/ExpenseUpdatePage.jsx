import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import ExpenseUpdateForm from "../compnents/expense/ExpenseUpdateForm.jsx";

const ExpenseUpdatePage = () => {
    return (
        <MainLayout>
            <ExpenseUpdateForm/>
        </MainLayout>
    );
};

export default ExpenseUpdatePage;