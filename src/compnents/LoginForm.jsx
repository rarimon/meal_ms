import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import FormValidation from "../utility/FormValidation.jsx";
import {toast} from "react-toastify";
import useAuthStore from "../store/useAuthStore.js";
import {useNavigate} from "react-router";




const LoginForm = () => {

    const {login}=useAuthStore();

    const navigate=useNavigate();

    const [formData, setformData] =useState({email:"", password:"",role:""});
    const [error, setError] = useState({email:"", password:"", role:""});

    // Create instance
    const validator = new FormValidation();


    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformData({
            ...formData, [name]:value}
        );
    }




    const formSubmit=async (e)=>{
        e.preventDefault();

        // Check if email is valid
        if (!validator.isEmail(formData.email)) {
            toast.error("Please enter a valid email");
        }
        // check password required
        else if (!validator.isRequired(formData.password)) {
            toast.error("Password is required");
        }
        // check role required
        else if (!validator.isRequired(formData.role)) {
            toast.error("role is required");

        }

        else{

            let res = await login(formData);
            if (res) {
                toast.success("Login successful");
                navigate("/"); // redirect
            } else {
                toast.error("User name or password is incorrect");
            }
        }


    }


    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
        >
            <Row>
                <Col>
                    <Card
                        className="p-4 shadow-lg rounded-4"
                        style={{ width: "400px" }}
                    >
                        {/* Logo */}
                        <div className="text-center mb-3">
                            <img
                                src="/meal.png"
                                alt="Logo"
                                className="mb-2 w-25"
                            />
                        </div>

                        {/* Title */}
                        <h3 className="text-center text-primary fw-bold">
                            Meal Management System
                        </h3>

                        {/* Heading */}
                        <h5 className="text-center mb-4 text-muted">
                            Welcome back! Please login
                        </h5>

                        {/* Login Form */}
                        <Form onSubmit={formSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                                {error && <p className="text-danger">{error.email}</p>}
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                                {error&& <p className="text-danger">{error.password}</p>}
                            </Form.Group>

                            {/* Role Dropdown */}
                            <Form.Group className="mb-3" controlId="formRole">
                                <Form.Label>Select Role</Form.Label>
                                <Form.Select onChange={handleChange} name="role" >
                                    <option value="">-- Select Role --</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                </Form.Select>
                                {error&& <p className="text-danger">{error.role}</p>}
                            </Form.Group>

                            {/* Remember Me + Forgot Password */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Form.Check type="checkbox" label="Remember me" />
                                <a href="#forgot" className="text-decoration-none text-primary">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;