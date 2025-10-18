import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router";
import UserStore from "../../store/UserStore.js";
import MealStore from "../../store/MealStore.js";
import Loader from "../../Loading/Loader.jsx";

const MealUpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { AddMealRequest, MealListByIDRequest, mealList,updateMealRequest } = MealStore();
    const { userList, userListRequest } = UserStore();

    const [formData, setFormData] = useState({
        user_id: "",
        date: "",
        mealCount: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // ১️⃣ Page load এ userList এবং mealList fetch
    useEffect(() => {
        (async () => {
            await userListRequest();
            await MealListByIDRequest(id);
        })();
    }, [id]);

    // ২️⃣ ExpenseList এবং userList load হলে formData update
    useEffect(() => {
        if (mealList && userList.length > 0) {
            // mealList.userName অনুযায়ী user_id find করা
            const matchedUser = userList.find(user => user.fullName === mealList.userName);

            setFormData({
                user_id: matchedUser ? matchedUser._id : "",
                date: mealList.date ? mealList.date.split("T")[0] : "",
                mealCount: mealList.mealCount || "",
            });
        }
    }, [mealList, userList]);

    // ৩️⃣ Form submit
    const formSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        let res=  await updateMealRequest(id,formData);

        if(res){
            navigate('/meals')
        }else{
            toast.error(res.data.message || "Failed to update Meal");
        }

    };

    // Loading check
    if (!mealList || !userList) return <Loader />;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center py-2">
                    <h5 className="mb-0">Update Meal</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>
                        <div className="row mb-3">
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
                            <div className="col-md-6">
                                <label htmlFor="mealCount" className="form-label">Meal</label>
                                <input
                                    name="mealCount"
                                    value={formData.mealCount}
                                    onChange={handleInput}
                                    type="number"
                                    className="form-control form-control-sm"
                                    id="mealCount"
                                    placeholder="Enter Number of meal"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="user_id" className="form-label">User</label>
                                <select
                                    name="user_id"
                                    value={formData.user_id} // controlled input
                                    onChange={handleInput}
                                    className="form-select form-select-sm"
                                    id="user_id"
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
                                <i className="bi bi-fork-knife me-1"></i> Update Meal
                            </button>
                            <Link to='/meals' className="btn btn-secondary btn-sm px-3 d-flex align-items-center">
                                <i className="bi bi-arrow-left me-1"></i> Back
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealUpdateForm;
