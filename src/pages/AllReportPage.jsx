import React, {Suspense} from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import AllReports from "../compnents/reports/AllReports.jsx";

const AllReportPage = () => {
    return (
        <MainLayout>
            <AllReports/>
        </MainLayout>
    );
};

export default AllReportPage;