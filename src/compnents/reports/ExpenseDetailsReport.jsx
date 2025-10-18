import React, { useEffect, useState } from "react";
import { Card, Table, Row, Col, Form, Button, Pagination, Spinner } from "react-bootstrap";
import {Link, useParams} from "react-router";
import ReportStore from "../../store/ReportStore.js";

const ExpenseDetailsReport = () => {
    const { categoryName } = useParams();
    const { expenseDetails, ExpenseDetailsRequest } = ReportStore();
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await ExpenseDetailsRequest(categoryName);
            setLoading(false);
        };
        fetchData();
    }, [categoryName]);

    useEffect(() => {
        if (expenseDetails?.allData) setFilteredData(expenseDetails.allData);
    }, [expenseDetails]);

    const handleFilter = () => {
        if (!fromDate && !toDate) {
            setFilteredData(expenseDetails.allData);
            setCurrentPage(1);
            return;
        }

        const filtered = expenseDetails.allData.filter((item) => {
            const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
            const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
            const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

            if (from && to) return itemDate >= from && itemDate <= to;
            if (from) return itemDate >= from;
            if (to) return itemDate <= to;
            return true;
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">Expense Details</h2>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading data...</p>
                </div>
            ) : expenseDetails ? (
                <>
                    {/* Summary Card */}
                    <Card className="mb-3 shadow-sm border-success">
                        <Card.Body className="text-center">
                             <h4 className="mb-1">Category Name: {expenseDetails.category}</h4>
                            <div className="text-danger">
                                <h5>Total Expense: ৳{expenseDetails.total}</h5>
                            </div>
                        </Card.Body>
                    </Card>


                    {/* Date Filter */}
                    <Row className="mb-3 align-items-end">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>From Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>To Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Button variant="primary" onClick={handleFilter}>
                                Filter
                            </Button>
                        </Col>
                    </Row>

                    {/* Table */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead className="table-dark">
                                <tr>
                                    <th>SL</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, idx) => (
                                        <tr key={item._id}>
                                            <td>{indexOfFirstItem + idx + 1}</td>
                                            <td>{item.category}</td>
                                            <td>{item.title}</td>
                                            <td>{item.amount}</td>
                                            <td>{formatDate(item.date)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination className="mt-3 justify-content-center">
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Pagination.Item
                                            key={idx + 1}
                                            active={idx + 1 === currentPage}
                                            onClick={() => setCurrentPage(idx + 1)}
                                        >
                                            {idx + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            )}
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <p className="text-center text-muted py-3">No expense data found.</p>
            )}


            <div className="d-flex justify-content-center mt-4">
                <Link
                    to={'/expensereports'}
                    type="button"
                    className="btn btn-secondary btn-sm px-3 d-flex align-items-center"
                >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back
                </Link>
            </div>
        </div>


    );
};

export default ExpenseDetailsReport;
