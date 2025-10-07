import React from 'react';

const AccessDeniedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-danger">Access Denied</h1>
            <p className="mt-2 text-gray-600">
                You don't have permission to view this page.
            </p>
        </div>
    );
};

export default AccessDeniedPage;