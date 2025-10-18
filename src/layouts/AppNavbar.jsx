import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router";
import useAuthStore from "../store/useAuthStore.js";
import userLogo from "../assets/user_logo/userLogo.png"


const AppNavbar = () => {

    const { user, role, loadUserFromToken,logout } = useAuthStore();

    useEffect(() => {
        loadUserFromToken();
    }, []);



    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);


    // Handle window resize for responsive sidebar
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth < 992) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    // Logout handler
    const logoutHandle=async()=>{
        await logout();
        window.location.href="/login";

    }





    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-primary fixed-top shadow-sm">
                <div className="container-fluid">

                    <button className="btn btn-outline-light me-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="bi bi-list"></i>
                    </button>

                    {/* Branch Name with Icon */}
                    <span className="navbar-brand d-flex align-items-center">
                    <i className="bi bi-building me-2"></i> Meal Management System
                    </span>

                    {/* Search Box */}
                    <form className="d-none d-md-flex ms-auto me-3">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </form>

                    {/* Profile Dropdown */}
                    <div className="dropdown">
                        <button
                            className="btn btn-dark dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={userLogo}
                                alt="profile"
                                className="rounded-circle me-2"
                            />
                            {role}
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="profileDropdown"
                        >
                            <li>
                                <Link className="dropdown-item" to={'/'}>
                                    <i className="bi bi-person me-2"></i> Profile
                                </Link>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bi bi-gear me-2"></i> Settings
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button onClick={logoutHandle} className="dropdown-item text-danger">
                                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="d-flex">
                {/* Sidebar */}
                <div
                    className="bg-dark text-light position-fixed pt-3 shadow-sm"
                    style={{
                        width: sidebarOpen ? "220px" : "0px",
                        top: "56px", // navbar height
                        left: "0",
                        height: "100%",
                        overflowX: "hidden",
                        transition: "0.3s",
                    }}
                >

                    <ul className="nav flex-column  px-2">
                        <li className="nav-item">
                            <NavLink to={'/'}  className="nav-link text-light  d-flex align-items-center " >
                                <i className="bi bi-house-door me-2"></i> Dashboard
                            </NavLink>
                        </li>

                        {/* Multi dropdown menu */}

                        {role === "admin" &&
                            <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle d-flex align-items-center"
                               href="#"
                               id="userMenu"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-people me-2"></i> Users
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={'/users'} className="dropdown-item" >
                                        <i className="bi bi-list-ul me-2"></i> All Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/adduser'} className="dropdown-item" >
                                        <i className="bi bi-person-plus me-2"></i> Add User
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bi bi-shield-lock me-2"></i> Roles
                                    </a>
                                </li>
                            </ul>
                        </li>
                        }

                        {role === "admin" &&
                            <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle d-flex align-items-center"
                               href="#"
                               id="userMenu"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-fork-knife me-2"></i> Meal
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={'/meals'} className="dropdown-item" >
                                        <i className="bi bi-list-ul me-2"></i> All Meals
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/addmeal'} className="dropdown-item" >
                                        <i className="bi bi-building-add me-2"></i> Add Meal
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        }

                        {role === "admin" &&
                            <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle d-flex align-items-center"
                               href="#"
                               id="userMenu"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-calculator-fill me-2"></i> Expense
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={'/expenses'} className="dropdown-item" >
                                        <i className="bi bi-calendar-range me-2"></i> All Expense
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/addexpense'} className="dropdown-item" >
                                        <i className="bi bi-database-fill-add me-2"></i> Add Expense
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        }

                        <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle d-flex align-items-center"
                               href="#"
                               id="userMenu"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="i bi-bar-chart-line me-2"></i> Reports
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={'/reports'} className="dropdown-item" >
                                        <i className="bi bi-journal-medical me-2"></i> All Reports
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/mealreports'} className="dropdown-item" >
                                        <i className="bi bi-fork-knife me-2"></i> Meal Reports
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/expensereports'} className="dropdown-item" >
                                        <i className="bi bi-calendar-range-fill me-2"></i> Expense Reports
                                    </Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    );
};

export default AppNavbar;