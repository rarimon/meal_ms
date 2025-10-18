import React, {useEffect} from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardSummary from "../compnents/dashboard/DashboardSummary.jsx";
import ReportStore from "../store/ReportStore.js";
import Loader from "../Loading/Loader.jsx";

const HomePage = () => {

    const {dashboardSummary,DashboardSummaryRequest}=ReportStore();

    useEffect(() => {
        (async ()=>{
            await DashboardSummaryRequest();
        })()
    }, []);

    const summaryData =dashboardSummary || [];







    return (
        <MainLayout>

            <h3 className="font-bold">Welcome To Meal Dashboard</h3>

                <marquee behavior="scroll" direction="left" scrollamount="5" className="mb-3 text-primary">
                    স্বাগতম আমাদের Meal Management System-এ! 🍲 প্রতিদিনের খাবারের হিসাব সহজে ট্র্যাক করুন এবং বাজার হিসাব করুন। ✅
                </marquee>


            {
                dashboardSummary === null?<Loader />:<DashboardSummary summary={summaryData} />

            }


        </MainLayout>
    );
};

export default HomePage;