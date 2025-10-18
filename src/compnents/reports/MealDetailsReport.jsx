import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router";
import { Card, Table, Pagination, Form, Row, Col, Button } from "react-bootstrap";
import ReportStore from "../../store/ReportStore.js";
import Loader from "../../Loading/Loader.jsx";

const MealDetailsReport = () => {
    const { id } = useParams();
    const { MealDetailsReportRequest } = ReportStore();

    const [mealData, setMealData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const data = await MealDetailsReportRequest(id);
            if (data) {
                setMealData(data);
                setFilteredMeals(data.meals); // Initially all meals
            }
        };
        fetchData();
    }, [id, MealDetailsReportRequest]);


    if (!mealData) {
        return <Loader />;
    }

    const { userName, totalMeals } = mealData;

    // Date filter function
    const handleFilter = () => {
        if (!fromDate && !toDate) {
            setFilteredMeals(mealData.meals);
            setCurrentPage(1);
            return;
        }

        const filtered = mealData.meals.filter((meal) => {
            const mealDate = new Date(meal.date).setHours(0,0,0,0);
            const from = fromDate ? new Date(fromDate).setHours(0,0,0,0) : null;
            const to = toDate ? new Date(toDate).setHours(0,0,0,0) : null;

            if (from && to) {
                return mealDate >= from && mealDate <= to;
            } else if (from) {
                return mealDate >= from;
            } else if (to) {
                return mealDate <= to;
            }
            return true;
        });

        setFilteredMeals(filtered);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            {/* Meal Details Card */}
            <Card className="mb-3 shadow-sm border-primary">
                <Card.Body>
                    <Card.Title>Meal Details</Card.Title>
                    <Card.Text>User: {userName}</Card.Text>
                    <Card.Text>Total Meals: {totalMeals}</Card.Text>
                </Card.Body>
            </Card>

            {/* Date Filter Row (normal, no card, no title) */}
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

            {/* Meals Table */}
            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>SL</th>
                            <th>Date</th>
                            <th>Total Meal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentMeals.map((meal, index) => (
                            <tr key={meal._id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{new Date(meal.date).toLocaleDateString()}</td>
                                <td>{meal.mealCount}</td>
                            </tr>
                        ))}
                        {currentMeals.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    No meals found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination>
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

            <div className="d-flex justify-content-center mt-4">
                <Link
                    to={'/mealreports'}
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

export default MealDetailsReport;
