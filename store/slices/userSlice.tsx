import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user type
interface User {
  id: string;
  email: string;
  profilePicture?: string;
}

// Define the initial state type
interface UserState {
  user: User | null;
  errorCode: number | null;
  serverUrl: string;
  secret: string;
  toolName: string | null;
  isLoading: boolean;
  loadingText: string;
  baseUrl: string;
}

// Define the initial state with proper TypeScript types
const initialState: UserState = {
  user: null, // Stores user object (id, email, profilePicture)
  errorCode: null,
  serverUrl: process.env.NODE_ENV === "production" 
    ? "https://server.speedyutils.com" 
    : "http://localhost:8080",
  secret: "jlkdjfldskj]o[p5432io4jp]p]01412343nliqnmsiwqtdkn,a.n;iet",
  toolName: null,
  isLoading: false,
  loadingText: "Loading...",
  baseUrl: process.env.NODE_ENV === "production" 
    ? "https://speedyutils.com" 
    : "http://localhost:3000",
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setErrorCode: (state, action: PayloadAction<number | null>) => {
      state.errorCode = action.payload;
    },
    setToolName: (state, action: PayloadAction<string | null>) => {
      state.toolName = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) {
        state.loadingText = "Loading...";
      }
    },
    setLoadingText: (state, action: PayloadAction<string>) => {
      state.loadingText = action.payload;
    },
  },
});

// Export actions and reducer
export const { setUser, logoutUser, setErrorCode, setToolName, setLoading, setLoadingText } = userSlice.actions;
export default userSlice.reducer;
