import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../Loading/Loader.jsx";
import UserStore from "../../store/UserStore.js";
import { Link } from "react-router";
import ExpenseStore from "../../store/ExpenseStore.js";

const ExpenseList = () => {
    const { expenseList, totalExpense, ExpenseListRequest, FilterExpenseListRequest, ExpenseDeleteRequest } = ExpenseStore();
    const { userList, userListRequest } = UserStore();

    const [filters, setFilters] = useState({
        userID: "",
        fromDate: "",
        toDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Always ensure tableData is an array
    useEffect(() => {
        setTableData(Array.isArray(expenseList) ? expenseList : []);
    }, [expenseList]);

    // Fetch all expense
    const fetchExpense = async (isFilter = false) => {
        setLoading(true);
        try {
            if (isFilter) {
                await FilterExpenseListRequest(filters);
            } else {
                await ExpenseListRequest();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch Expense");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            await userListRequest();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchExpense(false);
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        if (!filters.userID && !filters.fromDate && !filters.toDate) {
            fetchExpense(false);
        } else {
            fetchExpense(true);
        }
    };

    const handleDelete = async (id) => {
        await ExpenseDeleteRequest(id);
        fetchExpense(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentExpenses = Array.isArray(tableData) ? tableData.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil(currentExpenses.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (expenseList === null || loading) {
        return <Loader />;
    }


    return (
        <div className="container mt-4">
            <h3>Expense List</h3>
            <p className="text-danger">Total Expense: {totalExpense}</p>

            <div className="mb-3 d-flex justify-content-end">
                <Link to={"/addexpense"} className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i> Add Expense
                </Link>
            </div>

            <Form onSubmit={handleFilterSubmit} className="mb-3">
                <Row className="align-items-end">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Select
                                name="userID"
                                value={filters.userID}
                                onChange={handleFilterChange}
                            >
                                <option value="">-- Select User --</option>
                                {userList.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.fullName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button type="submit" className="w-100">Filter</Button>
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>User Name</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Added By</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentExpenses.length > 0 ? (
                    currentExpenses.map((item, index) => (
                        <tr key={item._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.UserName}</td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>{item.AddedBy}</td>
                            <td>
                                <Link to={`/updateexpense/${item._id}`} className="btn btn-warning btn-sm me-2">
                                    Edit
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">No data found</td>
                    </tr>
                )}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination>
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}
        </div>
    );
};

export default ExpenseList;
