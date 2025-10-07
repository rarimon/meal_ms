import {create} from "zustand";
import axios from "axios";
import {BASE_URL} from "./BaseUrl.js";
import {toast} from "react-toastify";
import UserStore from "./UserStore.js";

let token=localStorage.getItem("token");
let Header={headers:{token:token}};

const MealStore=create((set) => ({

    mealList: null,
    totalMeal:null,

    MealListRequest:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/MealList`,Header);
            if(res.data.status==="success"){
                set({mealList:res.data.data},set({totalMeal:res.data.totalMeals}));
            }
            else{
                toast.error(res.data.message || "Meal list fetch failed");
                set({mealList:null});
            }
        }
        catch(err){
            console.log(err);
            set({mealList:null});
        }
    },

    MealListByIDRequest:async (ID)=>{
        try{
            let res=await axios.get(`${BASE_URL}/MealListById/${ID}`,Header);
            if(res.data.status==="success"){
                set({mealList:res.data.data[0]});
            }
            else{
                toast.error(res.data.message || "Meal list fetch failed");
                set({mealList:null});
            }
        }
        catch(err){
            console.log(err);
            set({mealList:null});
        }
    },


    FilterMealListRequest: async (formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/FilterMeal`, formData, Header);

            if (res.data.status === "success") {
                set({ mealList: res.data.data },set({totalMeal:res.data.totalMeals}));
            } else {
                toast.error(res.data.message || "Meal list fetch failed");
                set({ mealList: null });
            }
        } catch (err) {
            console.error(err);
            set({ mealList: null });
            toast.error("Something went wrong while fetching filtered meals");
        }
    },


    AddMealRequest:async (formData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/AddMeal`,formData,Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Meal Create successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Create Meal");
                return false;
            }
        } catch (err) {
            console.error("Create failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while creating Meal";
            toast.error(errorMsg);
            return false;
        }
    },

    MealDeleteRequest:async (id)=>{
        try {
            const res = await axios.delete(`${BASE_URL}/DeleteMeal/${id}`, Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Meal deleted successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to delete Meal");
                return false;
            }
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Something went wrong while deleting");
            return false;
        }
    },

    updateMealRequest:async (id,formData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/UpdateMeal/${id}`,formData,Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Meal Update successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Update Meal");
                return false;
            }
        } catch (err) {
            console.error("Update failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while Update Meal";
            toast.error(errorMsg);
            return false;
        }
    },




}))



export default MealStore;