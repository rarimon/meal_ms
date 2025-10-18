import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router";

import {toast} from "react-toastify";
import UserStore from "../../store/UserStore.js";
import MealStore from "../../store/MealStore.js";



const MealAddForm = () => {
    const Navigate=useNavigate();
    const {AddMealRequest}=MealStore()
    const { userList, userListRequest } = UserStore();

    const [formData, setFormData] = useState({
        user_id: "",
        date: "",
        mealCount: "",
    });

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }


    useEffect(()=>{
        (async ()=>{
            await userListRequest();
        })()

    },[])

const formSubmit=async (e)=>{
    e.preventDefault();

    let res=  await AddMealRequest(formData);

    if(res){
        Navigate('/meals')
    }else{
        toast.error(res.data.message || "Failed to Create Meal");
    }


}


    return (
        <div className="container mt-5" >
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center py-2">
                    <h5 className="mb-0">Add New Meal</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">
                                    Date
                                </label>
                                <input
                                    name="date"
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
                                <label htmlFor="user_id" className="form-label">
                                    User
                                </label>
                                <select name="user_id" onChange={handleInput} className="form-select form-select-sm" id="user_id" required>
                                    <option value="">---Select User---</option>
                                    {userList &&
                                        userList.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.fullName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {/* Buttons Row */}
                        <div className="d-flex justify-content-center gap-2">
                            <button type="submit" className="btn btn-success btn-sm px-4">
                                <i className="bi bi-plus-circle me-1"></i>
                                Add Meal
                            </button>
                            <Link to={'/meals'}
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

export default MealAddForm;