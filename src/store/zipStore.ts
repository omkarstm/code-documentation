import { create } from "zustand";
import axiosInstance from "../utils/api";

export interface DocType {
  _id: string;
  name: string;
  content: string;
  workflow?: string;
}

interface FilePayload {
  name: string;
  content: string;
}

interface AnalysisState {
  documentation: string;
  workflow: string;
  loading: boolean;
  error: string | null;
  documentations: DocType[];
  analyzeCodebase: (files: FilePayload[]) => Promise<void>;
  saveToDatabase: (name: string) => Promise<boolean>;
  fetchDocumentations: () => Promise<void>;
}

export const useCodeAnalysisStore = create<AnalysisState>((set, get) => ({
  documentation: "",
  workflow: "",
  loading: false,
  error: null,
  documentations: [],
  analyzeCodebase: async (files) => {
    set({ loading: true, error: null, documentation: "", workflow: "" });
    try {
      const res = await axiosInstance.post("/analyze", { files });
      set({
        documentation: res.data.documentation,
        workflow: res.data.workflow,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.error || "Failed to analyze codebase",
        loading: false,
      });
    }
  },
  saveToDatabase: async (name) => {
    try {
      const { documentation, workflow } = get();
      await axiosInstance.post("/docs", {
        name,
        content: documentation,
        workflow,
      });
      return true;
    } catch (err: any) {
      set({
        error: err?.response?.data?.error || "Failed to save documentation",
      });
      return false;
    }
  },
  fetchDocumentations: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/docs");
      set({
        documentations: res.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.error || "Failed to fetch documentations",
        loading: false,
      });
    }
  },
}));
