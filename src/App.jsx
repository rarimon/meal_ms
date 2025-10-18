import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {Slide, ToastContainer} from "react-toastify";
import UserListPage from "./pages/UserListPage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import ProtectedRoute from "./compnents/protectedroutes/ProtectedRoute.jsx";
import UserAddPage from "./pages/UserAddPage.jsx";
import UserUpdatePage from "./pages/UserUpdatePage.jsx";
import MealListPage from "./pages/MealListPage.jsx";
import MealAddPage from "./pages/MealAddPage.jsx";
import MealUpdatePage from "./pages/MealUpdatePage.jsx";
import ExpenseListPage from "./pages/ExpenseListPage.jsx";
import ExpenseAddPage from "./pages/ExpenseAddPage.jsx";
import ExpenseUpdatePage from "./pages/ExpenseUpdatePage.jsx";
import AllReportPage from "./pages/AllReportPage.jsx";
import MealReportPage from "./pages/MealReportPage.jsx";
import MealDetailsPage from "./pages/MealDetailsPage.jsx";
import ExpenseReportPage from "./pages/ExpenseReportPage.jsx";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                <Route path="/users" element={
                    <ProtectedRoute>
                        <UserListPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/adduser" element={
                    <ProtectedRoute>
                        <UserAddPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/updateuser/:id" element={
                    <ProtectedRoute>
                        <UserUpdatePage/>
                    </ProtectedRoute>
                }/>

                {/*Meals*/}
                <Route path="/meals" element={
                    <ProtectedRoute>
                        <MealListPage/>
                    </ProtectedRoute>
                }/>


                <Route path="/addmeal" element={
                    <ProtectedRoute>
                        <MealAddPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/updatemeal/:id" element={
                    <ProtectedRoute>
                        <MealUpdatePage/>
                    </ProtectedRoute>
                }/>



                {/*Expense*/}
                <Route path="/expenses" element={
                    <ProtectedRoute>
                        <ExpenseListPage/>
                    </ProtectedRoute>
                }/>


                <Route path="/addexpense" element={
                    <ProtectedRoute>
                        <ExpenseAddPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/updateexpense/:id" element={
                    <ProtectedRoute>
                        <ExpenseUpdatePage/>
                    </ProtectedRoute>
                }/>

           {/*Reports*/}
                <Route path="/reports" element={
                    <ProtectedRoute>
                        <AllReportPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/mealreports" element={
                    <ProtectedRoute>
                        <MealReportPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/mealdetails/:id" element={
                    <ProtectedRoute>
                        <MealDetailsPage/>
                    </ProtectedRoute>
                }/>


                <Route path="/expensereports" element={
                    <ProtectedRoute>
                        <ExpenseReportPage/>
                    </ProtectedRoute>
                }/>

                <Route path="/expensedetails/:categoryName" element={
                    <ProtectedRoute>
                        <ExpenseDetailsPage/>
                    </ProtectedRoute>
                }/>





            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </BrowserRouter>
    );
};

export default App;