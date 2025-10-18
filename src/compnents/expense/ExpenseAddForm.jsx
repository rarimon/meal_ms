import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import UserStore from "../../store/UserStore.js";
import ExpenseStore from "../../store/ExpenseStore.js";  // এখানে AddExpenseRequest ধরছি এইখানেই আছে

const ExpenseAddForm = () => {
    const navigate = useNavigate();
    const { AddExpenseRequest } = ExpenseStore();
    const { userList, userListRequest } = UserStore();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        userID: "",
        date: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        (async () => {
            await userListRequest();
        })();
    }, []);

    const formSubmit = async (e) => {
        e.preventDefault();

        const res = await AddExpenseRequest(formData);
        if (res) {
            navigate('/expenses');
        } else {
            toast.error(res?.data?.message || "❌ Failed to Add Expense");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center py-2">
                    <h5 className="mb-0">Add New Expense</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInput}
                                    className="form-control form-control-sm"
                                    placeholder="e.g. Groceries"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={formData.amount}
                                    onChange={handleInput}
                                    className="form-control form-control-sm"
                                    placeholder="e.g. 1200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInput}
                                    className="form-select form-select-sm"
                                    required
                                >
                                    <option value="">--- Select Category ---</option>
                                    <option value="Bazar">Bazar</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Utility">Utility</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="userID" className="form-label">User</label>
                                <select
                                    name="userID"
                                    id="userID"
                                    value={formData.userID}
                                    onChange={handleInput}
                                    className="form-select form-select-sm"
                                    required
                                >
                                    <option value="">--- Select User ---</option>
                                    {userList && userList.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleInput}
                                    className="form-control form-control-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-center gap-2">
                            <button type="submit" className="btn btn-success btn-sm px-4">
                                <i className="bi bi-plus-circle me-1"></i>
                                Add Expense
                            </button>
                            <Link
                                to={'/expenses'}
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

export default ExpenseAddForm;
