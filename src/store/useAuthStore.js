
import {create} from "zustand";
import axios from "axios";
import {jwtDecode} from "jwt-js-decode";
import {BASE_URL} from "./BaseUrl.js";

const useAuthStore = create((set) => ({
    user: null,
    role: null,
    token: localStorage.getItem("token") || null,

    //Login function
    login: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, formData);
            const { token } = response.data;

            // token localStorage এ রাখো
            localStorage.setItem("token", token);

            // token decode করো
            const decoded = jwtDecode(token);

            const user = decoded;
            const role = decoded.role || decoded.user?.role || null;

            // state set করো
            set({ user, role, token });

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    },

    //Logout function
    logout:async () => {
        localStorage.removeItem("token");
        set({ user: null, role: null, token: null });
    },

}));

export default useAuthStore;