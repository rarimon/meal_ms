import React, { useEffect, useState } from "react";
import { Card, Table, Button, Pagination, Form, Row, Col } from "react-bootstrap";
import ReportStore from "../../store/ReportStore.js";
import UserStore from "../../store/UserStore.js";
import {Link} from "react-router";
import Loader from "../../Loading/Loader.jsx";

const MealReports = () => {
    const { MealReportRequest } = ReportStore();
    const { userList, userListRequest } = UserStore();

    const [reportData, setReportData] = useState({ totalMeals: [], userWiseMeals: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const report = await MealReportRequest();
            if (report) {
                setReportData(report);
                setFilteredData(report.userWiseMeals);
            }
            if (!userList || userList.length === 0) {
                await userListRequest();
            }
        };
        fetchData();
    }, []);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleDetails = (user) => alert(`Showing details for ${user.userName} with total meals: ${user.totalMeals}`);

    const handleUserFilter = (e) => {
        const user = e.target.value;
        setSelectedUser(user);
        if (user === "All") {
            setFilteredData(reportData.userWiseMeals);
        } else {
            setFilteredData(reportData.userWiseMeals.filter((u) => u.userName === user));
        }
        setCurrentPage(1);
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Meal Report</h2>

            <Card className="mb-4 shadow-sm" style={{ backgroundColor: "#f0f8ff" }}>
                <Card.Body className="text-center">
                    {reportData.totalMeals.map((total, idx) => (
                        <div key={idx}>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#007bff" }}>
                                Total Meals: {total.totalMeals}
                            </div>
                            {/*<div style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>*/}
                            {/*    From: {formatDate(total.fromDate)} | To: {formatDate(total.toDate)}*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </Card.Body>
            </Card>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Select value={selectedUser} onChange={handleUserFilter}>
                        <option value="All">All Users</option>
                        {userList && userList.length > 0
                            ? userList.map((user) => (
                                <option key={user._id} value={user.fullName}>
                                    {user.fullName}
                                </option>
                            ))
                            : null}
                    </Form.Select>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>SL</th>
                    <th>User Name</th>
                    <th>Total Meals</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((user, idx) => (
                    <tr key={user._id}>
                        <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                        <td>{user.userName}</td>
                        <td>{user.totalMeals}</td>
                        <td>{formatDate(user.fromDate)}</td>
                        <td>{formatDate(user.toDate)}</td>
                        <td>
                            <Link to={`/mealdetails/${user._id}`} className="sm btn btn-info" >
                                Details
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx}
                        active={currentPage === idx + 1}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default MealReports;
