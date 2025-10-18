import React, { useEffect, useState } from "react";
import { Card, Table, Pagination, Button } from "react-bootstrap";
import { Link } from "react-router";
import ReportStore from "../../store/ReportStore.js";
import Loader from "../../Loading/Loader.jsx";

const ExpenseReports = () => {
    const { expenseList, totalExpense, ExpenseListRequest } = ReportStore();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchExpenses = async () => {
            await ExpenseListRequest();
        };
        fetchExpenses();
    }, []);

    if (!expenseList) {
        return <Loader />;
    }

    const totalItems = expenseList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = expenseList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Expense Report</h2>

            {/* Total Expense Card */}
            <Card className="mb-4 shadow-sm" style={{ backgroundColor: "#fff8e1" }}>
                <Card.Body className="text-center">
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff6f00" }}>
                        Total Expense: {totalExpense || 0} ৳
                    </div>
                </Card.Body>
            </Card>

            {/* Expense Table */}
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>SL</th>
                    <th>Category</th>
                    <th>Total Amount (৳)</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map((expense, idx) => (
                        <tr key={idx}>
                            <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                            <td>{expense.category}</td>
                            <td>{expense.total}</td>
                            <td>{formatDate(expense.fromDate)}</td>
                            <td>{formatDate(expense.toDate)}</td>
                            <td className="text-center">
                                <Link
                                    to={`/expensedetails/${expense.category}`}
                                    className="btn btn-info btn-sm"
                                >
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center text-muted">
                            No expense records found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* Pagination */}
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

export default ExpenseReports;
