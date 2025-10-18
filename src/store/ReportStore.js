import {create} from "zustand";
import axios from "axios";
import {BASE_URL} from "./BaseUrl.js";
import {toast} from "react-toastify";
import UserStore from "./UserStore.js";

let token=localStorage.getItem("token");
let Header={headers:{token:token}};

const ReportStore=create((set) => ({

    dashboardSummary: null,
    DashboardSummaryRequest:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/dashboarOverview`,Header);
            if(res.data.status==="success"){
                set({dashboardSummary:res.data.data});
            }
            else{
                toast.error(res.data.message || "summary list fetch failed");
                set({dashboardSummary:null});
            }
        }
        catch(err){
            console.log(err);
            set({dashboardSummary:null});
        }
    },


    AllReportRequest: async (fromDate, toDate) => {
        try {
            const res = await axios.post(`${BASE_URL}/AllReport`, { fromDate, toDate },Header);

            if (res.data.status === "success") {
                return res.data.data;
            } else {
                console.error("Unexpected response:", res.data);
                return null;
            }
        } catch (error) {
            console.error("Report fetch failed:", error);
            return null;
        }
    },


    MealReportRequest: async () => {
        try {
            const res = await axios.get(`${BASE_URL}/totalMeals`,Header);

            if (res.data.status === "success") {
                return res.data.data[0];
            } else {
                console.error("Unexpected response:", res.data);
                return null;
            }
        } catch (error) {
            console.error("Report fetch failed:", error);
            return null;
        }
    },


    MealDetailsReportRequest: async (id) => {
        try {
            const res = await axios.get(`${BASE_URL}/MealDetails/${id}`,Header);

            if (res.data.status === "success") {
                return res.data.data[0];
            } else {
                console.error("Unexpected response:", res.data);
                return null;
            }
        } catch (error) {
            console.error("Report fetch failed:", error);
            return null;
        }
    },



    expenseList: null,
    totalExpense:null,

    ExpenseListRequest:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/totalExpense`,Header);
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

    expenseDetails:null,

    ExpenseDetailsRequest:async (categoryName)=>{
        try{
            let res=await axios.get(`${BASE_URL}/ExpenseDetails/${categoryName}`,Header);
            if(res.data.status==="success"){
                set({expenseDetails:res.data.data[0]});
            }
            else{
                toast.error(res.data.message || "Expense  fetch failed");
                set({expenseDetails:null});
            }
        }
        catch(err){
            console.log(err);
            set({expenseDetails:null});
        }
    },




}))



export default ReportStore;