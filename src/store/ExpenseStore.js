import {create} from "zustand";
import axios from "axios";
import {BASE_URL} from "./BaseUrl.js";
import {toast} from "react-toastify";
import UserStore from "./UserStore.js";

let token=localStorage.getItem("token");
let Header={headers:{token:token}};

const ExpenseStore=create((set) => ({

    expenseList: null,
    totalExpense:null,

    ExpenseListRequest:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/ExpenseList`,Header);
            if(res.data.status==="success"){
                set({expenseList:res.data.data},set({totalExpense:res.data.totalExpense}));
            }
            else{
                toast.error(res.data.message || "Expense list fetch failed");
                set({expenseList:null});
            }
        }
        catch(err){
            console.log(err);
            set({expenseList:null});
        }
    },

    ExpenseListByIDRequest:async (ID)=>{
        try{
            let res=await axios.get(`${BASE_URL}/ExpenseListById/${ID}`,Header);
            if(res.data.status==="success"){
                set({expenseList:res.data.data[0]});
            }
            else{
                toast.error(res.data.message || "Expense list fetch failed");
                set({expenseList:null});
            }
        }
        catch(err){
            console.log(err);
            set({mealList:null});
        }
    },


    FilterExpenseListRequest: async (formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/FilterExpense`, formData, Header);

            if (res.data.status === "success") {
                set({ expenseList: res.data.data },set({totalExpense:res.data.totalExpense}));
            } else {
                toast.error(res.data.message || "Expense list fetch failed");
                set({ expenseList: null });
            }
        } catch (err) {
            console.error(err);
            set({ expenseList: null });
            toast.error("Something went wrong while fetching filtered Expense");
        }
    },


    AddExpenseRequest:async (formData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/AddExpense`,formData,Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Expense Create successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Create Expense");
                return false;
            }
        } catch (err) {
            console.error("Create failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while creating Expense";
            toast.error(errorMsg);
            return false;
        }
    },

    ExpenseDeleteRequest:async (id)=>{
        try {
            const res = await axios.delete(`${BASE_URL}/DeleteExpense/${id}`, Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Expense deleted successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to delete Expense");
                return false;
            }
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Something went wrong while deleting");
            return false;
        }
    },

    updateExpenseRequest:async (id,formData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/UpdateExpense/${id}`,formData,Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "Expense Update successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Update Expense");
                return false;
            }
        } catch (err) {
            console.error("Update failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while Update Expense";
            toast.error(errorMsg);
            return false;
        }
    },




}))



export default ExpenseStore;