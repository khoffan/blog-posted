import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const API = import.meta.env.VITE_BASE_API_URI;

const useBlogStore = create((set, get) => ({
	// State
	blogs: [],
	currentBlog: null,
	isLoading: false,
	searchQuery: "",
	selectedTags: [],
	allTags: [],
	error: null,

	// Actions
	setSearchQuery: (query) => set({ searchQuery: query }),
	setSelectedTags: (tags) => set({ selectedTags: tags }),

	addSelectedTag: (tag) => {
		const { selectedTags } = get();
		if (!selectedTags.includes(tag)) {
			set({ selectedTags: [...selectedTags, tag] });
		}
	},

	removeSelectedTag: (tag) => {
		const { selectedTags } = get();
		set({ selectedTags: selectedTags.filter((t) => t !== tag) });
	},

	fetchBlogs: async (search = "") => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API}/api/blogs`, {
				params: { search },
			});
			set({ blogs: response.data.blogs || [], isLoading: false });
		} catch (error) {
			console.error("Failed to fetch blogs:", error);
			set({ blogs: [], isLoading: false, error: "Failed to fetch blogs" });
		}
	},

	fetchBlogById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API}/api/blog/${id}`);
			set({ currentBlog: response.data.blog, isLoading: false });
			return response.data.blog;
		} catch (error) {
			console.error("Failed to fetch blog:", error);
			set({ currentBlog: null, isLoading: false });
			return null;
		}
	},

	fetchUserBlogs: async (userId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API}/api/blogs/${userId}`);
			const blogs = response.data.message; // backend returns blogs in "message" key
			set({ blogs: Array.isArray(blogs) ? blogs : [], isLoading: false });
			return blogs;
		} catch (error) {
			console.error("Failed to fetch user blogs:", error);
			set({ blogs: [], isLoading: false });
			return [];
		}
	},

	createBlog: async (blogData) => {
		set({ isLoading: true, error: null });
		try {
			const headers = {
				"Content-Type": "application/json",
				...useAuthStore.getState().getAuthHeaders(),
			};
			const response = await axios.post(`${API}/api/creatBlogs`, blogData, {
				headers,
			});
			if (response.status === 201) {
				set({ isLoading: false });
				return { success: true, blog: response.data.blog };
			}
			set({ isLoading: false });
			return { success: false };
		} catch (error) {
			console.error("Failed to create blog:", error);
			set({ isLoading: false, error: "Failed to create blog" });
			return { success: false };
		}
	},

	updateBlog: async (id, blogData) => {
		set({ isLoading: true, error: null });
		try {
			const headers = {
				"Content-Type": "application/json",
				...useAuthStore.getState().getAuthHeaders(),
			};
			const response = await axios.put(`${API}/api/updateblog/${id}`, blogData, {
				headers,
			});
			if (response.status === 200) {
				set({ isLoading: false });
				return { success: true, blog: response.data.blog };
			}
			set({ isLoading: false });
			return { success: false };
		} catch (error) {
			console.error("Failed to update blog:", error);
			set({ isLoading: false, error: "Failed to update blog" });
			return { success: false };
		}
	},

	createTag: async (blogid, tagname) => {
		try {
			const headers = {
				"Content-Type": "application/json",
				...useAuthStore.getState().getAuthHeaders(),
			};
			await axios.post(
				`${API}/api/tags`,
				{ blogid, tagname },
				{ headers }
			);
		} catch (error) {
			console.error("Failed to create tag:", error);
		}
	},

	deleteBlog: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const headers = {
				"Content-Type": "application/json",
				...useAuthStore.getState().getAuthHeaders(),
			};
			const response = await axios.delete(`${API}/api/deleteblog/${id}`, {
				headers,
			});
			if (response.status === 200) {
				set((state) => ({
					blogs: state.blogs.filter((blog) => blog._id !== id),
					isLoading: false,
				}));
				return { success: true };
			}
			set({ isLoading: false });
			return { success: false };
		} catch (error) {
			console.error("Failed to delete blog:", error);
			set({ isLoading: false, error: "Failed to delete blog" });
			return { success: false };
		}
	},

	likeBlog: async (id) => {
		try {
			const response = await axios.put(`${API}/api/blog/like/${id}`);
			return response.data.blog;
		} catch (error) {
			console.error("Failed to like blog:", error);
			return null;
		}
	},

	dislikeBlog: async (id) => {
		try {
			const response = await axios.put(`${API}/api/blog/dislike/${id}`);
			return response.data.blog;
		} catch (error) {
			console.error("Failed to dislike blog:", error);
			return null;
		}
	},

	uploadBlogImage: async (file) => {
		try {
			const formData = new FormData();
			formData.append("blog", file);
			const headers = {
				"Content-Type": "multipart/form-data",
				...useAuthStore.getState().getAuthHeaders(),
			};
			const response = await axios.post(`${API}/api/blog/images`, formData, {
				headers,
			});
			return response.data.file;
		} catch (error) {
			console.error("Failed to upload image:", error);
			return null;
		}
	},

	fetchAllTags: async () => {
		try {
			const response = await axios.get(`${API}/api/tags`);
			const rawTags = response.data.tags?.[0]?.tagname || [];
			set({ allTags: rawTags.map((tag) => ({ tagname: tag })) });
		} catch (error) {
			console.error("Failed to fetch tags:", error);
		}
	},

	// Reset
	reset: () =>
		set({
			blogs: [],
			currentBlog: null,
			searchQuery: "",
			selectedTags: [],
			error: null,
		}),
}));

export default useBlogStore;
