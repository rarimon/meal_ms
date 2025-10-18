import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router";
import UserStore from "../../store/UserStore.js";
import Loader from "../../Loading/Loader.jsx";
import ExpenseStore from "../../store/ExpenseStore.js";

const ExpenseUpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { ExpenseListByIDRequest, expenseList, updateExpenseRequest } = ExpenseStore();
    const { userList, userListRequest } = UserStore();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        userID: "",
        date: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Fetch expense and user list
    useEffect(() => {
        (async () => {
            await userListRequest();
            await ExpenseListByIDRequest(id);
        })();
    }, [id]);

    // Update form data when expense & user list are loaded
    useEffect(() => {
        if (expenseList && userList.length > 0) {
            const matchedUser = userList.find(user => user.fullName === expenseList.UserName);

            setFormData({
                title: expenseList.title || "",
                amount: expenseList.amount || "",
                category: expenseList.category || "",
                userID:  matchedUser ? matchedUser._id : "",
                date: expenseList.date ? expenseList.date.split("T")[0] : "",
            });
        }
    }, [expenseList, userList]);

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await updateExpenseRequest(id, formData);
            if (res) {
                // Refresh ExpenseList page after update
                navigate('/expenses');
            } else {
                toast.error(res?.data?.message || "Failed to update expense");
            }
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    if (!expenseList || !userList) return <Loader />;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center py-2">
                    <h5 className="mb-0">Update Expense</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInput}
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="title"
                                    placeholder="Enter Expense Title"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInput}
                                    type="number"
                                    className="form-control form-control-sm"
                                    id="amount"
                                    placeholder="Enter Amount"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInput}
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="category"
                                    placeholder="Enter Category"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInput}
                                    type="date"
                                    className="form-control form-control-sm"
                                    id="date"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="userID" className="form-label">User</label>
                                <select
                                    name="userID"
                                    value={formData.userID}
                                    onChange={handleInput}
                                    className="form-select form-select-sm"
                                    id="userID"
                                    required
                                >
                                    <option value="">---Select User---</option>
                                    {userList.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-2">
                            <button type="submit" className="btn btn-success btn-sm px-4">
                                <i className="bi bi-save me-1"></i> Update Expense
                            </button>
                            <Link to='/expenses' className="btn btn-secondary btn-sm px-3 d-flex align-items-center">
                                <i className="bi bi-arrow-left me-1"></i> Back
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExpenseUpdateForm;
