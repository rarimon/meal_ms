
import { create } from 'zustand';
import axios from "axios";
import {toast} from "react-toastify";
import {BASE_URL} from "./BaseUrl.js";

let token=localStorage.getItem("token");
let Header={headers:{token:token}};

const UserStore = create((set) => ({


    userList: null,
    countUser:null,
    userListRequest:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/UserList`,Header);
            if(res.data.status==="success"){
                set({userList:res.data.data},set({countUser:res.data.data.length}));
            }
            else{
                console.log("User list fetch failed",res.data.message);
                set({userList:null});
            }
        }
        catch(err){
            console.log(err);
            set({userList:null});
        }
    },

    UserDeleteRequest:async (id)=>{
        try {
            const res = await axios.delete(`${BASE_URL}/DeleteUser/${id}`, Header);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "User deleted successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to delete user");
                return false;
            }
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Something went wrong while deleting");
            return false;
        }
    },

    AddUserRequest:async (userData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/Registration`,userData);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "User Create successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Create user");
                return false;
            }
        } catch (err) {
            console.error("Create failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while creating user";
            toast.error(errorMsg);
            return false;
        }
    },

    UpdateUserRequest:async (userData)=>{
        try {
            const res = await axios.post(`${BASE_URL}/Registration`,userData);

            if (res.status === 200 || res.data?.status === "success") {
                toast.success(res.data.message || "User Create successfully");
                return true;
            } else {
                toast.error(res.data.message || "Failed to Create user");
                return false;
            }
        } catch (err) {
            console.error("Create failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while creating user";
            toast.error(errorMsg);
            return false;
        }
    },

    userListById:async ()=>{
        try{
            let res=await axios.get(`${BASE_URL}/UserList`,Header);
            if(res.data.status==="success"){
                set({userList:res.data.data},set({countUser:res.data.data.length}));
            }
            else{
                console.log("User  fetch failed",res.data.message);
                set({userList:null});
            }
        }
        catch(err){
            console.log(err);
            set({userList:null});
        }
    },



    UserinfoById:async (id)=>{
        try {
            const res = await axios.get(`${BASE_URL}/UserList/${id}`,Header);

            if (res.status === 200 || res.data?.status === "success") {
                set({userList:res.data.data});
                return true;
            } else {
                toast.error(res.data.message || "Failed  user");
                return false;
            }
        } catch (err) {
            console.error("failed:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong while user";
            toast.error(errorMsg);
            return false;
        }
    },









}));

export default UserStore;