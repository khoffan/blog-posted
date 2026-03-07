import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BASE_API_URI;

const useAuthStore = create((set, get) => ({
	// State
	user: null,
	isLogin: false,
	isImage: false,
	isLoading: false,
	error: null,

	// Actions
	fetchUser: async () => {
		set({ isLoading: true, error: null });
		try {
			const res = await axios.get(`${API}/api/user`, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			if (res.status === 200 && res.data.auth === true) {
				const userData = res.data.user;
				set({
					user: userData,
					isLogin: true,
					isImage: !!userData.image_path,
					isLoading: false,
				});
				return userData;
			}
			set({ isLoading: false });
			return null;
		} catch (error) {
			set({ isLogin: false, isLoading: false, user: null });
			return null;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(
				`${API}/api/login`,
				{ email, password },
				{ withCredentials: true }
			);
			if (response.status === 200) {
				set({ isLoading: false, error: null });
				// Fetch user data after login
				await get().fetchUser();
				return { success: true, message: response.data.message || response.data.massage };
			}
			set({ isLoading: false });
			return { success: false, message: "Email หรือ Password ไม่ถูกต้อง" };
		} catch (error) {
			const msg =
				error.response?.data?.message ||
				error.response?.data?.massage ||
				"Failed to login. Please try again later.";
			set({ isLoading: false, error: msg });
			return { success: false, message: msg };
		}
	},

	register: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API}/api/register`, data, {
				headers: { "Content-Type": "application/json" },
			});
			set({ isLoading: false });
			return { success: true, message: response.data.message };
		} catch (error) {
			const msg = error.response?.data?.message || "Registration failed";
			set({ isLoading: false, error: msg });
			return { success: false, message: msg };
		}
	},

	logout: async () => {
		set({ isLoading: true });
		try {
			const res = await axios.post(`${API}/api/logout`, null, {
				withCredentials: true,
			});
			if (res.status === 200) {
				set({
					user: null,
					isLogin: false,
					isImage: false,
					isLoading: false,
				});
				return { success: true, message: res.data.message || res.data.massage };
			}
			set({ isLoading: false });
			return { success: false };
		} catch (error) {
			set({ isLoading: false });
			return { success: false };
		}
	},

	// Reset
	reset: () => set({ user: null, isLogin: false, isImage: false, error: null }),
}));

export default useAuthStore;
