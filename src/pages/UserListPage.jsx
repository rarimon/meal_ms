import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import UserList from "../compnents/UserList.jsx";

import AccessDeniedPage from "./AccessDeniedPage.jsx";
import useAuthStore from "../store/useAuthStore.js";


const UserListPage = () => {
    const {role}=useAuthStore();


    return (
        <MainLayout>
            {/*{role === "admin" ? (<UserList />) : (<AccessDeniedPage/>)}*/}

            <UserList />
        </MainLayout>
    );
};

export default UserListPage;