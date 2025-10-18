
import {create} from "zustand";
import axios from "axios";
import {jwtDecode} from "jwt-js-decode";
import {BASE_URL} from "./BaseUrl.js";

const useAuthStore = create((set) => ({
    user: null,
    role: null,
    token: localStorage.getItem("token") || null,

    login: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, formData);
            const { token } = response.data;

            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const payload = decoded.payload || decoded;

            const user = {
                email: payload.email,
                user_id: payload.user_id,
            };
            const role = payload.role;

            set({ user, role, token });
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    },

    loadUserFromToken: () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const payload = decoded.payload || decoded;

                const user = {
                    email: payload.email,
                    user_id: payload.user_id,
                };
                const role = payload.role;

                set({ user, role, token });
            } catch (err) {
                console.error("Invalid token:", err);
                localStorage.removeItem("token");
                set({ user: null, role: null, token: null });
            }
        }
    },


    //Logout function
    logout:async () => {
        localStorage.removeItem("token");
        set({ user: null, role: null, token: null });
    },

}));

export default useAuthStore;