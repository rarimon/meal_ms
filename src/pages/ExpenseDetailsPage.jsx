import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import ExpenseDetailsReport from "../compnents/reports/ExpenseDetailsReport.jsx";

const ExpenseDetailsPage = () => {
    return (
        <MainLayout>
            <ExpenseDetailsReport/>
        </MainLayout>
    );
};

export default ExpenseDetailsPage;