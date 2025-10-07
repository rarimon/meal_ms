import React from 'react';
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{ minHeight: "80vh" }}
        >
            <h1 className="display-1 text-danger mb-3">403</h1>
            <h2 className="mb-3">Unauthorized Access</h2>
            <p className="mb-4">
                You do not have permission to view this page. <br />
                Please contact the administrator if you believe this is an error.
            </p>
            <Button variant="primary" onClick={() => navigate("/")}>
                Go to Dashboard
            </Button>
        </div>
    );
};

export default UnauthorizedPage;