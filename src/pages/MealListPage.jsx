import React, {Suspense} from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import MealList from "../compnents/meal/MealList.jsx";

const MealListPage = () => {
    return (
        <MainLayout>

            <MealList/>
        </MainLayout>
    );
};

export default MealListPage;