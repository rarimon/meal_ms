import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import MealStore from "../../store/MealStore.js";
import Loader from "../../Loading/Loader.jsx";
import UserStore from "../../store/UserStore.js";
import {Link} from "react-router";

const MealList = () => {
    const { mealList,totalMeal, MealListRequest, FilterMealListRequest,MealDeleteRequest } = MealStore();
    const { userList, userListRequest } = UserStore();

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        userId: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // fetch function (main)
    const fetchMeals = async (isFilter = false) => {
        setLoading(true);
        try {
            if (isFilter) {
                // Filtered API Call
                await FilterMealListRequest(filters);
            } else {
                // Full list API Call
                await MealListRequest();
            }
            // Zustand থেকে data set করো
            setMeals(MealStore.getState().mealList);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch meals");
        } finally {
            setLoading(false);
        }
    };

    //Fetch User List
    const fetchUsers = async () => {
        try {
            await userListRequest();
        } catch (err) {
            console.error("User list fetch failed:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchMeals(false);
    }, []);

    //Filter change
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        // যদি filter ফাঁকা থাকে => Full list দেখাবে
        if (!filters.fromDate && !filters.toDate && !filters.userId) {
            fetchMeals(false);
        } else {
            fetchMeals(true);
        }
    };

    // Actions
    const handleDelete =async (id) => {
        await MealDeleteRequest(id);

        await MealListRequest();
        // Zustand থেকে data set করো
        setMeals(MealStore.getState().mealList);
    };



    //Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(meals.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (mealList === null || loading) {
        return <Loader />;
    }

    return (
        <div className="container mt-4">
            <h3>Meal List</h3>
            <p className="text-danger">Total Meal: {totalMeal}</p>

            {/* Add Meal Button */}
            <div className="mb-3 d-flex justify-content-end">
                <Link to={'/addmeal'} className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i> Add Meal
                </Link>
            </div>

            {/* Filter Section */}
            <Form onSubmit={handleFilterSubmit} className="mb-3">
                <Row className="align-items-end">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Select
                                name="userId"
                                value={filters.userId}
                                onChange={handleFilterChange}
                            >
                                <option value="">-- Select User --</option>
                                {userList &&
                                    userList.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.fullName}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button type="submit" className="w-100">
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Table */}
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>SL</th>
                    <th>User Name</th>
                    <th>Date</th>
                    <th>Meal Count</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentMeals.length > 0 ? (
                    currentMeals.map((meal, index) => (
                        <tr key={meal._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{meal.userName}</td>
                            <td>{new Date(meal.date).toLocaleDateString()}</td>
                            <td>{meal.mealCount}</td>
                            <td>

                                <Link to={`/updatemeal/${meal._id}`} className="btn btn-warning me-2 sm">
                                    Edit
                                </Link>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={async () =>{await handleDelete(meal._id)}}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No data found
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination>
                    <Pagination.First
                        onClick={() => paginate(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => paginate(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            )}
        </div>
    );
};

export default MealList;
