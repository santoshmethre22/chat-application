import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/get-user");
      if (res.data?.success === false) {
        set({ authUser: null });
        return;
      }
      set({ authUser: res.data?.user });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      if (!res.data?.success) {
        toast.error(res.data?.message || "Signup failed");
        return;
      }
      set({ authUser: res.data?.user });
      toast.success("Signup successful");
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      if (!res.data?.success) {
        toast.error(res.data?.message || "Login failed");
        return;
      }
      set({ authUser: res.data?.user });
      console.log("Login response:", res.data);
      toast.success(`login successfull ${res.data?.user?.fullName || "no name"}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      if (!res.data?.success) {
        toast.error(res.data?.message || "Logout failed");
        return;
      }
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
}));
