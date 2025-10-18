import React, { useState } from "react";
import { Form, Row, Col, Button, Table, Card, Spinner, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import ReportStore from "../../store/ReportStore.js";

const AllReports = () => {
    const { AllReportRequest } = ReportStore();
    const [filters, setFilters] = useState({ fromDate: "", toDate: "" });
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    // Pagination states
    const [mealPage, setMealPage] = useState(1);
    const [expensePage, setExpensePage] = useState(1);
    const itemsPerPage = 5;

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        if (!filters.fromDate || !filters.toDate) {
            toast.warning("Please select both From and To date!");
            return;
        }

        setLoading(true);
        try {
            const data = await AllReportRequest(filters.fromDate, filters.toDate);
            if (data) {
                setReport(data);
                setMealPage(1);
                setExpensePage(1);
            } else {
                toast.info("No data found for selected range.");
                setReport(null);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch report!");
        } finally {
            setLoading(false);
        }
    };

    // Pagination helper
    const paginate = (array, page) => {
        const start = (page - 1) * itemsPerPage;
        return array.slice(start, start + itemsPerPage);
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">Date Wise Report</h3>

            {/* Filter Section */}
            <Form onSubmit={handleFilterSubmit} className="mb-4">
                <Row className="align-items-end">
                    <Col md={4}>
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
                    <Col md={4}>
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
                    <Col md={4}>
                        <Button type="submit" className="w-100" variant="primary">
                            {loading ? <Spinner animation="border" size="sm" /> : "Show Report"}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Default Message */}
            {!report && !loading && (
                <p className="text-center text-muted mt-5">
                    Please select date range to view report 📅
                </p>
            )}

            {/* Report Summary */}
            {report && (
                <>
                    {/* Colorful Summary Cards */}
                    <Row className="mb-4 g-3">
                        <Col md={3}>
                            <Card className="text-center shadow-sm border-0 bg-primary text-white">
                                <Card.Body>
                                    <Card.Title>Total Meals</Card.Title>
                                    <h3>{report.totalMeals}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm border-0 bg-danger text-white">
                                <Card.Body>
                                    <Card.Title>Total Expenses</Card.Title>
                                    <h3>{report.totalExpenses} ৳</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm border-0 bg-success text-white">
                                <Card.Body>
                                    <Card.Title>Per Meal Cost</Card.Title>
                                    <h3>{report.perMealCost} ৳</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm border-0 bg-info text-white">
                                <Card.Body>
                                    <Card.Title>Total Members</Card.Title>
                                    <h3>{report.totalMembers}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Member Wise Meals */}
                    <h5 className="mb-3 mt-4">👤 Member Wise Meals</h5>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>SL</th>
                            <th>Member Name</th>
                            <th>Total Meals</th>
                            <th>Total Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {report.memberWiseMeals && report.memberWiseMeals.length > 0 ? (
                            paginate(report.memberWiseMeals, mealPage).map((m, i) => (
                                <tr key={i}>
                                    <td>{(mealPage - 1) * itemsPerPage + i + 1}</td>
                                    <td>{m.member}</td>
                                    <td>{m.meals}</td>
                                    <td>{m.cost}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No meal data found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    {/* Pagination for Member Meals */}
                    {report.memberWiseMeals && report.memberWiseMeals.length > itemsPerPage && (
                        <Pagination className="justify-content-center">
                            {Array.from({
                                length: Math.ceil(report.memberWiseMeals.length / itemsPerPage),
                            }).map((_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === mealPage}
                                    onClick={() => setMealPage(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    )}

                    {/* Category Wise Expenses */}
                    <h5 className="mb-3 mt-5">💰 Category Wise Expenses</h5>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>SL</th>
                            <th>Category</th>
                            <th>Amount (৳)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {report.categoryWiseExpenses && report.categoryWiseExpenses.length > 0 ? (
                            paginate(report.categoryWiseExpenses, expensePage).map((c, i) => (
                                <tr key={i}>
                                    <td>{(expensePage - 1) * itemsPerPage + i + 1}</td>
                                    <td>{c.category}</td>
                                    <td>{c.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No expense data found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    {/* Pagination for Expenses */}
                    {report.categoryWiseExpenses &&
                        report.categoryWiseExpenses.length > itemsPerPage && (
                            <Pagination className="justify-content-center">
                                {Array.from({
                                    length: Math.ceil(report.categoryWiseExpenses.length / itemsPerPage),
                                }).map((_, i) => (
                                    <Pagination.Item
                                        key={i + 1}
                                        active={i + 1 === expensePage}
                                        onClick={() => setExpensePage(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        )}
                </>
            )}
        </div>
    );
};

export default AllReports;
