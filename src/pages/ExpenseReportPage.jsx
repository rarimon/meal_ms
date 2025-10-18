import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import ExpenseReports from "../compnents/reports/ExpenseReports.jsx";


const ExpenseReportPage = () => {
    return (
        <MainLayout>
            <ExpenseReports/>
        </MainLayout>
    );
};

export default ExpenseReportPage;