import React, { useState } from "react";
import { Card, Row, Col, Table, Pagination } from "react-bootstrap";
import { FaUtensils, FaMoneyBillWave, FaDollarSign, FaUsers } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashboardSummary = ({ summary }) => {
    const { totalMeals, totalExpenses, perMealCost, totalMembers, memberWiseMeals = [], categoryWiseExpenses = [] } = summary;

    const cardData = [
        { title: "Total Meals", value: totalMeals, icon: <FaUtensils size={30} className="text-white" />, bg: "primary" },
        { title: "Total Expenses", value: `৳ ${totalExpenses}`, icon: <FaMoneyBillWave size={30} className="text-white" />, bg: "danger" },
        { title: "Per Meal Cost", value: `৳ ${perMealCost}`, icon: <FaDollarSign size={30} className="text-white" />, bg: "success" },
        { title: "Total Members", value: totalMembers, icon: <FaUsers size={30} className="text-white" />, bg: "warning" },
    ];

    const itemsPerPage = 5;

    // Member-wise pagination
    const [memberPage, setMemberPage] = useState(1);
    const memberIndexLast = memberPage * itemsPerPage;
    const memberIndexFirst = memberIndexLast - itemsPerPage;
    const currentMembers = memberWiseMeals.slice(memberIndexFirst, memberIndexLast);
    const memberTotalPages = Math.ceil(memberWiseMeals.length / itemsPerPage);

    // Category-wise pagination
    const [categoryPage, setCategoryPage] = useState(1);
    const categoryIndexLast = categoryPage * itemsPerPage;
    const categoryIndexFirst = categoryIndexLast - itemsPerPage;
    const currentCategories = categoryWiseExpenses.slice(categoryIndexFirst, categoryIndexLast);
    const categoryTotalPages = Math.ceil(categoryWiseExpenses.length / itemsPerPage);

    return (
        <div>
            {/* Summary Cards */}
            <Row className="g-4 mb-4">
                {cardData.map((card, index) => (
                    <Col key={index} md={6} lg={3}>
                        <Card className={`text-white bg-${card.bg} shadow-sm h-100`}>
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title className="fs-6">{card.title}</Card.Title>
                                    <Card.Text className="fs-4 fw-bold">{card.value}</Card.Text>
                                </div>
                                <div>{card.icon}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Member-wise Meals Chart */}
            {memberWiseMeals.length > 0 && (
                <Card className="mb-4 shadow-sm">
                    <Card.Header className="bg-info text-white">Member-wise Meals</Card.Header>
                    <Card.Body>
                        {/*<ResponsiveContainer width="100%" height={300}>*/}
                        {/*    <BarChart data={memberWiseMeals}>*/}
                        {/*        <CartesianGrid strokeDasharray="3 3" />*/}
                        {/*        <XAxis dataKey="member" />*/}
                        {/*        <YAxis />*/}
                        {/*        <Tooltip />*/}
                        {/*        <Legend />*/}
                        {/*        <Bar dataKey="meals" name="Meals" fill="#1f77b4" />*/}
                        {/*        <Bar dataKey="cost" name="Cost (৳)" fill="#ff7f0e" />*/}
                        {/*    </BarChart>*/}
                        {/*</ResponsiveContainer>*/}

                        {/* Table */}
                        <Table striped bordered hover responsive className="mt-3">
                            <thead>
                            <tr>
                                <th>Member</th>
                                <th>Meals</th>
                                <th>Cost (৳)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentMembers.length > 0 ? currentMembers.map((m, i) => (
                                <tr key={i}>
                                    <td>{m.member}</td>
                                    <td>{m.meals}</td>
                                    <td>৳ {m.cost}</td>
                                </tr>
                            )) : <tr><td colSpan="3" className="text-center">No data found</td></tr>}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        {memberTotalPages > 1 && (
                            <Pagination className="justify-content-center">
                                {Array.from({ length: memberTotalPages }, (_, i) => (
                                    <Pagination.Item key={i} active={i + 1 === memberPage} onClick={() => setMemberPage(i + 1)}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        )}
                    </Card.Body>
                </Card>
            )}

            {/* Category-wise Expenses Table */}
            {categoryWiseExpenses.length > 0 && (
                <Card className="mb-4 shadow-sm">
                    <Card.Header className="bg-secondary text-white">Category-wise Expenses</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive className="mt-3">
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount (৳)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentCategories.length > 0 ? currentCategories.map((c, i) => (
                                <tr key={i}>
                                    <td>{c.category}</td>
                                    <td>৳ {c.amount}</td>
                                </tr>
                            )) : <tr><td colSpan="2" className="text-center">No data found</td></tr>}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        {categoryTotalPages > 1 && (
                            <Pagination className="justify-content-center">
                                {Array.from({ length: categoryTotalPages }, (_, i) => (
                                    <Pagination.Item key={i} active={i + 1 === categoryPage} onClick={() => setCategoryPage(i + 1)}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        )}
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default DashboardSummary;
