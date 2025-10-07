import React, {useState} from 'react';
import {Link, useNavigate} from "react-router";
import UserStore from "../store/UserStore.js";
import {toast} from "react-toastify";



const UserAddForm = () => {
    const Navigate=useNavigate();
    const {AddUserRequest}=UserStore()

    const [userData, setUserData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: "",
    });

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }




const formSubmit=async (e)=>{
    e.preventDefault();
    let res=  await AddUserRequest(userData);
    if(res){
        Navigate('/users')
    }else{
        toast.error(res.data.message || "Failed to Create user");
    }


}





    return (
        <div className="container mt-5" >
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center py-2">
                    <h5 className="mb-0">Add New User</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>
                        {/* Row 1: Full Name + Phone */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="fullName" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    onChange={handleInput}
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="fullName"
                                    placeholder="Enter name"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    onChange={handleInput}
                                    type="tel"
                                    className="form-control form-control-sm"
                                    id="phone"
                                    placeholder="Enter phone"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 2: Email + Password */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    onChange={handleInput}
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    onChange={handleInput}
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 3: Role */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="role" className="form-label">
                                    Role
                                </label>
                                <select name="role" onChange={handleInput} className="form-select form-select-sm" id="role" required>
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons Row */}
                        <div className="d-flex justify-content-center gap-2">
                            <button type="submit" className="btn btn-success btn-sm px-4">
                                <i className="bi bi-person-plus me-1"></i>
                                Add User
                            </button>
                            <Link to={'/users'}
                                type="button"
                                className="btn btn-secondary btn-sm px-3 d-flex align-items-center"
                            >
                                <i className="bi bi-arrow-left me-1"></i>
                                Back
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserAddForm;