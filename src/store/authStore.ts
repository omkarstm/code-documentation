import { create } from "zustand";
import axiosInstance from "../utils/api";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  number: string;
}

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  number: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Remove logedIn from your state and logic
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signup: (formData: SignupFormData) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
  // logedIn: boolean; // REMOVE THIS
}


const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  logedIn: false,

  signup: async (formData) => {
    const data = {
      ...formData
    }
    try {
      set({ loading: true, error: null });
      await axiosInstance.post("/auth/signup", data);
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Signup failed" });
      throw err;
    }
  },

  login: async (credentials) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post<{ token: string }>("/auth/login", credentials);
      const { token } = res.data;
      localStorage.setItem("token", token);
      set({ token, loading: false  });
      await useAuthStore.getState().fetchUser();
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Login failed" });
      throw err;
    }
  },

  // store/authStore.ts

  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get<User>("/auth/me"); // Ensure this endpoint exists
      set({ user: res.data, loading: false, });
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        set({ token: null, user: null, loading: false });
      } else {
        set({ loading: false, error: "Failed to fetch user" });
      }
    }
  },


  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
