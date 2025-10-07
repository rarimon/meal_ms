import React, {useEffect, useState} from 'react';
import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap";
import UserStore from "../store/UserStore.js";
import Loader from "../Loading/Loader.jsx";
import {Link} from "react-router";


let token=localStorage.getItem("token");

const UserList = () => {
    const {userListRequest,userList,UserDeleteRequest,countUser}=UserStore();


    const [searchName, setSearchName] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const users = userList || [];


    useEffect(()=>{
        (async ()=>{

            await userListRequest();

        })()


    },[])

    //Delete User
    const DeleteUser=async(id)=>{
        await UserDeleteRequest(id);
        await userListRequest();
    }




    // Filter logic
    const filteredUsers = users.filter((u) => {
        const matchName = u.fullName.toLowerCase().includes(searchName.toLowerCase());
        const matchRole = filterRole ? u.role === filterRole : true;
        return matchName && matchRole;
    });

    // Pagination setup
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    if(userList===null){
        return <Loader/>
    }
    else{

        return (
            <div className="container mt-4">
                {/* Header */}
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h3>User Management</h3>
                        <p className="text-info">Total User: {countUser}</p>
                    </Col>
                    <Col className="text-end">
                        <Link to={'/adduser'} className='btn btn-primary'>+ Add User</Link>
                    </Col>
                </Row>

                {/* Filters */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="🔍 Search by name..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="">Filter by Role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* User Table */}
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                    <tr>
                        <th style={{ width: "50px" }}>SL</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th style={{ width: "120px" }}>Role</th>
                        <th style={{ width: "160px" }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((u, idx) => (
                            <tr key={u._id}>
                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                <td>{u.fullName}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>
                                    <span className="badge bg-info text-dark">{u.role}</span>
                                </td>
                                <td>
                                    <Link to={`/updateuser/${u._id}`} size="sm"  className="me-2 btn btn-warning">
                                        Edit

                                    </Link>
                                    <Button onClick={ async ()=>{await DeleteUser(u._id)}} size="sm" variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination className="justify-content-center">
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, idx) => (
                            <Pagination.Item
                                key={idx + 1}
                                active={idx + 1 === currentPage}
                                onClick={() => handlePageChange(idx + 1)}
                            >
                                {idx + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                )}
            </div>
        );
    }





};

export default UserList;